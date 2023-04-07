function test_rep() {
  var param = new Param();
  param.setEntityConfigId("123");
  param.addDocumentId("55");
  console.log(param.getEntityConfigId());

   param.setEntityConfigId("5679");
  console.log(param.getEntityConfigId());
  console.log(param.toJSON());
  console.log(param.actions);

}
function test_Type() {
  var type = "pipedrive.deals.asfolders[{domain-name}\7.1 Contracts for Services (SOW),{domain-name}]";
  var newValue = S6UIService.typeParameters(type)[0] + FOLDER_SEPERATOR;
  console.log(newValue);
}

function test_Entities() {
  var p = new Param();
  p.addEntityConfigId("18sYStTkG2od1YV_3jVJLrGWt3wVVByGROhJeRJYzl9Q_0");

  console.log(p.getEntityConfigId());

  p.addEntityConfigId("18sYStTkG2od1YV_3jVJLrGWt3wVVByGROhJeRJYzl9Q_1");
  console.log(p.getEntityConfigId());
  console.log(p.getEntityConfigId(1));
  console.log(p.getEntityConfigId(12345678));

  p.addEntityConfigId("18sYStTkG2od1YV_3jVJLrGWt3wVVByGROhJeRJYzl9Q_2");
  console.log(p.getEntityConfigIds());

}
function test() {

  var p = new Param();

  var value = "s6.org";
  var title = "internet domain";
  var type = "domain";

  p.addJSON("fields", { value: value, type: type, title: title });

  value = "S6";
  title = "Short name";
  type = "text";

  p.addJSON("fields", { value: value, type: type, title: title });
  p.addValue("test", "test value1");
  console.log(p.getFirst("test"));
  p.replaceValue("test", "test value2222");
  console.log(p.getFirst("test"));

  testEquales(p.countOf("fields") + "", "2");
  console.log(JSON.stringify(p.toJSON()));

  console.log("fields only");
  console.log(JSON.stringify(p.toJSON("fields")));

  var a = p.getAllArrayOfJSON("fields");
  console.log("All fields, one by one");
  for (var i = 0; i < a.length; i++) {
    console.log(JSON.stringify(a[i]));
  }

  p.replaceArryJSON("fields", a);
  for (var i = 0; i < a.length; i++) {
    console.log(JSON.stringify(a[i]));
  }

}

function testTaskType() {
  var param = new Param();
  var x = param.addValue("taskType", TASK_APPLY_PROPERTIES);
  console.log("x1", x);
  console.log("put taskType", param.getFirst("taskType"));
  x = param.add("taskType", "ApplyProperties")
  console.log("x2", x);
}

