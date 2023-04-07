function testLookup() {
  var res = S6MasterTemplate.new("https://docs.google.com/spreadsheets/d/1mUb7XjzGc_ux7Su8jX8ya4RyOgu_6pDIJD9hS3DebJc/edit",true);
  console.log(res);
  console.log(res.lookupUrl("checklist.dealreg"));
   console.log(res.lookupUrl("https://test"));
}
function testMasterUrl() {
 console.log( PropertiesService.getUserProperties().getProperty(USER_PROPERTY_MASTER_URL) );;
}
