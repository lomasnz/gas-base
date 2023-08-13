

const CACHE_NAME = "newCache";
const CACHE_PRIORITY = Object.freeze({
  HIGH: Symbol("High"),
  LOW: Symbol("Low")
})


class S6Cache {

  static _deleteMemoryCache() {
    var mc = S6Cache.getMEMRORY_CACHE();
    mc.cache = {};
  }
  static getMEMRORY_CACHE() {
    if (typeof S6Cache.MEMRORY_CACHE == 'undefined') {
      S6Cache.MEMRORY_CACHE = { cache: {} };
    }
    return S6Cache.MEMRORY_CACHE;
  }

  static _priority(priority = CACHE_PRIORITY.HIGH) {
    let res = 10;
    switch (priority) {
      case (CACHE_PRIORITY.HIGH):
        res = 60 * 4;
        break;
      case (CACHE_PRIORITY.LOW):
        res = 5;
        break;
      default:
        break;
    }
    return res;
  }

  static _getMemoryCache(id) {
    if (typeof S6Cache.MEMRORY_CACHE == 'undefined') {
      S6Cache.MEMRORY_CACHE = { cache: {} };
    }
    var mc = S6Cache.getMEMRORY_CACHE();
    var res;
    if (mc.cache != null) {
      res = mc.cache[[id]];
    }
    return res;
  }
  static _putMemoryCache(id, json) {
    var mc = S6Cache.getMEMRORY_CACHE();
    mc.cache[[id]] = json;
    return id;
  }

  static _CacheCount(cache) {
    let res = 0;
    let json = {};
    var cached = cache.get(CACHE_NAME);
    json = JSON.parse(cached);
    if (json) {
      res = json[CACHE_NAME].length + 1; // + 1 for cache of cache
      S6Context.trace(json)
    }
    return res;
  }
  static _CacheRecord(cache, key) {
    let json = {};
    var cached = cache.get(CACHE_NAME);

    json = JSON.parse(cached);
    S6Context.trace("Before cache record[", json, "]");
    if (json) {
      json[CACHE_NAME].push(key)
    }
    else {
      json = { [CACHE_NAME]: [key] };
    }
    S6Context.trace("After cache record[", json, "]");
    cache.put(CACHE_NAME, JSON.stringify(json), MILLISECONDS_IN_A_MINUTE * S6Cache._priority(CACHE_PRIORITY.HIGH));
  }
  static _CacheClear(cache) {
    var res = 0;
    var cached = cache.get(CACHE_NAME);
    var json = JSON.parse(cached);
    S6Cache._deleteMemoryCache();
    if (json) {
      var toRemove = [];
      for (var i = 0; i < json[CACHE_NAME].length; i++) {
        toRemove[i] = json[CACHE_NAME][i];
      }
      toRemove[i] = CACHE_NAME;
      res = toRemove.length;
      cache.removeAll(toRemove);
      S6Context.debug("Cached Cleared[", toRemove, "]");
    }
    return res;
  }
  static _CachePutJson(cache, key, json, priority = CACHE_PRIORITY.HIGH) {
    S6Validate.mandatory("key", key).mandatory("json", json);
    var newValue = JSON.stringify(json);
    S6Cache._putMemoryCache(key, json);
    cache.put(key, newValue, MILLISECONDS_IN_A_MINUTE * S6Cache._priority(priority));

    S6Cache.userCacheRecord(key);
    S6Context.debug("Cache added[", key, "] with priority of [" + priority.toString() + "]");
  }

  static _CachePutString(cache, key, string, priority = CACHE_PRIORITY.HIGH) {
    S6Validate.mandatory("key", key).mandatory("json", string);
    S6Cache._putMemoryCache(key, string);
    cache.put(key, string, MILLISECONDS_IN_A_MINUTE * S6Cache._priority(priority));

    S6Cache.userCacheRecord(key);
    S6Context.debug("Cache String added[", key, "] with priority of [" + priority.toString() + "]");
  }

  static _CacheGetString(cache, key) {
    var res = S6Cache._getMemoryCache(key);
    if (!res) {
      res = cache.get(key);
      if (res) {
        S6Context.debug("Cache String Hit For[", key, "]");
        S6Cache._putMemoryCache(key, res);
      }
      else {
        S6Context.debug("Cache String Miss For[", key, "]");
      }
    }
    else {
      S6Context.debug("Memory String Cache Hit For[", key, "]");
    }
    return res;
  }

  static _CacheGetJson(cache, key) {
    var res = S6Cache._getMemoryCache(key);
    if (!res) {
      res = cache.get(key);
      if (res) {
        res = JSON.parse(res);
        S6Context.debug("Cache Hit For[", key, "]");
        S6Cache._putMemoryCache(key, res);
      }
      else {
        S6Context.debug("Cache Miss For[", key, "]");
      }
    }
    else {
      S6Context.debug("Memory Cache Hit For[", key, "]");
    }
    return res;
  }


  //
  static userCacheCount() {
    return S6Cache._CacheCount(CacheService.getUserCache());
  }
  static userCacheRecord(key) {
    return S6Cache._CacheRecord(CacheService.getUserCache(), key);
  }
  static userCacheClear() {
    return S6Cache._CacheClear(CacheService.getUserCache());
  }

  static userCachePutJson(key, json, priority = CACHE_PRIORITY.HIGH) {
    return S6Cache._CachePutJson(CacheService.getUserCache(), key, json, priority);
  }

  static userCachePutString(key, string, priority = CACHE_PRIORITY.HIGH) {
    return S6Cache.userCachePutJson(key, {string : string}, priority);
  }

  static userCacheGetJson(key) {
    return S6Cache._CacheGetJson(CacheService.getUserCache(), key);
  }

  static userCacheGetString(key) {
    const res = S6Cache.userCacheGetJson(key);
    if (res) {
      return res.string;
    }
  }

  //
  static globalCacheCount() {
    return S6Cache._CacheCount(CacheService.getScriptCache());
  }
  static globalCacheRecord(key) {
    return S6Cache._CacheRecord(CacheService.getScriptCache(), key);
  }
  static globalCacheClear() {
    return S6Cache._CacheClear(CacheService.getScriptCache());
  }

  static globalCachePutJson(key, json, priority = CACHE_PRIORITY.HIGH) {
    return S6Cache._CachePutJson(CacheService.getScriptCache(), key, json, priority);
  }

  static globalCacheGetJson(key) {
    return S6Cache._CacheGetJson(CacheService.getScriptCache(), key);
  }
}
