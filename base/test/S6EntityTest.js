function test_Json() {
S6Cache.userCacheClear();

  var res = S6Entity.newFromConfigId("1NlLxkzOcVe33eMizn0NWvz-EG0u39IOSDLRtt0mAwCQ",true);


  for (var k in res.config[ENTITY.TEMPLATES]) {
    //console.log(k , ":", res.config[ENTITY.TEMPLATES][k]);
    for (var j in res.config[ENTITY.TEMPLATES][k][ENTITY.TEMPLATES]) {
      console.log(k,",",j,":",res.config[ENTITY.TEMPLATES][k][ENTITY.TEMPLATES][j])
    }
  }
}

function test_folders() {
  var fields = [{
    field: '{domain-name}',
    title: 'Internet domain',
    type: 'domain',
    hint: '<name>.<type>.<country> e.g. customs.govt.nz, vetcor.co.nz',
    mandatory: 'YES',
    updateable: 'NO',
    rootField: 'YES',
    value: 'test1.org.nz',
    editable: ''
  },
  {
    field: '{long-name}',
    title: 'Full name',
    type: 'text',
    hint: 'Includes Limited and other formal attributes, eg SECTION6 LIMITED',
    mandatory: 'YES',
    updateable: 'YES',
    rootField: 'YES',
    value: 'TEST1 LTD',
    editable: ''
  },
  {
    field: '{short-name}',
    title: 'Short name',
    type: 'text',
    hint: 'The name the organisations trades as or is known as eg SECTION6',
    mandatory: 'YES',
    updateable: 'YES',
    rootField: 'YES',
    value: 'TES1',
    editable: ''
  }];

  var res = S6Entity.newFromConfigId("18sYStTkG2od1YV_3jVJLrGWt3wVVByGROhJeRJYzl9Q", true);

  console.log(fields.length);
  var folders = res.clonedUpdateFolders(fields);

  console.log(folders.length);
  console.log(folders);
  console.log(folders[11])

}

function test_TEMPLATES() {
  var fields = [{
    field: '{domain-name}',
    title: 'Internet domain',
    type: 'domain',
    hint: '<name>.<type>.<country> e.g. customs.govt.nz, vetcor.co.nz',
    mandatory: 'YES',
    updateable: 'NO',
    rootField: 'YES',
    value: 'test1.org.nz',
    editable: ''
  },
  {
    field: '{long-name}',
    title: 'Full name',
    type: 'text',
    hint: 'Includes Limited and other formal attributes, eg SECTION6 LIMITED',
    mandatory: 'YES',
    updateable: 'YES',
    rootField: 'YES',
    value: 'TEST1 LTD',
    editable: ''
  },
  {
    field: '{short-name}',
    title: 'Short name',
    type: 'text',
    hint: 'The name the organisations trades as or is known as eg SECTION6',
    mandatory: 'YES',
    updateable: 'YES',
    rootField: 'YES',
    value: 'TES1',
    editable: ''
  }];

  var res = S6Entity.newFromConfigId("18sYStTkG2od1YV_3jVJLrGWt3wVVByGROhJeRJYzl9Q", false);

  var temps = res.clonedUpdateTemplates(fields);

  // console.log(temps.length);
   console.log("TEMPLATES:",temps);
   console.log(temps[0]);
   var t = temps[0][ENTITY.TEMPLATES];
   console.log(t);
  var f = S6DriveFactory.makeFoldersAndDoc(t[0][ENTITY.TEMPLATE_ATTR.FILE_NAME],t[0][ENTITY.TEMPLATE_ATTR.URL]);
    console.log(JSON.stringify(f));
  // // console.log(temps[6]);
  // // console.log("templates:",temps[6][ENTITY.TEMPLATES][0]);
  // // console.log("fields:", temps[6][ENTITY.TEMPLATES][0][ENTITY.TEMPLATE.DESC]);
  // console.log("a field:",temps[0][ENTITY.TEMPLATES][0][ENTITY.TEMPLATE.FIELDS]);
  //  console.log("a field:",temps[1][ENTITY.TEMPLATES][1][ENTITY.TEMPLATE.FIELDS]);
  //   console.log("a field:",temps[3][ENTITY.TEMPLATES][2][ENTITY.TEMPLATE.FIELDS]);
  //    console.log("a field:",temps[4][ENTITY.TEMPLATES][3][ENTITY.TEMPLATE.FIELDS]);

}

function test_ConCat() {
  var fields = [{
    field: '{domain-name}',
    title: 'Internet domain',
    type: 'domain',
    hint: '<name>.<type>.<country> e.g. customs.govt.nz, vetcor.co.nz',
    mandatory: 'YES',
    updateable: 'NO',
    rootField: 'YES',
    value: 'test1.org.nz',
    editable: ''
  },
  {
    field: '{long-name}',
    title: 'Full name',
    type: 'text',
    hint: 'Includes Limited and other formal attributes, eg SECTION6 LIMITED',
    mandatory: 'YES',
    updateable: 'YES',
    rootField: 'YES',
    value: 'TEST1 LTD',
    editable: ''
  },
  {
    field: '{short-name}',
    title: 'Short name',
    type: 'text',
    hint: 'The name the organisations trades as or is known as eg SECTION6',
    mandatory: 'YES',
    updateable: 'YES',
    rootField: 'YES',
    value: 'TES1',
    editable: ''
  }];

  fields = fields.concat(fields);
  console.log(fields);
}

function test2() {
  return "help", "false";
}
function test3() {
  var two = test2();
  console.log(":", two);

}

// class Test {
//    static test() {
//     return Test.#test2();
//   }
//   static #test2() {
//     return "tested";
//   }
// }
// Test.test();