const PROP_ACTION_INSERT_VALUE = "insert_value";
const PROP_ACTION_INSERT_TITLE_VALUE = "insert_title_value";
const PROP_ACTION_INSERT_TITLE_FIELD = "insert_title_field";
const PROP_ACTION_INSERT_FIELD = "insert_field";
const PROP_ACTION_REPLACE_TITLE_VALUE = "replace_title_value";
const PROP_ACTION_REPLACE_VALUE = "replace_value";

class PropertyApplyFactory {

  constructor(docAdapter) {
    this._docAdapter = docAdapter;
  }

  apply(title, value, filedname, type, color, carriageReturn) {
    throw "Implement method";
  }

  static actionType(event) {
    return S6Utility.trim(event.formInputs["InsertType"].toString());
  }

  static getEditableDocumentProperties(docId, id, nameSpace) {
    const docAdapter = S6DocumentAdapater.create(docId);
    const propInstance = S6PropertyService.newForApplyProperties(id, nameSpace);
    const properties = Object.assign({}, propInstance.properties);
    const presentDocProps = docAdapter.docProperties();
    const autoProperties = PropertyApplyFactory._findAutoPorps(presentDocProps[PROPERTIES.AUTOMATIC]);
    const selectorProperties = PropertyApplyFactory._findSelectorPorps(properties, presentDocProps[PROPERTIES.STANDARD]);

    return { properties, autoProperties, selectorProperties };
  }

