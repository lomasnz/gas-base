const S6Event = {};
const S6EventUser = {};

const S6EventSettings = {
  LogTraceDefault: false,
  LogDebugDefault: false,
  LogInfoDefault: false,

  TimeWarningDefault: 20000,
  TimeErrorDefault: 25000,

  LogDebugOn: { LogDebug: true },
  LogDebugOff: { LogDebug: false },
  LogTraceOn: { LogTrace: true },
  LogTraceOff: { LogTrace: false },
  LogInfoOn: { LogInfo: true },
  LogInfoOff: { LogInfo: false },

  TimeWarningTest0: { TimeWarningThreshhold: 0 },
  TimeWarningAt5Seconds: { TimeWarningThreshhold: 5000 },
  TimeWarningAt10Seconds: { TimeWarningThreshhold: 10000 },
  TimeWarningAt20Seconds: { TimeWarningThreshhold: 20000 },

  TimeErrorTest0: { TimeErrorThreshhold: 0 },
  TimeErrorAt10Seconds: { TimeErrorThreshhold: 10000 },
  TimeErrorAt20Seconds: { TimeErrorThreshhold: 20000 },
  TimeErrorAt25Seconds: { TimeErrorThreshhold: 25000 }

}

class S6Context {

  constructor(build, actionEvent, secret) {
    if (secret != "#PRIVATE") {
      throw Error("Do not create an instnace of this S6Context class directy. Use the new() factory method.")
    }
    this.actionEvent = actionEvent;
    this.build = build;
    this.email = Session.getActiveUser().getEmail();
    this.timers = {};
    Object.freeze(this);
  }

  static new(s6actionEventFnName = actionEventDefault.name) {
    return S6Context.newFromName(s6actionEventFnName);
  }

  static newFromName(name) {
    //S6UIController.initS6Event();
    var res = new S6Context(S6Event[name], name, "#PRIVATE");
    if (!res.build.LogDebug) {
      S6Context.debug = S6Context._noOp;
      S6Context.debugFn = S6Context._noOp;
    }
    if (!res.build.LogInfo) {
      S6Context.info = S6Context._noOp;
      S6Context.infoFn = S6Context._noOp;
    }
    if (!res.build.LogTrace) {
      S6Context.trace = S6Context._noOp;
    }
    S6Context._instance = res;
    S6Context.debug("S6Context[", res.build, "]");
    return res;
  }
  /**
   * For recording a record in the S6Event  for each action_ build_ pairing, along with configuration (...args)
   */
  static addEvent(actionFn, viewBuildFn, ...args) {
    S6Event[actionFn.name] = {
      ActionFn: actionFn,
      ActionName: actionFn.name,
      ViewBuildFn: viewBuildFn,
      LogInfo: S6EventSettings.LogInfoDefault,
      LogDebug: S6EventSettings.LogDebugDefault,
      LogTrace: S6EventSettings.LogTraceDefault,
      TimeWarningThreshhold: S6EventSettings.TimeWarningDefault,
      TimeErrorThreshhold: S6EventSettings.TimeErrorDefault
    };
    if (S6EventUser[Session.getActiveUser().getEmail()]) {
      var override = S6EventUser[Session.getActiveUser().getEmail()];
      for (let a in override) {
        S6Event[actionFn.name][a] = override[a];
      }
    }
    else {
      if (args.length > 0) {
        for (let a in args) {
          for (let j in args[a]) {
            S6Event[actionFn.name][j] = args[a][j];
          }
        }
      }
    }
  }
  static addUser(userEmail, ...args) {
    S6EventUser[userEmail] = {
      LogInfo: S6EventSettings.LogInfoDefault,
      LogDebug: S6EventSettings.LogDebugDefault,
      LogTrace: S6EventSettings.LogTraceDefault,
      TimeWarningThreshhold: S6EventSettings.TimeWarningDefault,
      TimeErrorThreshhold: S6EventSettings.TimeErrorDefault
    };
    for (let a in args) {
      for (let j in args[a]) {
        S6EventUser[userEmail][j] = args[a][j];
      }
    }
  }

