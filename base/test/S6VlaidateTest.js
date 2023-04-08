function testisJSON() {

  var json = { a: "b" };
  testTrue(S6Validate._isJSON(json));

  var arry = [];
  testFalse(S6Validate._isJSON(arry));

  var aj = [json];
  testFalse(S6Validate._isJSON(aj));

  var s = "openFunction";
  testTrue(S6Validate._isString(s));
}

function test_JSON() {
  var sJSON = `[{"folder":"westpac.co.nz\\7.3 Contracts for Subscriptions (Quotes)","oldFolder":"","docs":[{"url":"https://docs.google.com/document/d/1cS6aJZ3N1uBTo8rkrHAU7pFmH-OvmEKF5cWHtqXLNGI/edit","fileName":"WESTPAC BANKING CORPORATION Checklist for Quote May, 10 2022"}]}]`;

  var json = eval('(' + sJSON + ')');
  testTrue(S6Validate._isArray(json));
  testTrue(S6Validate._isJSON(json[0]));


}

function test_JSON2() {
  var sJSON = `[{"fields":[[{"field":"{long-name}","value":"WESTPAC BANKING CORPORATION","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Full name","type":"text","mandatory":""},{"field":"{short-name}","value":"Westpac","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Short name","type":"text","mandatory":""},{"field":"{domain-name}","value":"westpac.co.nz","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Internet domain","type":"domain","mandatory":""},{"field":"{opportunity}","value":"7.3 Contracts for Subscriptions (Quotes)","hint":"Should align with the PieDrive opportunity name","id":"0ACbppDb17bdQUk9PVA","title":"Opportunity (Folder)","type":"subfolder[{domain-name}\\7.3 Contracts for Subscriptions (Quotes)]","mandatory":"YES"}]]}]`;

  var json = eval('(' + sJSON + ')');
  testTrue(S6Validate._isArray(json));
  testTrue(S6Validate._isJSON(json[0]));
  testTrue(S6Validate._isFields(json[0]));
  testTrue(S6Validate.type(json, DataType.FIELDS) == S6Validate);

}

function test_JSON3() {
  var sJSON = `{"fields":[{"field":"{long-name}","value":"BANK OF NEW ZEALAND LIMITED","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Full name","type":"text","mandatory":""},{"field":"{domain-name}","value":"bnz.co.nz","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Internet domain","type":"domain","mandatory":""},{"field":"{short-name}","value":"BNZ","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Short name","type":"text","mandatory":""},{"field":"{opportunity}","value":"3. Proposals","hint":"Should align with the PieDrive opportunity name","id":"0ACbppDb17bdQUk9PVA","title":"Opportunity (Folder)","type":"subfolder[{domain-name}\\3. Proposals]","mandatory":"YES"}]}`;

  var json = eval('(' + sJSON + ')');
  console.log("1:"+JSON.stringify(json));
  console.log("2:"+JSON.stringify(json.fields));
  console.log("3:"+JSON.stringify(json.fields[0]));

  S6Validate.type("test",json,DataType.FIELDS);
  
  testTrue(S6Validate._isArray([json]));
  testTrue(S6Validate._isJSON(json));
  testTrue(S6Validate._isFields(json));
  testTrue(S6Validate.type(json, DataType.FIELDS) == S6Validate);

}

function test_JSON4() {
  var sJSON = `[{"fields":[{"field":"{long-name}","value":"BANK OF NEW ZEALAND LIMITED","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Full name","type":"text","mandatory":""},{"field":"{domain-name}","value":"bnz.co.nz","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Internet domain","type":"domain","mandatory":""},{"field":"{short-name}","value":"BNZ","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Short name","type":"text","mandatory":""},{"field":"{opportunity}","value":"3. Proposals","hint":"Should align with the PieDrive opportunity name","id":"0ACbppDb17bdQUk9PVA","title":"Opportunity (Folder)","type":"subfolder[{domain-name}\\3. Proposals]","mandatory":"YES"}]}]`;

  var json = eval('(' + sJSON + ')');

  console.log("1:"+JSON.stringify(json));
  console.log("2:"+JSON.stringify(json[0]));
  console.log("3:"+JSON.stringify(json[0].fields));

  S6Validate.type("test",json,DataType.FIELDS);

}

function test_Today() {
  console.log(S6Utility.getToday());
}