function test_Eval() {
  var j = {
    commonEventObject:
    {
      hostApp: 'DRIVE',
      parameters:
      {
        createType: '0',
        settingsUrl_1: 'https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit',
        fields_0: '{"field":"{domain-name}","value":"3mnz.co.nz","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Internet domain","type":"domain","mandatory":""}',
        fields_2: '{"field":"{short-name}","value":"3m","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Short name","type":"text","mandatory":""}',
        rootFolderID_0: '0ACbppDb17bdQUk9PVA',
        fields_3: '{"field":"{allfolders}","value":"","hint":"Select a folder","id":"0ACbppDb17bdQUk9PVA","title":"Opportunity (Folder)","type":"allfolders[{domain-name}]","mandatory":"YES"}',
        fileName_0: '{allfolders}\\{subfolder}\\SECTION6 LETTER TO {long-name} ON {today}',
        fields: '4',
        fields_4: '{"field":"{subfolder}","value":"","hint":"Optionally, create a new subfolder","id":"0ACbppDb17bdQUk9PVA","title":"(Optional) New Subfolder","type":"text","mandatory":"NO"}',
        fields_1: '{"field":"{long-name}","value":"3M NEW ZEALAND LIMITED","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Full name","type":"text","mandatory":""}',
        fileName: '0',
        templateUrl_0: 'https://docs.google.com/document/d/14McbVrzXFYhCEiqSlFYLNhBU4wBZ8eKeOxhNL0y6i60/edit',
        entity_0: 'Customer Accounts',
        settingsUrl_0: 'https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit',
        createType_0: 'TEMPLATE',
        rootFolderID: '0',
        templateUrl: '0',
        entity: '0',
        settingsUrl: '1'
      },
      timeZone: { offset: 43200000, id: 'Pacific/Auckland' },
      userLocale: 'en-GB',
      formInputs: { '{allfolders}': [Object] },
      platform: 'WEB'
    },
    userLocale: 'en',
    drive:
    {
      activeCursorItem:
      {
        id: '116VRllu6I2XuJ7MHVGXttWFR7GSJaZGyi20QJHdwT3k',
        title: 'section6.nz/Organised for Success with Vector',
        mimeType: 'application/vnd.google-apps.presentation',
        iconUrl: 'https://drive-thirdparty.googleusercontent.com/32/type/application/vnd.google-apps.presentation'
      },
      selectedItems: [[Object]]
    },
    parameters:
    {
      fields_2: '{"field":"{short-name}","value":"3m","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Short name","type":"text","mandatory":""}',
      rootFolderID_0: '0ACbppDb17bdQUk9PVA',
      createType: '0',
      settingsUrl_1: 'https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit',
      rootFolderID: '0',
      settingsUrl_0: 'https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit',
      templateUrl_0: 'https://docs.google.com/document/d/14McbVrzXFYhCEiqSlFYLNhBU4wBZ8eKeOxhNL0y6i60/edit',
      fields_1: '{"field":"{long-name}","value":"3M NEW ZEALAND LIMITED","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Full name","type":"text","mandatory":""}',
      fileName: '0',
      fields_4: '{"field":"{subfolder}","value":"","hint":"Optionally, create a new subfolder","id":"0ACbppDb17bdQUk9PVA","title":"(Optional) New Subfolder","type":"text","mandatory":"NO"}',
      entity_0: 'Customer Accounts',
      settingsUrl: '1',
      fields: '4',
      fileName_0: '{allfolders}\\{subfolder}\\SECTION6 LETTER TO {long-name} ON {today}',
      createType_0: 'TEMPLATE',
      templateUrl: '0',
      entity: '0',
      fields_3: '{"field":"{allfolders}","value":"","hint":"Select a folder","id":"0ACbppDb17bdQUk9PVA","title":"Opportunity (Folder)","type":"allfolders[{domain-name}]","mandatory":"YES"}',
      fields_0: '{"field":"{domain-name}","value":"3mnz.co.nz","hint":"","id":"0ACbppDb17bdQUk9PVA","title":"Internet domain","type":"domain","mandatory":""}'
    },
    userCountry: 'GB',
    formInput: { '{allfolders}': '3mnz.co.nz' },
    userTimezone: { id: 'Pacific/Auckland', offSet: '43200000' },
    formInputs: { '{allfolders}': ['3mnz.co.nz'] },
    clientPlatform: 'web',
    hostApp: 'drive'
  };

  console.log(j.formInputs);
  console.log(j.formInputs["{allfolders}"][0]);


}

function test_gigo() {
  var f = { "fields": [{ "field": "{domain-name}", "value": "3mnz.co.nz", "title": "Internet domain", "type": "domain" }, { "field": "{long-name}", "value": "3M NEW ZEALAND LIMITED", "title": "Full name", "type": "text" }, { "field": "{short-name}", "value": "3m", "title": "Short name", "type": "text" }] };



  // var s = JSON.stringify(f);
  // var js = eval('(' + s + ')');
  // var js2 = JSON.parse(s);

  var param = new Param();
  param.addJSON("fields", f);
  var j = param.getJSON("fields");

  console.log(f);
  console.log(j);


  // console.log(0, f);
  // console.log(1, param.getAllArrayOfJSON(FIELDS));
  // console.log(2, param.getAllAsJSON(FIELDS));
  // console.log(3, param.getAll(FIELDS));

}
