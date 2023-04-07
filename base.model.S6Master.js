MASTER = {
  HEADING: "heading",
  SUB_HEADING: "subHeading",
  ENTITIES: "entities",
  ROOT_FOLDERS: "rootFolders",
  INFO: "info",
  NAME_SPACE: "nameSpace",
  CONFIG_URL: "configUrl",
  DISPLAY_NAME: "displayName",
  CONFIG_ID: "configSheetId",
  ICON_URL: "iconUrl",
  ORGINAL_CONFIG_ID: "orginalConfigSheetId",
  SUB_HEADING_KEY: ">"
}
MASTER_OTHER = {
  PROPERTIES_TEMPLATE_URL: "PROPERTIES_TEMPLATE_URL"
}
const INFO = {
  INFO_SHEETNAME: "INFO",
  INFO_NAME: "name",
  INFO_TYPE: "type",
  INFO_TITLE: "title",
  INFO_TEXT: "text",
  INFO_TYPES: {
    HELP: "HELP",
    TIP: "TIP",
    INFO: "INFO",
    WARN: "WARN"
  }
}

class S6Master {

  constructor(json, info, rootFolders, secret) {
    if (secret != "#PRIVATE") {
      throw "Use the factory functions starting with new...(). Do not construct your own S6Master";
    }
    this.configs = json;
    this.info = info;
    this._rootFolders = rootFolders;
    Object.freeze(this.configs);
    Object.freeze(this.info);
    Object.freeze(this);
  }

  getEntityForNameSpace(nameSpace) {
    var res;
    loop:
    for (var h = 0; h < this.configs.length; h++) {
      for (let i = 0; i < this.configs[h][MASTER.ENTITIES].length; i++) {
        if (this.configs[h][MASTER.ENTITIES][i][MASTER.NAME_SPACE] == nameSpace) {
          res = this.configs[h][MASTER.ENTITIES][i];
          break loop;
        }
      }
    }
    return res;
  }
  getIconForNameSpace(nameSpace) {
    var res = EMPTY;
    var e = this.getEntityForNameSpace(nameSpace);
    if (e) {
      res = e[MASTER.ICON_URL];
    }
    return res;
  }
  getSpreadsheetForNameSpace(nameSpace) {
    var res;
    var id;
    loop:
    for (var h = 0; h < this.configs.length; h++) {
      for (let i = 0; i < this.configs[h][MASTER.ENTITIES].length; i++) {
        if (this.configs[h][MASTER.ENTITIES][i][MASTER.NAME_SPACE] == nameSpace) {
          id = this.configs[h][MASTER.ENTITIES][i][MASTER.CONFIG_ID];
          break loop;
        }
      }
    }
    if (id) {
      res = SpreadsheetApp.openById(id);
    }
    return res;
  }
  getEntityForAnyConfigId(configId) {
    var res = this.getEntityForCurrentConfigId(configId);
    if (!res) {
      res = this.getEntityForOrginalConfigId(configId);
    }
    return res;
  }

  getEntityForOrginalConfigId(orginalConfigId) {
    var res;
    loop:
    for (var h = 0; h < this.configs.length; h++) {
      for (let i = 0; i < this.configs[h][MASTER.ENTITIES].length; i++) {
        if (this.configs[h][MASTER.ENTITIES][i][MASTER.ORGINAL_CONFIG_ID] == orginalConfigId) {
          res = this.configs[h][MASTER.ENTITIES][i];
          break loop;
        }
      }
    }
    return res;
  }
  getNameSpaceForFolderId(folderId) {
    var res;
    var x = this._lazyLoadRootFolders();
    if (x) {
      res = x.nameSpace;
    }
    return res;
  }
  _lazyLoadRootFolders() {
    if (!this._rootFolders) {
      S6Context.time("_lazyLoadRootFolders");
      for (let index = 0; index < this.configs.length; index++) {
        const element = this.configs[index];
        S6Context.time("S6Master Find root folder for:" + element[MASTER.NAME_SPACE]);
        var id = S6Master._getRootFolderId(element[MASTER.CONFIG_ID]);
        S6Context.timeEnd("S6Master Find root folder for:" + element[MASTER.NAME_SPACE]);
        this._rootFolders[id] = { nameSpace: element[MASTER.NAME_SPACE] };
      }
      S6Context.timeEnd("_lazyLoadRootFolders");
      Object.freeze(this._rootFolders);
    }
    return this._rootFolders;
  }
  getNameSpaceForConfigID(orginalConfigId) {
    var res = EMPTY;
    var ns = this.getEntityForOrginalConfigId(orginalConfigId);
    if (ns) {
      res = ns[ENTITY.NAME_SPACE]
    }
    return res;
  }
  getEntityForCurrentConfigId(currentConfigId) {
    var res;
    loop:
    for (var h = 0; h < this.configs.length; h++) {
      for (let i = 0; i < this.configs[h][MASTER.ENTITIES].length; i++) {
        if (this.configs[h][MASTER.ENTITIES][i][MASTER.CONFIG_ID] == currentConfigId) {
          res = this.configs[h][MASTER.ENTITIES][i];
          break loop;
        }
      }
    }
    return res;
  }


