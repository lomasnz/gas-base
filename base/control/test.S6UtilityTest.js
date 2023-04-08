function test_containsWord() {
  console.log(S6Utility.containsWord("this has a date word","date"));
  console.log(S6Utility.containsWord("this does not","date"));
  console.log(S6Utility.containsWord("this should notdate","date"));

}


function testTrim() {
  var res = S6Utility.trim("https://docs.google.com/spreadsheets/d/1naR0j2dmRAQSiNdDazdq6ohnz3ZvnDk6v-JhfvwBeu8/edit");
}

function testStarts() {
 console.log(  S6Utility.startsWith("_Template","_") );
}
function testDrive() {
  // var res = Drive.Drives.get("1BaW8Iy_5sDTaIg3i5ikLX_8J1BfrKSpc",{supportsAllDrives: true});
  // console.log(JSON.parse( res));
  
  // var res = Drive.Files.get("1BaW8Iy_5sDTaIg3i5ikLX_8J1BfrKSpc", {supportsAllDrives: true});
  // console.log(res.userPermission.role);
  console.log(S6Utility.hasEditAccess("0AHlGL_9Gm0HhUk9PVA-----"));
}

function testParseDate() {
  var name = "TEST";
  console.log( S6Utility.parseDateYYYY_MM_DD(name) );

}

function testParseDate2() {
  var name = "2010-05-06T00:00:00.000+1200";
  console.log( S6Utility.formatDateMMM_d_YYYY(new Date(name)) );

}

function testSquish() {
  console.log(S6Utility.squish( " this is a     very big   space"));
}



function testSS() {
  //var id = S6Utility.getIdFromUrl("https://docs.google.com/spreadsheets/d/1mUb7XjzGc_ux7Su8jX8ya4RyOgu_6pDIJD9hS3DebJc/edit");
  //var res = S6MasterTemplate._listTemplates(id)
  
  //var id = S6Utility.getIdFromUrl("https://docs.google.com/presentation/d/1rimai9bree5kZIsWY9nXOXnljaLZgo5L0iZWeV4dC3M/edit");
  //var res = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mUb7XjzGc_ux7Su8jX8ya4RyOgu_6pDIJD9hS3DebJc/edit");
  //var res = SpreadsheetApp.openById(id);

 //var res = SpreadsheetApp.openByUrl("https://docs.google.com/presentation/d/1rimai9bree5kZIsWY9nXOXnljaLZgo5L0iZWeV4dC3M/edit");
  var res =  SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mUb7XjzGc_ux7Su8jX8ya4RyOgu_6pDIJD9hS3DebJc/edit")
  var id = S6Utility.getIdFromUrl("https://docs.google.com/presentation/d/1rimai9bree5kZIsWY9nXOXnljaLZgo5L0iZWeV4dC3M/edit");
  var res = DriveApp.getFileById(id);
  console.log(res.getName());
  res = SpreadsheetApp.openById(id);
  console.log(res.getName());

}
function mergeImages() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var imageObj1 = new Image();
  var imageObj2 = new Image();
  imageObj1.src = "1.png"
  imageObj1.onload = function () {
    ctx.drawImage(imageObj1, 0, 0, 328, 526);
    imageObj2.src = "2.png";
    imageObj2.onload = function () {
      ctx.drawImage(imageObj2, 15, 85, 300, 300);
      var img = c.toDataURL("image/png");
      document.write('<img src="' + img + '" width="328" height="526"/>');
    }
  };
}

function testSlide() {
  // var file = DriveApp.getFileById("13L9XdEZT6wfAqrJ3ZYGldnoDr_plUJjO");

  // var imageBytes = file.getThumbnail().getBytes();
  // var encodedImageURL = "data:image/jpeg;base64," + Utilities.base64Encode(imageBytes);
  var presentation = SlidesApp.create("test");
  var slide = presentation.appendSlide();
  var image = slide.insertImage("https://github.com/google/material-design-icons/blob/master/png/action/check_circle_outline/materialiconsoutlined/48dp/2x/outline_check_circle_outline_black_48dp.png?raw=true");
  image.getBorder().setWeight(10);
  var imageBytes = image.getBlob().getBytes()
  var encodedImageURL = "data:image/jpeg;base64," + Utilities.base64Encode(imageBytes);
  console.log(encodedImageURL);
}

