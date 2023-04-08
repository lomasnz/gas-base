var TEST_FEILDS = [{
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
function test_get() {

  var res = S6Cache._getMemoryCache("1");
  console.log("should be undefined",res);
  S6Cache._putMemoryCache("1", TEST_FEILDS);

  res = S6Cache._getMemoryCache("1");
  console.log(res);
  S6Cache._putMemoryCache("2", TEST_FEILDS[0]);

  res = S6Cache._getMemoryCache("2");
  console.log(res);

  S6Cache._deleteMemoryCache();
  res = S6Cache._getMemoryCache("2");
  console.log(res);

}

function test_get2() {

  console.time("first");
  var res = S6Cache.userCacheGetJson("customer.account");
  console.timeEnd("first");
  console.log(res);
  
  console.time("second");
  res = S6Cache.userCacheGetJson("customer.account");
  console.timeEnd("second");
  console.log(res);
  S6Cache.userCachePutJson("1", TEST_FEILDS);

  res = S6Cache.userCacheGetJson("1");
  console.log(res);
  S6Cache.userCachePutJson("2", TEST_FEILDS[0]);

  res = S6Cache.userCacheGetJson("2");
  console.log(res);

  // S6Cache.userCacheClear();
  // res = S6Cache.userCacheGetJson("2");
  // console.log(res);

}