  static newMaster(masterUrl = EMPTY, cache = true) {
    var timerName = "S6Master::newMaster:" + masterUrl;
    S6Context.time(timerName);
    var res;
    var json;
    if (masterUrl == EMPTY) {
      masterUrl = PropertiesService.getUserProperties().getProperty(USER_PROPERTY_MASTER_URL);
    }
    let masterId = S6Utility.getIdFromUrl(masterUrl);
    if (cache) {
      json = S6Cache.userCacheGetJson(S6Master._cacheName(masterId));
    }
    if (!json) {
      json = { entities: [], info: [], rootFolders: [] };
      var list = S6Master._listEntities(masterId);
      json[MASTER.ENTITIES] = list.entities;
      json[MASTER.ROOT_FOLDERS] = list.root;
      json[MASTER.INFO] = S6Master._listInfo(masterId);
      S6Context.trace(json);
      S6Cache.userCachePutJson(S6Master._cacheName(masterId), json);
    }
    if (json) {
      res = new S6Master(json[MASTER.ENTITIES], json[MASTER.INFO], json[MASTER.ROOT_FOLDERS], "#PRIVATE");
    }
    S6Context.timeEnd(timerName);
    return res;
  }
  static _cacheName(masterId) {
    return "Master:" + masterId;
  }

  static _listInfo(masterId = EMPTY) {
    let res = [];
    try {
      var masterSpreadsheet = SpreadsheetApp.openById(masterId);
      S6Context.info("Opened Master Spreadsheet:", masterId);
      var masterSheet = masterSpreadsheet.getSheetByName(INFO.INFO_SHEETNAME);
      var range = masterSheet.getRange("A:D");
      var values = range.getValues();
      // start at row 1 to skip header
      var x = 0;
      for (var i = 1; i < values.length; i++) {
        let name = S6Utility.trim(values[i][0]);
        if (name != EMPTY) {
          let type = S6Utility.trim(values[i][1]);
          let title = S6Utility.trim(values[i][2]);
          let text = S6Utility.trim(values[i][3]);
          res[x++] = { [INFO.INFO_NAME]: name, [INFO.INFO_TYPE]: type, [INFO.INFO_TITLE]: title, [INFO.INFO_TEXT]: text };
        }
      }
    }
    catch (e) {
      S6Context.error(e, e.stack);
    }
    return res;
  }

  static _listOther(masterId = EMPTY) {
    var res = {};
    try {
      var masterSpreadsheet = SpreadsheetApp.openById(masterId);
      S6Context.info("Opened Master Spreadsheet:", masterId);

      var masterSheet = masterSpreadsheet.getSheetByName("Other");
      var range = masterSheet.getRange("A:B");
      var values = range.getValues();
      // start at row 1 to skip header
      var x = 0;
      for (var i = 1; i < values.length; i++) {
        let attribute = S6Utility.trim(values[i][0]);
        if (attribute != EMPTY) {
          let value = S6Utility.trim(values[i][1]);
          res[attribute] = value;
        }
      }
    }
    catch (err) {
      S6Context.warn(err.stack);
      S6Context.warn("Spreadsheet Not found. It's assumed the user does not have access to it. Error:\n" + err + "\nURL:" + configUrl);
    }
    return res;
  }


