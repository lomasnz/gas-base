const ICON_CREATE = makeIcon(ICON_CREATE_URL);
const ICON_INFO = makeIcon(ICON_INFO_URL);
const ICON_GO_TO_FOLDER = makeIcon(ICON_GO_TO_FOLDER_URL);
const ICON_LIST = makeIcon(ICON_LIST_URL);
const ICON_NEW_FILE = makeIcon(ICON_NEW_FILE_URL);
const ICON_NEW_FOLDER = makeIcon(ICON_NEW_FOLDER_URL);
const ICON_SETTINGS = makeIcon(ICON_SETTINGS_URL);
const ICON_DONE = makeIcon(ICON_DONE_URL);


function makeIcon(iconUrl) {
  return CardService.newIconImage().setIconUrl(iconUrl);
}


class S6Utility {

  static version() {
    return "1.1";
  }

  static getScriptProperty(name) {
    let res = S6Utility.trim(PropertiesService.getScriptProperties().getProperty(name));
    S6Context.info("Script property [", name, "] exists[", res != EMPTY , "]");
    return res;
  }

  static simple2WayHash(string) {
    // Use a simple mathematical formula to create a unique hash value for the email
    return string.length * 3 + string.charCodeAt(0);
  }

  static simple2WayUnhash(hash) {
    // Use the inverse of the hash function to retrieve the original string
    const length = (hashedEmail - 1) / 3;
    const firstCharCode = hashedEmail - length * 3 - 1;
    const firstChar = String.fromCharCode(firstCharCode);
    return firstChar + ''.padEnd(length - 1, '*');
  }