  executeBuild(eventParameter) {
    var res;
    try {
      var param = new Param(eventParameter);
      param.replaceValue(PARAM.EVENT_NAME, this.actionEvent);
      var userCacheCountBefore = S6Cache.userCacheCount();
      var globalCacheCountBefore = S6Cache.globalCacheCount();
      var eventName = this.email + " in " + param.getHostAppName() + " -> " + this.build.ActionName + "(event) -> " + this.build.ViewBuildFn.name + "(param)";
      S6Context.debug(`Execute ${this.build.ViewBuildFn.name}`);
      S6Context.time(eventName);
      res = this.build.ViewBuildFn(param);
      var userCacheCountAfter = S6Cache.userCacheCount();
      var globalCacheCountAfter = S6Cache.globalCacheCount();
      S6Context.info("User cache changed by[", userCacheCountAfter - userCacheCountBefore, "]");
      S6Context.info("Global cache changed by[", globalCacheCountAfter - globalCacheCountBefore, "]");
    }
    catch (err) {
      res = S6UIService.createRunTimeErrorCard(err);
    }
    S6Context.timeEnd(eventName);
    S6Context.debug("DriveApp Cache >", S6DriveApp.cacheStats());
    S6Context.debug("Timers >", this.timers);
    S6Context.debug("Parms >", param.actions);

    //S6Context.trace(res.printJson());
    return res;
  }

  static _noOp() {
  }
  static _singleton() {
    if (typeof S6Context._instance == 'undefined') {
      S6Context._instance = S6Context.new();
    }
    return S6Context._instance;
  }

  static debug() {
    console.log(...arguments);
  }
  static trace() {
    console.log("Trace:", ...arguments);
  }
  static trace(fn, ...args) {
    if (typeof fn == Function) {
      console.log("Trace:", fn.name, "(", ...args, ")");
    }
    else {
      console.log("Trace:", fn, ...args);
    }
  }

  static debugFn(fn, ...args) {
    if (typeof fn == Function) {
      console.log(fn.name, "(", ...args, ")");
    }
    else {
      console.log(fn, "(", ...args, ")");
    }
  }
  static infoFn(fn, ...args) {
    if (typeof fn == Function) {
      console.info(fn.name, "(", ...args, ")");
    }
    else {
      console.info(fn, "(", ...args, ")");
    }
  }

  static info() {
    console.info(...arguments);
  }
  static time(name) {
    S6Context.info("Start " + name);
    S6Context._singleton().timers[name] = { startMs: Date.now() }
    console.time("Finish " + name);
  }
  static timeEnd(name) {
    var res;
    console.timeEnd("Finish " + name);
    var timer = S6Context._singleton().timers[name];
    if (timer) {
      const then = timer.startMs;
      res = Date.now() - then;
      timer.startDateTime = Utilities.formatDate(new Date(then), "en", "yyyy MMMMM dd HH:mm:ss");
      timer.tookMs = res;

      if (res > S6Context._singleton().build.TimeErrorThreshhold) {
        console.error(name + ": Exceed Time Error Threshold of [", S6Context._singleton().build.TimeErrorThreshhold, "] with [", res, "]");
      }
      else if (res > S6Context._singleton().build.TimeWarningThreshhold) {
        console.error(name + ": Exceed Time Warning Threshold of [", S6Context._singleton().build.TimeWarningThreshhold, "] with [", res, "]");
      }
    }
    else {
      console.error("Timer ended but never started:", name);
    }
    return res;
  }
  static warnFn(fn, ...args) {
    console.warn(fn, "(", ...args, ")");
  }
  static warn() {
    console.warn(...arguments)
  }
  static error() {
    if (typeof arguments[0] === Error) {
      console.log(arguments[0].stack);
    }
    console.error(...arguments)
  }
  static errorFn(fn, ...args) {
    console.error(fn, "(", ...args, ")");
  }
}