  static _listEntities(masterId = EMPTY) {
    var res = {
      entities: [],
      root: {}
    };
    var tempRes = [];
    try {
      var masterSpreadsheet = SpreadsheetApp.openById(masterId);
      S6Context.info("Opened Master Spreadsheet:", masterId);

      var masterSheet = masterSpreadsheet.getSheetByName("Master");
      var range = masterSheet.getRange("A:E");
      var values = range.getValues();
      // start at row 1 to skip header
      let itemCount = 0;
      let headerCount = 0;
      for (var i = 1; i < values.length; i++) {
        let displayName = S6Utility.trim(values[i][0]);
        let nameSpace = S6Utility.trim(values[i][1]);
        let iconUrl = S6Utility.trim(values[i][3]);

        if (displayName != EMPTY) {
          if (nameSpace != EMPTY && i == 1) {
            tempRes[headerCount++] = { [MASTER.HEADING]: "Entities to manage", [MASTER.SUB_HEADING]: NO, [MASTER.ICON_URL]: iconUrl, [MASTER.ENTITIES]: [] };
            itemCount = 0;
          }
          S6Context.debug("displayName:", displayName, ", nameSpace:", nameSpace);
          if (nameSpace == EMPTY) {
            tempRes[headerCount++] = { [MASTER.HEADING]: displayName, [MASTER.SUB_HEADING]: NO, [MASTER.ICON_URL]: iconUrl, [MASTER.ENTITIES]: [] };
            itemCount = 0;
          }
          else if (nameSpace == MASTER.SUB_HEADING_KEY) {
            tempRes[headerCount++] = { [MASTER.HEADING]: displayName, [MASTER.SUB_HEADING]: YES, [MASTER.ICON_URL]: iconUrl, [MASTER.ENTITIES]: [] };
            itemCount = 0;
          }
          else {
            let configUrl = S6Utility.trim(values[i][2]);
            let configId = S6Utility.getIdFromUrl(configUrl);

            let orginalConfigUrl = S6Utility.trim(values[i][4]);
            let orginalConfigId = orginalConfigUrl == EMPTY ? EMPTY : S6Utility.getIdFromUrl(orginalConfigUrl);
            try {
              S6Context.info("Looking for configuration spreadsheet for " + nameSpace, configUrl);
              // We need to use the Drive.files.get API to test the file is available to use according to our runtime permissions inherited from the user.
              // If we use the SpreadsheetApp.openByUrl(url) and it fails then AppSrcipt stops us from procceeding.
              // DriveFile.Get does not suffer this type of failue. 
              if (configId != EMPTY) {
                var file = Drive.Files.get(configId, { supportsAllDrives: true });
                S6Context.info("Found Config File Found for Id:", configId);
                S6Context.trace("Config File ", file);
                // The file is available to us so we can continue 
                if (file != null) {
                  S6Context.trace("Found Config File ", file);
                  // var config = SpreadsheetApp.openByUrl(url);
                  // if (config != null) {
                  tempRes[headerCount - 1][MASTER.ENTITIES][itemCount++] =
                  {
                    [MASTER.NAME_SPACE]: nameSpace,
                    [MASTER.CONFIG_ID]: configId,
                    [MASTER.CONFIG_URL]: configUrl,
                    [MASTER.DISPLAY_NAME]: displayName,
                    [MASTER.ICON_URL]: iconUrl,
                    [MASTER.ORGINAL_CONFIG_ID]: orginalConfigId
                  };
                }
                else {
                  S6Context.info("Found Config File NOT Found for Id:", configId);
                }
              }
            }
            catch (err) {
              S6Context.warn(err.stack);
              S6Context.warn("Spreadsheet Not found. It's assumed the user does not have access to it. Error:\n" + err + "\nURL:" + configUrl);
              continue;
            }
          }
        }
      }
      let r = 0;
      for (var a in tempRes) {
        if (tempRes[a][MASTER.ENTITIES].length > 0) {
          res.entities[r++] = tempRes[a];
        }
      }
    }
    catch (err) {
      throw new Error("Can not open Master Spreadsheet. That is going to be a problem!\n© spreadsheet with id:\n :" + masterId + "\n[" + err.stack + "]");
    }
    S6Context.debug(res);
    return res;
  }


  static _getRootFolderId(configId) {
    var res = EMPTY;
    try {
      var spreadsheet = SpreadsheetApp.openById(configId);
      var sheet = spreadsheet.getSheetByName("Root");
      var range = sheet.getRange("A:B");
      var values = range.getValues();
      // start at row 1 to skip header
      S6Context.debug("Search for root folder", values);
      for (var i = 1; i < values.length; i++) {
        S6Context.debug(values[i][0], values[i][1]);
        if (values[i][0] == ENTITY.ROOT_DIRECTORY_URL) {
          const url = values[i][1];
          res = S6Utility.getIdFromUrl(url);
          break;
        }
      }
    }
    catch (err) {
      S6Context.warn(err.stack);
      S6Context.warn("Problem finding root folder for:", configId);
    }
    return res;
  }
}
