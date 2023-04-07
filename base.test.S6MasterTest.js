function test_Master() { 
  S6Cache.userCacheClear();
  var res = S6Master.newMaster("https://docs.google.com/spreadsheets/d/1fVWACDuta9KMSVUaQxosTUswX4zLdPn8WP6hOHwXubU/edit#",false);
  // console.log(res);
  // console.log(res.configs[0][MASTER.ENTITIES]);
  // console.log(res.configs[0][MASTER.ENTITIES][0][MASTER.NAME_SPACE]);
  //   console.log(res.configs[0][MASTER.ENTITIES][0]);
console.log(res.configs);
console.log(res.other);
 //console.log(JSON.stringify(res));
}

function test_MasterSheet() {
  var res = S6Master.newMaster("https://docs.google.com/spreadsheets/d/1mUb7XjzGc_ux7Su8jX8ya4RyOgu_6pDIJD9hS3DebJc/edit",true);
  var ss = res.getSpreadsheetForNameSpace("customer.account");
  console.log(ss.getName());
}