  static flattenJSON(json) {
    const res = {};

    function flatten(obj, parentKey) {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === 'object') {
          flatten(value, newKey);
        } else {
          res[newKey] = value;
        }
      });
    }

    flatten(json);
    return res;
  }


  static isFileFolder(file) {
    var res = false;
    if (file) {
      res = file.getMimeType() == "application/vnd.google-apps.folder";
    }
    return res;
  }
  static getFileTypeName(file) {
    var mimeType = file.getMimeType();
    var res = DOC_MIMETYPE_NAME[mimeType];
    if (!res) {
      let split = mimeType.split("/");
      if (split.length > 0) {
        res = split[0];
        if (split.length > 1) {
          if (res == "application") {
            res = split[1];
          }
          res = res.charAt(0).toUpperCase() + res.slice(1) + " file";
        }
        S6Context.error("unknown mimetype:", mimeType);
      }
    }
    return res;
  }

  static mapFields(fields) {
    let res = [];
    for (var i = 0; i < fields.length; i++) {
      const fieldName = fields[i].field;
      res.push(fieldName);
      res[fieldName] = fields[i];
    }
    return res;
  }

  static createPairedListDataType(arry) {
    let res = `${DATA_TYPE_PAIRED_LIST}[${arry}]`;
    return res;
  }

  static createPairedListDataTypeFromArray(arry) {
    let res = `${DATA_TYPE_PAIRED_LIST}[${S6Utility.createPairedListFromArray(arry)}]`;
    return res;
  }
  static createInputListDataTypeFromArray(arry) {
    let res = `${DATA_TYPE_INPUT_LIST}[${arry}]`;
    return res;
  }

  static createPairedListFromArray(arry) {
    let res = [];
    let k = 0;
    if (arry) {
      for (var i = 0; i < arry.length; i++) {
        res[k++] = arry[i];
        res[k++] = arry[i];
      }
    }
    return res;
  }

  static initAddOn(event) {

    var masterURL = S6Utility.getMasterSpreadSheetUrl();
    var locale = S6Utility.getUserLocale();
    var userProperties = PropertiesService.getUserProperties();

    if (S6Utility.trim(locale) == "" && event) {
      userProperties.setProperty(USER_PROPERTY_LOCALE, event.userLocale);
    }

    if (S6Utility.trim(masterURL) == "") {
      masterURL = S6Utility.getScriptProperty("master.properties.spreadsheet");// "https://docs.google.com/spreadsheets/d/1fVWACDuta9KMSVUaQxosTUswX4zLdPn8WP6hOHwXubU/edit";
      userProperties.setProperty(USER_PROPERTY_MASTER_URL, masterURL);
    }
 
  }
  static getMasterSpreadSheetUrl() {
    return PropertiesService.getUserProperties().getProperty(USER_PROPERTY_MASTER_URL);
  }
  static getMasterSpreadSheetID() {
    return S6Utility.getIdFromUrl(S6Utility.getMasterSpreadSheetUrl());
  }
  static getMasterSpreadSheet() {
    return SpreadsheetApp.openById(S6Utility.getMasterSpreadSheetID());
  }
  static getUserLocale() {
    return PropertiesService.getUserProperties().getProperty(USER_PROPERTY_LOCALE);
  }

  static isFileValid(id) {
    var res = "";
    try {
      var file = DriveApp.getFileById(id);
    }
    catch (e) {
      res = e.message;
    }
    return res;
  }
  static reverseBool(value) {
    var res = value == "true" ? "false" : "true";
    return res;
  }


  /**
 * @param {string} iconUrl - parth to icon to create 
 * @return {IconImage} - Icon from path
 */
  static makeIcon(iconUrl) {
    return CardService.newIconImage().setIconUrl(iconUrl);
  }

  static getIconUrlForMimeType(mimeType) {
    S6Validate.mandatory("mimeType", mimeType);
    const res = `${DOC_ICON_URL_PREFIX}${mimeType}`;
    return res;
  }

  static getIconUrlForFile(file) {
    S6Validate.mandatory("file", file);
    return S6Utility.getIconUrlForMimeType(file.getMimeType());
  }

  static getIconUrlForFolder() {
    return S6Utility.getIconUrlForMimeType("application/vnd.google-apps.folder");
  }

  static parseDateYYYY_MM_DD(date) {
    var res;
    try {
      res = Utilities.parsetDate(date, Session.getTimeZone(), "yyyy-MM-dd");
    }
    catch (err) {
      S6Context.warn(err);
    }
    return res;
  }

  static formatDateYYYY_MM_DD(date) {
    var res;
    try {
      res = Utilities.formatDate(date, Session.getTimeZone(), "yyyy-MM-dd");
    }
    catch (err) {
      S6Context.warn(err);
    }
    return res;
  }

  static formatDateD_MMMMM_YYYY(date) {
    var res;
    try {
      res = Utilities.formatDate(date, Session.getTimeZone(), "d MMMMM yyyy");
    }
    catch (err) {
      S6Context.warn(err);
    }
    return res;
  }

  static formatDateMMM_d_YYYY(date) {
    var res;
    try {
      res = Utilities.formatDate(date, Session.getTimeZone(), "MMM d YYYY");
    }
    catch (err) {
      S6Context.warn(err);
    }
    return res;
  }

  static getAppForType(type) {
    var res = EMPTY;
    switch (type) {
      case (GOOGLE_FILE_TYPE_SPREADSHEET_NAME):
        res = SpreadsheetApp;
        break;
      case (GOOGLE_FILE_TYPE_DOC_NAME):
        res = DocumentApp;
        break;
      case (GOOGLE_FILE_TYPE_SLIDE_NAME):
        res = SlidesApp;
        break;
      case (GOOGLE_FILE_TYPE_FORM_NAME):
        res = FormApp;
        break;
      default:
        S6Context.error("S6Utility::getAppForType: invalid app type", type);
    }
    return res;
  }

  static getAppIconForTypeFromURL(url) {
    var res = EMPTY;
    const type = S6Utility.getGoogleDocTypeFromURL(url);
    switch (type) {
      case (GOOGLE_FILE_TYPE_DOC_NAME):
        res = ICON_GOOGLE_DOC_URL;
        break;
      case (GOOGLE_FILE_TYPE_SLIDE_NAME):
        res = ICON_GOOGLE_PRESENTATION_URL;
        break;
      case (GOOGLE_FILE_TYPE_SPREADSHEET_NAME):
        res = ICON_GOOGLE_SPREADSHEET_URL;
        break;
      case (GOOGLE_FILE_TYPE_FORM_NAME):
        res = ICON_GOOGLE_FORM_URL;
        break;
      default:
        res = S6Utility.getIconUrlForFolder();
      //S6Context.error("S6Utility::getAppIconForTypeFromURL: invalid app type", url, ", type:", type);
    }
    return res;
  }
  static getAppIconForType(type) {
    var res = EMPTY;
    switch (type) {
      case (GOOGLE_FILE_TYPE_DOC_ID):
        res = ICON_GOOGLE_DOC_URL;
        break;
      case (GOOGLE_FILE_TYPE_PRESENTATION_ID):
        res = ICON_GOOGLE_PRESENTATION_URL;
        break;
      case (GOOGLE_FILE_TYPE_SPREADSHEET_ID):
        res = ICON_GOOGLE_SPREADSHEET_URL;
        break;
      case (GOOGLE_FILE_TYPE_FORM_ID):
        res = ICON_GOOGLE_FORM_URL;
        break;
      default:
        S6Context.error("S6Utility::getAppIconForType: invalid app type", url);
    }
    return res;
  }
  static getAppForTypeFromUrl(url) {
    return S6Utility.getAppForType(S6Utility.getGoogleDocTypeFromURL(url));
  }
  /**
   *  Tests is the given string is a valid domain name.
   *  In this static a calid domain name:
   *  Is a url a valid url once http:// is added to the front.
   *  Does not contain any / slashes  
   * 
   *  @param {string} domainToTest is contains the doman name to test 
   *  @return {boolean} true if it is a dmona as per the rules above, otehrwise false. 
   */

  static isADomain(domain) {
    return S6Utility.getFaviconDomainFetchURL(domain) == "" ? false : true;
  }
  static isDomainName(domainToTest) {
    var res = false;
    if (domainToTest != null) {
      if (!domainToTest.includes("/")) {
        try {
          var wwwURL = `https://www.${domainToTest}`;
          //var URL = require('url').URL;
          var url = UrlFetchApp.fetch(wwwURL);
          res = true;
        } catch (_) {
          try {
            var nackedURL = `https://${domainToTest}`;
            var url = UrlFetchApp.fetch(nackedURL);
            res = true;
          }
          catch (_) {
            // nop op
          }
        }
      }
    }
    return res;
  }
  /**
   * Determines the trype of Google document from a url
   * @param {string} url - parses to determined what type of Google doc'
   * @return Hueam readbale Google Doc type 
   */
  static getGoogleDocTypeFromURL(url) {
    return url == null ? "Undefined" :
      url.includes(GOOGLE_FILE_TYPE_SPREADSHEET_ID) ? GOOGLE_FILE_TYPE_SPREADSHEET_NAME :
        url.includes(GOOGLE_FILE_TYPE_DOC_ID) ? GOOGLE_FILE_TYPE_DOC_NAME :
          url.includes(GOOGLE_FILE_TYPE_PRESENTATION_ID) ? GOOGLE_FILE_TYPE_SLIDE_NAME :
            url.includes(GOOGLE_FILE_TYPE_FORMS_ID) ? GOOGLE_FILE_TYPE_FORM_NAME : "Unknown";
  }
  /**
 * Determines the trype of Google document from a url
 * @param {string} url - parses to determined what type of Google doc'
 * @return Hueam readbale Google Doc type 
 */
  static getGoogleDocIDFromURL(url) {
    return url == null ? "Undefined" :
      url.includes(GOOGLE_FILE_TYPE_SPREADSHEET_ID) ? GOOGLE_FILE_TYPE_SPREADSHEET_ID :
        url.includes(GOOGLE_FILE_TYPE_DOC_ID) ? GOOGLE_FILE_TYPE_DOC_ID :
          url.includes(GOOGLE_FILE_TYPE_PRESENTATION_ID) ? GOOGLE_FILE_TYPE_PRESENTATION_ID :
            url.includes(GOOGLE_FILE_TYPE_FORMS_ID) ? "Form" : OOGLE_FILE_TYPE_FORMS_ID;
  }

  /**
   * @param {string} object to obtain a string from and trim
   * @return {string} trimed string 
   */
  static trim(toTrim = EMPTY) {
    let res = EMPTY;
    // S6Context.debugFn(S6Utility.trim,toTrim);
    if (toTrim && toTrim != EMPTY) {
      res = (toTrim + EMPTY).trim();
    }

    return res;
  }
  static squish(toSqusih = EMPTY) {
    return toSqusih.trim().replace(/\s\s+/g, ' ');
  }
  static containsWord(string = EMPTY, word = EMPTY) {
    return string.toLowerCase().match(`\\b${word.toLowerCase()}\\b`) != null;
  }


  /**
   * DriveApp does not provide a static to get a file from the URL. 
   * But the url does contain an ID and the DriveApp does allow you to get a folder/file by ID.
   * @param {string} url - from Googel Drive 
   * @reurn {string} - ID from url
   */
  static getIdFromUrl(url) {
    S6Validate.mandatory("url", url);
    var res = EMPTY;
    var m = url.match(/[-\w]{15,}/);
    if (m && m.length > 0) {
      res = m[0];
    }
    else if (url.length > 39) {
      // could be a teamdirve
      res = url.slice(39);
    }
    //S6Context.log("ID from url is:", res);
    return res;
  }

  static getFavicon(domain) {
    var res;
    domain = S6Utility.trim(domain);
    var wwwURL = `https://www.google.com/s2/favicons?domain_url=www.${domain}&size=64`;
    try {
      res = UrlFetchApp.fetch(wwwURL);
    }
    catch (err) {
      //S6Context.log(wwwURL);
      S6Context.error(err);
      res = null;
    }
    if (res == null || res.naturalHeight == 16) {
      var nackedURL = `https://www.google.com/s2/favicons?domain_url=${domain}&size=64`;
      try {
        res = UrlFetchApp.fetch(nackedURL);
        if (res.naturalHeight == 16) {
          res = null;
        }
      }
      catch (err) {
        //S6Context.log(nackedURL);
        S6Context.error(err);
        res = null;
      }
    }
    return res;
  }

  static getDomainURL(domain) {
    let res = "";
    var favIcon;
    domain = S6Utility.trim(domain);
    var wwwURL = `https://www.google.com/s2/favicons?domain_url=https://www.${domain}&size=64`;
    try {
      favIcon = UrlFetchApp.fetch(wwwURL);
      res = `https://www.${domain}`;
    }
    catch (err) {
      //S6Context.log(wwwURL);
      //S6Context.log(err);
      favIcon = null;
    }
    if (favIcon == null || favIcon.naturalHeight == 16) {
      var nackedURL = `https://www.google.com/s2/favicons?domain_url=https://${domain}&size=64`;
      try {
        favIcon = UrlFetchApp.fetch(nackedURL);
        if (favIcon.naturalHeight == 16) {
          favIcon = null;
        }
        else {
          res = `https://${domain}`;
        }
      }
      catch (err) {
        //S6Context.log(nackedURL);
        //S6Context.log(err);
      }
    }
    return res;
  }
  /**
   * The Favicon is the image shown in the browser from a website.
   * This function gets that images from the given domain name.
   * @param {string} - domain name, eg section6.io
   * @return {Image} - favicon image for teh given domain
   */
  static getFaviconDomainFetchURL(domain) {
    var res = null;
    var icon;
    domain = S6Utility.trim(domain);
    var wwwURL = `https://www.google.com/s2/favicons?domain_url=www.${domain}&size=64`;
    try {
      icon = UrlFetchApp.fetch(wwwURL);
    }
    catch (err) {
      //S6Context.log(wwwURL);
      //S6Context.log(err);
      icon = null;
    }
    // this check assumes that if the naturalhieght is 16 then Google has retured a default icon
    if (icon == null || icon.naturalHeight == 16) {
      var nackedURL = `https://www.google.com/s2/favicons?domain_url=${domain}&size=64`;
      try {
        icon = UrlFetchApp.fetch(nackedURL);
        // this check assumes that if the naturalhieght is 16 then Google has retured a default icon
        if (icon.naturalHeight == 16) {
          icon = null;
        } else {
          res = `https://www.google.com/s2/favicons?domain_url=${domain}`;
        }
      }
      catch (err) {
        //S6Context.log(nackedURL);
        //S6Context.log(err);
        icon = null;
      }
    }
    else {
      res = `https://www.google.com/s2/favicons?domain_url=www.${domain}`;
    }
    return res == null ? EMPTY : res;
  }
  /**
   * @return {boolean} - true if the name starts with ignoreListStartsWith
   */
  static startsWith(name, ignoreListStartsWith) {
    return S6Utility.trim(ignoreListStartsWith) == "" ? false : S6Utility.trim(name).startsWith(S6Utility.trim(ignoreListStartsWith));
  }
  /**
   * @param {Folder} rootFolder - where to start searching for a particiulare file given by pathAndFile
   * @param {String} pathAndFile - the file incldudings its patryh top search for eg company.co.nz/filename.doc 
   * @return {File} - the file if found
   */
  static getFileFromRootFolderAndFromPath(folder, pathAndFile) {
    var res;
    var split = pathAndFile.split(FOLDER_SEPERATOR);

    for (var i = 0; i < split.length - 1; i++) {
      var folders = folder.getFoldersByName(split[i]);
      if (folders.hasNext()) {
        folder = folders.next();
      }
      else {
        break;
      }
    }
    if (folder != null) {
      var s = split.length - 1;
      var name = split[s];

      var files = folder.getFilesByName(name);
      if (files.hasNext()) {
        res = files.next();

      }
    }
    return res;
  }


  static getFolderFromRootFolderAndPath(rootFolder, path) {
    var res;
    if (path != null) {
      var split = path.split(FOLDER_SEPERATOR);
      var res = rootFolder;
      for (var i = 0; i < split.length; i++) {
        if (split[i].trim != "") {
          //S6Context.log("getFolderFromRootFolderAndPath:" + split[i]);
          var folders = res.getFoldersByName(split[i]);
          if (folders.hasNext()) {
            res = folders.next();
          }
        }
      }
    }
    return res;
  }
  /**
   * @param {String} rootFolderID - where to start searching for a particiulare file given by pathAndFile
   * @param {String} pathAndFile - the file incldudings its patryh top search for eg company.co.nz/filename.doc 
   * @return {File} - the file if found
   */
  static getFileFromRootFolderIdAndFromPath(rootFolderId, pathAndFile) {
    var res;
    var rootfolder = S6DriveApp.getFolderById(rootFolderId);
    res = S6Utility.getFileFromRootFolderAndFromPath(rootfolder, pathAndFile);
    return res;
  }

  static getFieldsFromFolderDescription(id) {
    var res = [];
    var folder = S6DriveApp.getFolderById(id);

    var json = S6Utility.getMetaDataFromFolder(folder);

    if (json != null) {
      for (var i = 0; i < json.fields.length; i++) {
        res[i] = json.fields[i];
      }
    }
    return res;

  }

  static getMetaDataFromFolder(folder) {
    S6Context.debugFn("getMetaDataFromFolder:in:", folder.getName());
    var res;
    try {
      var desc = folder.getDescription();
      var json;
      if (desc) {
        var json = JSON.parse(desc);
      }
      res = S6Utility.updateMetaData(json, folder);
    }
    catch (err) {
      S6Context.warn("Does not contain valid metadata " + err)
    }
    S6Context.debugFn("getMetaDataFromFolder:out:", res);
    return res;

  }
  static updateMetaData(json, folder) {
    S6Context.debug("updateMetaData:in", json);
    try {
      if (json) {
        var fields;
        if (json.fields) {
          fields = json.fields;
        }
        else {
          fields = json;
        }
        for (let index = 0; index < fields.length; index++) {
          const element = fields[index];
          if (element.valueFromFolderName) {
            if (element.valueFromFolderName == META_DATA.VALUE_FROM_FOLDER) {
              var name = folder.getName();
              S6Context.debugFn("getMetaDataFromFolder, valueFromFolderName. FolderName: ", name, ". Value:", element.value);
              fields[index].value = name;
            }
            else if (element.valueFromFolderName == META_DATA.VALUE_FROM_PARENT_FOLDER) {
              var p = folder.getParentFolder();
              S6Context.debugFn("getMetaDataFromFolder, parent :", p);
              fields[index].value = p.getName();
            }
          }
        }
      }
    }
    catch (err) {
      S6Context.error(err.stack);
      S6Context.error(err);
    }
    S6Context.debug("updateMetaData:out", json);
    return json;
  }

  // static getFolderMetaData(jsonString) {
  //   var res;
  //   //S6Context.log("getFolderMetaData/string:", jsonString);
  //   try {
  //     var json = JSON.parse(jsonString);
  //     if (json != null && json.hasOwnProperty(ADD_ON_NAME_FIELD) && json.hasOwnProperty(ADD_ON_VERSION_FIELD)) {
  //       res = json;
  //       //S6Context.log("getFolderMetaData/string:", json);
  //     }
  //   }
  //   catch (err) {
  //     S6Context.warn("Does not contain valid metadata " + err)
  //   }
  //   return res;
  // }

  // static getListDescription(jsonString, listText) {
  //   var res = "";
  //   if (jsonString != null) {
  //     var json = JSON.parse(jsonString);
  //     if (json.hasOwnProperty("fields")) {
  //       res = S6Utility.replaceFieldInText(json.fields, listText);
  //     }
  //     else {
  //       res = S6Utility.replaceFieldInText(json, listText);
  //     }
  //   }
  //   return res;
  // }
  static listItem(folder, listText) {
    var res = EMPTY;
    const json = S6Utility.getMetaDataFromFolder(folder);
    if (json) {
      res = S6Utility.replaceFieldInText(json.fields, listText);
    }
    return res;
  }
  /**
   * Gets a Folder including Team Drive name by its ID.
   * @param {string} id - Google Drive ID of a Team Drive or Folder  
   * @return {string} - name of the Folder  
   */
  static getFolderNameFromId(id) {
    var res;
    var folder = S6DriveApp.getFolderById(id);
    var name = folder.getName();

    if (name == "Drive" && !folder.getParents().hasNext()) {
      res = S6Utility.getTeamDriveName(id);

    }
    else {
      res = name;
    }
    return res;
  }
  static getFullDirectoryFromId(id, cache = true) {
    var cacheName = "FullDirectoryFromId:" + id;
    S6Context.time(cacheName);
    var res;
    if (cache) {
      var json = S6Cache.globalCacheGetJson(cacheName);
      if (json) {
        res = json.directory;
      }
    }
    if (!res) {
      res = S6Utility.getFullDirectoryFromFolder(S6DriveApp.getFolderById(id));
      S6Cache.globalCachePutJson(cacheName, { directory: res }, CACHE_PRIORITY.LOW);
    }
    S6Context.timeEnd(cacheName);
    return res;
  }
  static getFullDirectoryFromFolder(folder) {
    let res = EMPTY;
    if (folder) {
      var name = folder.getName();
      var hasNext = folder.getParents().hasNext();
      if (name == "Drive" && !hasNext) { // END OF THE LINE THIS IS A TEAM DRIVE
        res = S6Utility.getTeamDriveName(folder.getId()) + (res == EMPTY ? EMPTY : FOLDER_SEPERATOR + res);

      }
      else if (hasNext) {
        res = name;
        name = S6Utility.getFullDirectoryFromFolder(folder.getParents().next());
        if (name) {
          res = name + FOLDER_SEPERATOR + res;
        }
      }
    }
    return res;
  }
  /**
  * Gets the parent folder of a folder.
  * @param {string} id - Google Drive ID of a Team Drive of Folder  
  * @return {Folder} - Parent Folder   
  */
  static getFolderParentFolder(id) {
    var res;
    var folder = S6DriveApp.getFolderById(id);
    var parents = folder.getParents();
    while (parents.hasNext()) {
      res = parents.next();
      break;
    }
    return res;
  }

  /**
   * Gets the list of sub Folders names in a given folder by it ID
   * @param {string} id - Google Drive ID of a Team Drive of Folder  
   * @return {[]]} - Array of sub folder names 
   */
  static getFolderDirectoryForId(id) {
    var res = [];
    var folder = S6DriveApp.getFolderById(id);
    var i = 0;
    while (folder != null) {
      res[i++] = S6Utility.getFolderNameFromId(folder.getId());
      folder = S6Utility.getFolderParentFolder(folder.getId());
    }
    return res;
  }
  /**
   * Gets a Team Drive name by its ID.
   * This is not a standard capability in the API, hence this helper method. 
   * @param {string} id - Google Drive ID of a Team Drive Folder  
   * @return {string} - name of the Team Drive   
   */
  static getTeamDriveName(id) {
    var cacheName = "TeamDrive:" + id;
    S6Context.time(cacheName);
    var res;
    var json = S6Cache.globalCacheGetJson(cacheName);
    if (json) {
      res = json.name;
    }
    else {
      var params = {
        supportsTeamDrives: true,
        includeTeamDriveItems: true,
        fields: "name"
      };
      var td = Drive.Teamdrives.get(id, params);
      if (td) {
        res = td.name;
        S6Cache.globalCachePutJson(cacheName, td);
      }
    }
    S6Context.timeEnd(cacheName);
    return res;
  }
  // static setDriveProperties(p) {
  //   Drive.Properties.
  // }

  static getFolderOrDriveName(folder) {
    var res = "";
    if (folder != null) {
      res = folder.getName();
      if (res == "Drive") {
        res = S6Utility.getTeamDriveName(folder.getId());
      }
    }
    return res;
  }

  /**
   * 
   * @param {JSON} json - must have properties of field and the feild's value
   * @param {String} text - should have values that match field to be replaced by theire value
   * @return {String} - updated text. 
   */
  static replaceFieldInText(json, text = EMPTY) {
    var res = text;
    if (json) {

      S6Context.debugFn("replaceFieldInText with Json", json, text);
      if (json.hasOwnProperty("fields")) { //!
        //S6Context.log("replaceFieldInText Field[" + json.field + "]");
        //res = res.replace(json.field, json.value);
        for (let index = 0; index < json.fields.length; index++) {
          const element = json.fields[index];
          while (res.includes(element.field)) {
            res = res.replace(element.field, element.value);
          }
        }
      }
      else {
        S6Context.debug("replaceFieldInText fields [", json.length, "]");
        for (let i = 0; i < json.length; i++) {
          S6Context.debug("replaceFieldInText looking for[" + json[i].field, "]");
          while (res.includes(json[i].field)) {
            S6Context.debug("replaceFieldInText Replace[" + json[i].field + "] with [" + json[i].value + "]");
            res = res.replace(json[i].field, json[i].value);
          }
        }
      }
      if (res.indexOf("{today}") > -1) {
        res = res.replace("{today}", S6Utility.getToday());
      }
    }
    S6Context.debug("replaceFieldInText", res);
    return res;
  }

  static evaluateUnevaluatedCell(sheet, cell) {
    var sheetCell = sheet.getRang(cell);
    var value = sheetCell.getValue();
    return evaluateUnevaluatedValue(value);
  }
  static evaluateUnevaluatedValue(value) {
    var res = value;
    ////S6Context.log("evaluateUnevaluatedValue(",value,")");
    switch (res) {
      case "#NAME?":
      case "#ERROR?":
      case "REF?":
        var sheetFormula = sheetCell.getFormula();
        if (sheetFormula) {
          sheetCell.clear();
          sheetCell.setFormula(sheetFormula);
          res = S6Utility.trim(sheetCell.getValue());
        }
        break;
      default:
        break;
    }
    return res;
  }
  /**
   * Creates a pseudo guid to the defined length 
   */
  static makePseudoGuid(length = 8) {
    var res = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      res += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    //S6Context.log(res);
    return res;
  }
  /**
   * 
   */
  static evaluateCell(sheet, cell) {
    //S6Context.time("evaluateCell");
    var res = "";
    var sheetCell = sheet.getRange(cell);
    var sheetFormula = sheetCell.getFormula();
    ////S6Context.log("cell[" + cell + "] formula[" + sheetFormula + "]");
    // Check that this is a value in the cell.
    if (sheetFormula != "") {
      //S6Context.info("Found formula :" + sheetFormula);
      // This is real hack to get the cell in the formula to update
      //sheetCell.setFormula('="REPLACE"');
      //sheetCell.getValue();
      sheetCell.setFormula("");
      sheetCell.setFormula(sheetFormula);
      res = S6Utility.trim(sheetCell.getValue());
    }
    else {
      res = S6Utility.trim(sheetCell.getValue());
    }
    S6Context.timeEnd("evaluateCell");
    return res;
  }

  /**
 * Helper method to get the URL for its Folder give an ID.
 */
  static getFolderURLForID(driveID) {
    var res;
    var folder = S6DriveApp.getFolderById(driveID);
    res = folder.getUrl();
    return res;
  }


  // }
  /**
   * Creates a list (as a Map) of instructions to create folders and files 
   * @param {string} url - spreadsheet that defines what is to be created
   * @param {array} newValues - an array of UI inputs in the format {field,value}
   * @return {Map} - A map keyed on each full folder name (eg a/b/c/d), with a value of an array of any docs to be created in the format {fileName,url}, where the URL is the google doc (do, sheet, slide, form) template file.
   */
  static mapCreateInstructions(entity, newValues) {
    var foldersAndDocs = entity.clonedUpdateFolders(newValues);
    var res = new Map();
    for (var i = 0; i < foldersAndDocs.length; i++) {
      var foldersSplit = foldersAndDocs[i].folder.split(FOLDER_SEPERATOR);
      var nextFolder = "";
      for (var y = 0; y < foldersSplit.length; y++) {
        if (foldersSplit[y].trim != "") {
          nextFolder = nextFolder + foldersSplit[y];
          //extFolder = nextFolder.replace(FOLDER_SEPERATOR," > ");
          var docs = [];
          res.set(nextFolder, docs);
          nextFolder = nextFolder + FOLDER_SEPERATOR; //" > ";
        }
      }
      var folder = foldersAndDocs[i].folder;//.replace(FOLDER_SEPERATOR," > ");
      res.set(folder, foldersAndDocs[i].docs);
    }
    return res;
  }


  /**
   * @return {String} - Today's date as dd-month-yyyy (full month name).
   */
  static getToday() {
    let res = ""
    const today = new Date();  // 2009-11-10
    const month = today.toLocaleString('default', { month: 'long' });
    const mm = today.toLocaleString('default', { month: 'numeric' }).padStart(2, 0);
    const dd = String(today.getDate()).padStart(2, 0);
    const yyyy = today.getFullYear();

    res = `${yyyy}-${mm}-${dd}`;
    return res;
  }

  static getLogoForDomain(domain) {
    var res = "";
    domain = S6Utility.trim(domain);
    var clearbitURL = `https://logo.clearbit.com/${domain}`;
    try {
      res = UrlFetchApp.fetch(clearbitURL);
    }
    catch (err) {
      //S6Context.log(clearbitURL);
      //S6Context.log(err);
    }
    return res;
  }

  static getUsersDisplayName() {
    var res;

    var aboutData = Drive.About.get();
    //S6Context.log(aboutData);
    res = aboutData["user"]["displayName"];

    return res;
  }

  static getFolderFromDirectory(folder, dir) {
    S6Validate.mandatory("folder", folder).mandatory("dir", dir);
    var res = folder;
    var split = dir.split(FOLDER_SEPERATOR);
    for (let i = 0; i < split.length; i++) {
      var nextFolderName = split[i];
      if (nextFolderName != "") {
        var it = res.getFoldersByName(nextFolderName);
        while (it.hasNext()) {
          res = it.next();
          break;
        }
      }
    }
    return res;
  }
  static hasEditAccessFromFolder(folder) {
    S6Validate.mandatory("folder", folder);
    return S6Utility.hasEditAccess(folder.getId());
  }
  /**
   * Access is describe by this https://developers.google.com/drive/api/guides/ref-roles
   */
  static hasEditAccess(folderId) {
    S6Validate.mandatory("folderId", folderId);
    S6Context.time("hasEditAccess:" + folderId);
    var res = YES; // assuming yes, as failure to read permission tends to happne when you do have permission. And if you don;t then no harm is done as sayimg yes here does not grant permission 
    try {
      var data = Drive.Files.get(folderId, { supportsAllDrives: true });

      //S6Context.log(data.userPermission.role);
      if (data && data.hasOwnProperty("userPermission") && data.userPermission.hasOwnProperty("role")) {
        switch (data.userPermission.role) {
          case "organizer":
          case "owner":
          case "fileOrganizer":
          case "writer":
            res = YES;
            break;
          case "commenter":
          case "reader":
            res = NO;
            break;
          default:
            res = NO;
            S6Context.error("Unknwon permission role:", data.userPermission.role);
        }
      }
    }
    catch (err) {
      S6Context.error(err);
    }
    S6Context.timeEnd("hasEditAccess:" + folderId);
    return res;
  }
  /**
   * This method fails due to a bug described here https://issuetracker.google.com/issues/36761869#comment2
   */
  static hasEditAccessWAITING_FOR_BUG_FIX(folder) {
    var res = NO;
    var email = Session.getActiveUser().getEmail();

    var access = folder.getAccess(email);
    if (access == DriveApp.Permission.FILE_ORGANIZER) {
      res = YES;
      //S6Context.log("DriveApp.Permission.FILE_ORGANIZER");
    }
    else if (access == DriveApp.Permission.ORGANIZER) {
      res = YES;
      //S6Context.log("DriveApp.Permission.ORGANIZER");
    }
    else if (access == DriveApp.Permission.COMMENT) {
      //S6Context.log("DriveApp.Permission.COMMENT");
    }
    else if (access == DriveApp.Permission.EDIT) {
      res = YES;
      //S6Context.log("DriveApp.Permission.COMMENT");
    }
    else if (access == DriveApp.Permission.NONE) {
      //S6Context.log("DriveApp.Permission.NONE");
    }
    else if (access == DriveApp.Permission.OWNER) {
      res = YES;
      //S6Context.log("DriveApp.Permission.OWNER");
    }
    else if (access == DriveApp.Permission.VIEW) {
      //S6Context.log("DriveApp.Permission.VIEW");
    }
    return res;
  }

  static xmlStringToJson(stringXml) {
    var xmlDoc = XmlService.parse(stringXml);
    return S6Utility.xmlDcoumentToJson(xmlDoc);
  }

  static xmlDcoumentToJson(xmlDocument) {
    const element = xmlDocument.getRootElement();
    return S6Utility.xmlElementToJson(element)
  }
  static xmlElementToJson(element) {
    var result = {};
    // Attributes.
    element.getAttributes().forEach(function (attribute) {
      result[attribute.getName()] = attribute.getValue();
    });
    // Child elements.
    element.getChildren().forEach(function (child) {
      var key = child.getName();
      var value = S6Utility.xmlElementToJson(child);
      if (result[key]) {
        if (!(result[key] instanceof Array)) {
          result[key] = [result[key]];
        }
        result[key].push(value);
      } else {
        result[key] = value;
      }
    });
    // Text content.
    if (element.getText()) {
      result['Text'] = element.getText();
    }

    return result;
  }


}
