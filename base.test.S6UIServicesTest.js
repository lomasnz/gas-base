function test() {
  console.log(s6UIHelper.version());
}
function testCanonicalType() {
  var res = S6UIService.canonicalType("inputList[a,b,c]");
  console.log(res);
}

function testParams() {
  var res = s6UIHelper.typeParameters("subfolder({domain-name}/1. Images)");
  console.log(res);
  res = s6UIHelper.typeParameters("subfolder({domain-name}/1. Images,second)");
  console.log(res);
  var res = s6UIHelper.typeParameters("subfolder");
  console.log(res);
}

function test_date() {
  var options = { day: 'numeric', month: 'long', year: 'numeric', };
  var date = new Date(1233443423423);

  var newValue = date.toLocaleDateString("en",options);
  console.log(newValue);
  var p = Date.parse(newValue);
  console.log(p);
  var newDate = new Date(p);
  newValue = newDate.toLocaleDateString(options);
  console.log(newValue);
}

function test_switch() {
  var res = S6UIService.createSwitch("test", "test title", "test hin", null,true);
  console.log(res);
}
