function myFunction() {
  //console.log(Event.Default);
  // S6Context.info("this","that");
  S6Context.debugFn("func", "that", "this");
  //console.log(myFunction.caller.toString());
}

function test_event() {
  console.log(S6Event);
  console.log(S6Event[0]);
}
function testAction(event) {
  initS6Event();
  var c = S6Context.new(testAction);
  c.executeBuild(event);
}
function testBuildView(param) {
  S6Context.info("Here");
}
function text_eventJ() {
  console.log(S6Event);
  console.log(S6Event.actionTest);
}

function testTest() {
  S6Context.new(actionEventList);
  S6Context.time("Timer");
}

function testFunc() {
  console.log(S6Context.actionDefault.name);
}

function testGetName() {
  console.log(S6Context.debugFn.name);
  console.log(S6Context.debugFn.bind);
}

function testCotrl() {
  S6UIController.initS6Event();
  console.log(S6Event);
}