  static _findSelectorPorps(properties, presentDocProps) {
    var res = [];
    console.warn(presentDocProps);

    // Looking for hiogh level propertyies eg, {c.a#deal.id} would be found as "deal". Each one of these suggests a selector.  
    let map = Object.values(presentDocProps).reduce((map, str) => {
      let match = str.field.match(/#(.*?)\./); // capture the value between '#' and '.'
      if (match && match[1]) {
        map[match[1]] = true; // add to map with value true
      }
      return map;
    }, {});

    console.log("_findSelectorPorps", properties, map);
    var max = Object.keys(properties).length;
    if (max > 0) {
      let i = 0;
      let keysToDelete = [];
      for (let item in properties) {
        const next = properties[item];
        if (next[PROPERTIES.ATTR.TYPE] == DATA_TYPE_SELECTOR) {
          console.log("_findSelectorPorps", next[PROPERTIES.ATTR.PROP_NAME]);
          var match = next[PROPERTIES.ATTR.PROP_NAME].match(/#(.*?)(\.|}|$)/);
          console.log("_findSelectorPorps", match);
          if (match && match.length > 0) {
            if (map[match[1]]) {
              console.log("_findSelectorPorps", match[1]);
              res[i++] = next;
              keysToDelete.push(item); // Add key to delete list instead of deleting now
            }
          }
        }
      }
      // Delete properties after loop
      for (let key of keysToDelete) {
        delete properties[key];
      }
    }
    console.log("_findSelectorPorps res", res);
    return res;
  }


  static _findAutoPorps(docProps) {
    var res = [];
    var max = Object.keys(docProps).length;
    if (max > 0) {
      let i = 0;
      for (let item in docProps) {
        var apply = APPLY.TEXT;
        var title = docProps[item].title;
        var field = docProps[item].field;
        var type = PROPERTIES.TYPES.TEXT;
        var hint = `{${title}} from this document`;
        var value = docProps[item].value;
        if (value) {
          console.log("docProps[item]).startsWith",value);
          if ((value).startsWith("https://")) {
            type = PROPERTIES.TYPES.LINK;
            apply = APPLY.LINK;
            hint = `URL for {${value}}`;
          }
          else if (S6Utility.containsWord(value, "date")) {
            type = PROPERTIES.TYPES.DATE_PRINTABLE;
          }
          else if (value.indexOf(",") > -1) {
            if (value.indexOf(":") > -1) {
              title = value.substring(0, value.indexOf(":"));
              type = `${PROPERTIES.TYPES.INPUT_LIST}[${value}]`
            }
            else {
              type = `${PROPERTIES.TYPES.INPUT_LIST}[${value.substring(value.indexOf(":") + 1)}]`;
            }
          }
          var propText = S6PropertyServiceBuilder.propertyFactory(field, type, title, hint, YES, NO, PROPERTIES.AUTOMATIC, EMPTY, EMPTY, YES, EMPTY, apply);
          res[i++] = propText;
        }
      }
    }
    return res;
  }

  static replaceFrom(docId, props, color = null) {
    var docAdapter = S6DocumentAdapater.create(docId);
    var factory = PropertyApplyFactory.create(PROP_ACTION_REPLACE_VALUE, docAdapter);
    for (let i = 0; i < props.length; i++) {
      if (props[i][PROPERTIES.ATTR.VALUE] != EMPTY || props[i][PROPERTIES.ATTR.EMPTY_MEANS_EMPTY] == YES) {
        factory.apply(props[i][PROPERTIES.ATTR.TITLE], props[i][PROPERTIES.ATTR.VALUE], props[i][PROPERTIES.ATTR.PROP_NAME], props[i][PROPERTIES.ATTR.APPLY], color, false);
      }
    }



  }
  static createFromEvent(event, docAdapter) {
    var type = PropertyApplyFactory.actionType(event); // S6Utility.trim(event.formInputs["InsertType"].toString());
    return PropertyApplyFactory.create(type, docAdapter);
  }

  static create(type, docAdapter) {
    var res;
    console.log("PropertyApplyFactory(", type, ")");

    switch (type) {
      case PROP_ACTION_INSERT_VALUE:
        res = new PropertyAppFactory_INSERT_VALUE(docAdapter);
        break;
      case PROP_ACTION_INSERT_TITLE_VALUE:
        res = new PropertyAppFactory_INSERT_TITLE_VALUE(docAdapter);
        break;
      case PROP_ACTION_INSERT_FIELD:
        res = new PropertyAppFactory_INSERT_FIELD(docAdapter);
        break;
      case PROP_ACTION_INSERT_TITLE_FIELD:
        res = new PropertyAppFactory_INSERT_TITLE_FIELD(docAdapter);
        break;
      case PROP_ACTION_REPLACE_VALUE:
        res = new PropertyAppFactory_REPLACE_VALUE(docAdapter);
        break;
      case PROP_ACTION_REPLACE_TITLE_VALUE:
        res = new PropertyAppFactory_REPLACE_TITLE_VALUE(docAdapter);
        break;
      default:
        res = S6UIService.createNotification("Unknwon action type:" + type);
        break;
    }
    console.log("PropertyApplyFactory(", res, ")");
    return res;

  }
}
class PropertyAppFactory_INSERT_VALUE extends PropertyApplyFactory {
  apply(title, value, filedname, type, color, carriageReturn = false) {
    var res;
    value = value + EMPTY;
    const LF = carriageReturn ? "\n" : EMPTY;
    switch (type) {
      case (APPLY.IMAGE):
        let mimeType = EMPTY;
        try {
          var file = DriveApp.getFileById(S6Utility.getIdFromUrl(value));
          var image = file.getBlob();
          mimeType = DOC_MIMETYPE_NAME[file.getMimeType()];
          // var fetch = UrlFetchApp.fetch(value);
          // var image = fetch.getBlob();
          S6Context.debug("PropertyAppFactory_INSERT_VALUE::image");
          if (carriageReturn) {
            this._docAdapter.insert(`\n`);
          }
          res = this._docAdapter.insertImage(image);
        }
        catch (err) {
          S6Context.error(mimeType, value);
          S6Context.error(err.stack);
          S6Context.error(err);

          res = this._docAdapter.insert(`#ERROR inserting ${title} image. ${err}${LF}. File is a ${mimeType}. Warning, .webp file types will fail.`);
        }
        break;
      case (APPLY.TEXT):

        res = this._docAdapter.insert(`${value}${LF}`);
        break;
      case (APPLY.LINK):
        var split = value.split("|");
        var newValue = split[0];
        var link = split[1];
        S6Context.debug("apply link:", filedname, newValue, link);
        res = this._docAdapter.insert(`${newValue}${LF}`, null, link);
        break;
    }
    return res;
  }
}
class PropertyAppFactory_INSERT_TITLE_VALUE extends PropertyApplyFactory {
  apply(title, value, filedname, type, color, carriageReturn = false, link = EMPTY) {
    var res;
    value = value + EMPTY;
    const LF = carriageReturn ? "\n" : EMPTY;
    switch (type) {
      case (APPLY.IMAGE):
        var file = DriveApp.getFileById(S6Utility.getIdFromUrl(value));
        var image = file.getBlob();

        if (carriageReturn) {
          this._docAdapter.insert(`\n`);
        }
        res = this._docAdapter.insertImage(image);
        this._docAdapter.insert(`${title}: `);
        break;
      case (APPLY.TEXT):

        res = this._docAdapter.insert(`${title}: ${value}${LF}`);
        break;
      case (APPLY.LINK):
        var split = value.split("|");
        var newValue = split[0];
        var link = split[1];
        S6Context.debug("apply link:", filedname, newValue, link);
        if (carriageReturn) {
          this._docAdapter.insert(`\n`);
        }
        res = this._docAdapter.insert(`${newValue}`, null, link);
        this._docAdapter.insert(`${title}: `);
        break;
    }
    return res;
  }
}
class PropertyAppFactory_INSERT_FIELD extends PropertyApplyFactory {
  apply(title, value, filedname, type, color, carriageReturn = false, link = EMPTY) {
    const LF = carriageReturn ? "\n" : EMPTY;
    return this._docAdapter.insert(`${filedname}${LF}`, color);
  }
}
class PropertyAppFactory_INSERT_TITLE_FIELD extends PropertyApplyFactory {
  apply(title, value, filedname, type, color, carriageReturn = false, link = EMPTY) {
    if (carriageReturn) {
      this._docAdapter.insert(`\n`);
    }
    this._docAdapter.insert(`${filedname}`, color);
    this._docAdapter.insert(`${title}: `);
  }
}
class PropertyAppFactory_REPLACE_VALUE extends PropertyApplyFactory {
  apply(title, value, filedname, type, color, carriageReturn = false, link = EMPTY) {
    var res;
    value = value + EMPTY;
    switch (type) {
      case (APPLY.IMAGE):
        var file = DriveApp.getFileById(S6Utility.getIdFromUrl(value));
        var image = file.getBlob();
        res = this._docAdapter.replaceImage(filedname, image);
        break;
      case (APPLY.TEXT):
        res = this._docAdapter.replace(filedname, value, EMPTY, color);
        break;
      case (APPLY.LINK):
        var split = value.split("|");
        var newValue = split[0];
        var link = split[1];
        res = this._docAdapter.replace(filedname, newValue, link, color);
        break;
    }
    return res;
  }
}
class PropertyAppFactory_REPLACE_TITLE_VALUE extends PropertyApplyFactory {
  apply(title, value, filedname, type = APPLY.TEXT, color, carriageReturn = false, link = EMPTY) {
    var res;
    value = value + EMPTY;
    switch (type) {
      case (APPLY.IMAGE):
        var file = DriveApp.getFileById(S6Utility.getIdFromUrl(value));
        var image = file.getBlob();
        res = this._docAdapter.replaceImage(filedname, image);
        break;
      case (APPLY.TEXT):
        res = this._docAdapter.replace(filedname, `${title}: ${value}`, link, color);
        break;
      case (APPLY.LINK):
        var split = value.split("|");
        var newValue = split[0];
        link = split[1];
        S6Context.debug("apply link:", filedname, newValue, link);
        res = this._docAdapter.replace(filedname, `${title}: ${newValue}`, link, color);
        break;
    }
    return res;
  }
}
