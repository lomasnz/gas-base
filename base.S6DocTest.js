function text_extract() {
  let s = `This **bang, backtogo got.** "We are deeply saddened to inform you that your beloved cat has passed away. We understand that this is a difficult time for you and we want to express our sincere condolences. We did everything we could to try and save your cat, utilizing the latest medical procedures available. Unfortunately, cats do get old and die, and we are sorry that we were unable to prevent this from happening. We understand that this is a difficult time for you and we want to provide you with any support that we can. *Additionally, it does not mention any plans for how the organization will respond to similar situations in the future.* If you have any questions or concerns, please do not hesitate to reach out.`;
  console.log(extractFormatting(s));
}

function extractFormatting(text) {
  const results = [];
  let startIndex = text.indexOf("*");

  while (startIndex !== -1) {
    let endIndex;
    let format;

    if (text[startIndex + 1] === "*") {
      endIndex = text.indexOf("**", startIndex + 2);
      format = "double";
    } else {
      endIndex = text.indexOf("*", startIndex + 1);
      format = "single";
    }

    if (endIndex === -1) {
      break;
    }

    const extractedText = text.slice(startIndex, endIndex + 2);
    results.push({ text: extractedText, format });

    startIndex = text.indexOf("*", endIndex + 2);
  }

  return results;
}

function extractBoldText() {
  var doc = DocumentApp.getActiveDocument();
  var parent = doc.getBody().getParent();

  // Loop through all the child elements in the document
  for (var i = 0; i < parent.getNumChildren(); i++) {
    var type = parent.getChild(i).getType();

    // Check if the element is a body section, header section, or footer section
    if (type === DocumentApp.ElementType.BODY_SECTION ||
      type === DocumentApp.ElementType.HEADER_SECTION ||
      type === DocumentApp.ElementType.FOOTER_SECTION) {

      var section = parent.getChild(i);
      var paragraphs = section.getParagraphs();

      // Loop through each paragraph in the section
      for (var j = 0; j < paragraphs.length; j++) {
        var paragraph = paragraphs[j];

        // Loop through each child element in the paragraph
        for (var k = 0; k < paragraph.getNumChildren(); k++) {
          var element = paragraph.getChild(k);

          // Check if the element is a text element
          if (element.getType() === DocumentApp.ElementType.TEXT) {
            var text = element.getText();
            var attributes = element.getAttributes();
            var eText = element.asText();
            if (eText.isBold()) {
              console.log("bold",text);
            }

            for (var att in attributes) {
              if (attributes[att]) {
                console.log(att + ":" + attributes[att],text);
              }
            }
          }
        }
      }
    }
  }
}





function testOut() {
  let a = 1;
  let b = 2;
  return { x: a, b };
}
function testInout() {
  var { x, b } = testOut();
  console.log(x);
  console.log(b);
}

function testListItem() {
  var li = new Element.ListItem();
  console.log(li);
}
function testActive() {
  var folderId = "1J_r4r5c8tDMXZzCkpwL5Lbz8UKvreAqp";
  // var now =  new Date(2022,8,31,20,23,0,0) // Date.now().toPrecision() - 1000000;
  // console.log(Utilities.formatDate(now,Session.getTimeZone(),"HH:mm:ss"));
  // var time = now.valueOf();
  // console.log(time);
  //var time = Date.now().toPrecision() - 1000 * 60 * 15;
  var time = 1661934235515;

  var request =
  {
    "ancestorName": `items/${folderId}`,
    "consolidation_strategy": { "legacy": {} },
    "filter": `detail.action_detail_case:(RENAME CREATE) AND time > ${time}`
  };


  console.log(Utilities.formatDate(new Date(), Session.getTimeZone(), "HH:mm:ss"));
  console.log(Utilities.formatDate(new Date(time), Session.getTimeZone(), "HH:mm:ss"));

  console.log(request);
  var response = DriveActivity.Activity.query(request);

  for (a in response.activities) {
    //console.log(response.activities[a]);
    for (i in response.activities[a]) {
      if ([i] == "targets") {
        console.log(response.activities[a][i]);
      }
    }
  }

  console.log(JSON.stringify(response));


}

function test_Cache() {
  S6Cache.userCacheClear();

  var res = S6Doc._getChachedDoc("1Z968h8W5ABnFkPcMUkJDlSrZEqTjyd6y5Rg6ZR6fmYA")
  console.log(res);

  res = S6Doc._getChachedDoc("1Z968h8W5ABnFkPcMUkJDlSrZEqTjyd6y5Rg6ZR6fmYA")
  console.log(res);
}
function test_doc() {
  S6Cache.userCacheClear();
  S6Utility.initAddOn();

  console.time("create");
  var res = S6Doc.newFromId("1Z968h8W5ABnFkPcMUkJDlSrZEqTjyd6y5Rg6ZR6fmYA");
  console.log(res);
  console.timeEnd("create");
  console.time("createAgain");
  res = S6Doc.newFromId("1Z968h8W5ABnFkPcMUkJDlSrZEqTjyd6y5Rg6ZR6fmYA");
  console.log(res);
  console.timeEnd("createAgain");
}

function test_j() {
  var res = JSON.parse("EMPTY");

}


function test_S6Doc() {
  //S6Cache.userCacheClear();
  //var res = S6Doc.newFromId("1Z968h8W5ABnFkPcMUkJDlSrZEqTjyd6y5Rg6ZR6fmYA");

  var res = S6Doc.newFromId("10gpm5edddhmUyKrFDJGV8Gn_FcFtWQtEuL38Dqz22k0");

  console.log(res.document);
  // console.log(res.document[DOC.ENTITY_CONFIG]);
  // console.log(res.document[DOC.ENTITY_CONFIG][ENTITY.ENTITY_ICON_URL])



}

function test_Drive() {
  //var res = Drive.Files.list({  q : 'mimeType=\'application/vnd.google-apps.folder\'' });
  var res = Drive.Children.list("0ACbppDb17bdQUk9PVA", { q: 'mimeType=\'application/vnd.google-apps.folder\'' });

  console.log(JSON.stringify(res));
}

function testMime() {
  var file = DriveApp.getFileById("1Z968h8W5ABnFkPcMUkJDlSrZEqTjyd6y5Rg6ZR6fmYA");
  console.log(file.getMimeType());
}