function testSimpleImage() {
  DocumentApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile("FileOpen.html"))
}

function test_getFolderFromDirectory() {
  var rootFolderId = "0AC4tKjG6negTUk9PVA";
  var folder = DriveApp.getFolderById(rootFolderId);
  var dir = "TEST" + FOLDER_SEPERATOR + "1. Published";
  var folderNew = S6Utility.getFolderFromDirectory(folder, dir);
  console.log(folderNew.getName());
}

function test_shortGUID() {
  console.log(S6Utility.makeShortGuid(1));
}
function test_trim() {
  var x;
  var res = S6Utility.trim(x);
  console.log(res);
}
function test_getAppIconForType() {
  var res = S6Utility.getAppIconForType("https://docs.google.com/document/d/1ClyyUDT-JaWAsm41pr-Hh5McCCqLtFa7Pi4C3VCJ_Kk/edit");
  console.log(res);
}

function test_Eval() {
  var sSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit#gid=473681650");
  var sheet = sSheet.getSheetByName("Templates")
  var res = S6Utility.evaluateCell(sheet, "B7");
  console.log(res);
}

function test_FindFile() {
  var res = S6Utility.getFileFromRootFolderIdAndFromPath("0AC4tKjG6negTUk9PVA", "SECTION6 AND RED HAT\\1. Published\\Tumbnail");
  console.log(res);
}

function test_getGoogleDocTypeFromURL() {
  testEquales(getGoogleDocTypeFromURL("https://docs.google.com/spreadsheets/d/1rwl3lmN-FD-wPIj5A-pLGH4Jh9cvZXBiB2F3W0rK68Y/edit"), getGoogleDocTypeFromURL(GOOGLE_FILE_TYPE_SPREADSHEET_ID));

}
function test_getAppIconForTypeFromURL() {
  var res = S6Utility.getAppIconForTypeFromURL("https://docs.google.com/document/d/1ZLBddL6tXzilf_aeLd5kwR3RMy0RqoFYVWUtEwtgbSU/edit#");
  console.log(res);
}

function test_getDomainURL() {
  var res = getDomainURL("poal.co.nz");
  console.log(res);
  testEquales(res, "https://poal.co.nz");
}
function test_isDomainName() {

  testEquales(isADomain("section6.io"), true);
  testEquales(isADomain("section6.nz"), true);
  testEquales(isADomain("fail.io.nz"), false);
}

function test_URL() {
  new URL("https://section6.io");
}

function test_replace() {
  var p = new Param();

  var field = "{domain-name}";
  var value = "s6.org";
  var title = "internet domain";
  var type = "domain";

  p.addJSON("fields", { field: field, value: value, type: type, title: title });

  field = "{short-name}";
  value = "S6";
  title = "Short name";
  type = "text";

  p.addJSON("fields", { field: field, value: value, type: type, title: title });
  p.addValue("test", "test value1");
  console.log(p.getFirst("test"));
  p.replaceValue("test", "test value2222");
  console.log(p.getFirst("test"));

  testEquales(p.countOf("fields") + "", "2");
  console.log(JSON.stringify(p.toJSON()));

  console.log("fields only");
  console.log(JSON.stringify(p.toJSON("fields")));

  var data = "dn[{domain-name}] sn[{short-name}]}";
  var fields = p.getAllArrayOfJSON("fields");
  var res = S6Utility.replaceFieldInText(fields[0], data);
  console.log(res);

}

function test_time() {
  var s = "xyz";
  var y = runTimeToLog(() => { return s.replace("x", "A"); }, "Test");
  console.log(y);
}
function test_getIdFromUrl() {
  console.log(getIdFromUrl("https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit#gid=806626764"));
  console.log(getIdFromUrl("https://drive.google.com/drive/folders/0ACbppDb17bdQUk9PVA"));
  console.log(getIdFromUrl("https://drive.google.com/drive/folders"));
}

function test_getFavicon() {
  var res;
  console.log(getFavicon("section6.io") == null ? "Null" : "Found")
  console.log(getFavicon("tsb.co.nz") == null ? "Null" : "Found")
  res = res;
}
function test_getFaviconDomainFetchURL() {
  var res;
  console.log(getFaviconDomainFetchURL("section6.io"));
  console.log(getFaviconDomainFetchURL("tsb.co.nz"));
  console.log(getFaviconDomainFetchURL("template.client"));
  res = res;
}

