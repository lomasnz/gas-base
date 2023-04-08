function testgetFoldersAtDepth() {
  //S6Context.new();
  var folder = S6DriveApp.getFolderById("1R6pQngbuCJUK3pqYJ18AHEBToTrpoHN_");
  var folders = S6DriveApp.getFoldersAtDepth(folder, 1);
  console.log(folders.length);
  for (var i = 0; i < folders.length; i++) {
    console.log(folders[i].getName());
  }

}
function test_createFolders() {
  var id = "1LSgRdUA2Afu1_R0v7w_RvUJkOgfHQJ3p";
  var folder = S6DriveApp.getFolderById(id);
  var folders = S6DriveApp.createFolders("a\\b\\c\\file", folder, true);
  for (var i = 0; i < folders.length - 1; i++) {
    console.log(folders[i].getName());
  }
  console.log(folders[folders.length - 1]);
}

function testL() {
  var res = [];
  console.log(parseInt(1));
}

function test_Image() {
  //var doc = S6DocumentAdapater.create("1j5Hv7CBvynpwnqd7dqCtpv-t3rttENBywDgF-VF8vYo");
  //var file = DriveApp.getFileById("1j5Hv7CBvynpwnqd7dqCtpv-t3rttENBywDgF-VF8vYo");
  var file = DocumentApp.openById("1j5Hv7CBvynpwnqd7dqCtpv-t3rttENBywDgF-VF8vYo");
  //var image = file.getBlob();
  var range = file.getBody().editAsText().findText("{customer.account#org.domain.name}");
  var text = range.getElement().asText();;

  text.setBackgroundColor(range.getStartOffset(), range.getEndOffsetInclusive(),"#A0A0A0")

}

function test_id() {
  var url = "https://drive.google.com/uc?export=view&id=1j5Hv7CBvynpwnqd7dqCtpv-t3rttENBywDgF-VF8vYo";
  console.log(S6Utility.getIdFromUrl(url));
}


function testDesc() {
  //S6Context.new();
  var folder = S6DriveApp.getFolderById("16dgMfDZH0JJg_aJ9B3aOxFY9vkh1gTGs");
  console.time("desc");
  var desc = folder.getDescription();
  console.timeEnd("desc");
  console.time("desc");
  var desc = folder.getDescription();
  console.timeEnd("desc");
  console.time("desc");
  var desc = folder.getDescription();
  console.timeEnd("desc");
  console.time("desc");
  var desc = folder.getDescription();
  console.timeEnd("desc");
  console.time("desc");
  var desc = folder.getDescription();
  console.timeEnd("desc");
  console.log(desc);
  console.log(S6DriveApp.cacheStats());

}