function test_startsWith() {
  console.log(startsWith("section6.io", "_template"));
  console.log(startsWith("_templates", "_templates"));
  console.log(startsWith("_templates", "_template"));
}

function test_getFileFromRootFolderIdAndFromPath() {
  var file = getFileFromRootFolderIdAndFromPath("0ACbppDb17bdQUk9PVA", "vector.co.nz/1. Images/vector.co.nz_Logo");
  console.log(file);


}

function test_list() {

  var meta = '{"name":"S6 TOOL BOX","version":"1.1","fields":[{"field":"{long-name}","value":"VECTOR LIMITED","title":"Full name","type":"text"},{"field":"{short-name}","value":"Vector","title":"Short name","type":"text"},{"field":"{domain-name}","value":"vector.co.nz","title":"Internet domain","type":"domain"}],"configSheetId":"1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0","folderType":"RootFolder","rootFolderId":"1goN2DcmaW2reZVDsEcP1ncLImXMICvoW"}';

  var list = "{long-name} ({short-name})";
  var log = getListDescription(meta, list);
  console.log(log);

}
function test_list2() {
  var meta = '[{"field":"{short-name}","value":"TSB","title":"Short name"},{"field":"{domain-name}","value":"tsb.co.nz","title":"Internet domain"},{"field":"{long-name}","value":"TSB BANK LIMITED","title":"Full name"}]';
  var list = "{long-name} ({short-name})";
  var log = getListDescription(meta, list);
  console.log(log);

}

function test_Param() {
  var param = {
    "entity": "Customer",
    "url": "https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit#gid=806626764",
    "folders": [
      {
        "folder": "lomas.co.nz",
        "docs": [
          {
            "fileName": "empty",
            "url": "empty"
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Logos and Images",
        "docs": [
          {
            "fileName": "",
            "url": ""
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Proposals",
        "docs": [
          {
            "fileName": "Template 05 Mar16:40:05Lomas Limited ",
            "url": "https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit#gid=1664564876"
          },
          {
            "fileName": "Doc File 2 lomas.co.nz",
            "url": "https://docs.google.com/document/d/1jx2eMKVOFXy11AxgKg9SEEpDULCMH37fK1QTKwGIqb8/edit"
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Contracts",
        "docs": [
          {
            "fileName": "empty",
            "url": "empty"
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Contracts/Statements of Work",
        "docs": [
          {
            "fileName": "empty",
            "url": "empty"
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Contracts/Statements of Work/Quotes",
        "docs": [
          {
            "fileName": "Template 05 Mar16:40:06Lomas Limited ",
            "url": "https://docs.google.com/spreadsheets/d/1NlhwlgRfmQ_jDnRIV-t-OLFyuBNHyW-S-JTjIVGSEH0/edit#gid=1664564876"
          },
          {
            "fileName": "Doc File 2 lomas.co.nz",
            "url": "https://docs.google.com/document/d/1jx2eMKVOFXy11AxgKg9SEEpDULCMH37fK1QTKwGIqb8/edit"
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Rate Cards",
        "docs": [
          {
            "fileName": "empty",
            "url": "empty"
          }
        ]
      },
      {
        "folder": "lomas.co.nz/Rate Cards/WIP",
        "docs": [
          {
            "fileName": "Lomas Limited Rate Card",
            "url": "https://docs.google.com/spreadsheets/d/1rwl3lmN-FD-wPIj5A-pLGH4Jh9cvZXBiB2F3W0rK68Y/edit#gid=2139991779"
          }
        ]
      }
    ]
  };
  var doCreateAction = CardService.newAction()
    .setFunctionName("doCreate")
    .setParameters(param)
    ;

}

function test_getUsersDisplayName() {
  console.log(S6Utility.getUsersDisplayName());
}
function test_Year() {
  var d = Date.parse("May");
  console.log(d);
  console.log(d === NaN);
  console.log(isNaN(d));
}

function testTodayUtility() {
  console.log(S6Utility.getToday());
}

function test_Tod() {
  var today = new Date();

  console.log("date:", new Intl.DateTimeFormat({
    weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
    second: 'numeric', // numeric, 2-digit
  }).format(today));
}

