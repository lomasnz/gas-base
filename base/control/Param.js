const DATE_FORMAT =
{
  SORTABLE: "yyyy-MM-dd",
  PRINTABLE: "d MMMMM yyyy"
};
const PARAM = {
  BOILERPLATE_ID: "boilerplateId",
  EVENT_NAME: "eventName",
  NAME_SPACE: "nameSpace",
  DOCUMENT_ID: "documentId",
  ENTITY_INSTANCE_ID: "entityInstanceId",
  ENTITY_CONFIG_ID: "entityConfigId",
  TEMPLATE_ID: "TEMPLATE_ID",
  TEMPLATE: "TEMPLATE",
  TEMPLATE_FILE: "template.file",
  FIELDS: "fields", // This shoild point to this constant:ENTITY.FIELDS. But it suffers from not yet been loaded ,
  CREATE_TYPE: "CREATE_TYPE",
  VIEW_TYPE: "VIEW_TYPE",
  TASK_TYPE: "TASK_TYPE",
  ACTIVE_DOCUMENT_ID: "active.document.id",
  TASK: "TASK",
  URL: "url",
  EDIT_TYPE: "EDIT_TYPE",
  IS_FOLDER: "IS_FOLDER",
  FILE_ID: "FILE_ID",
  HostApps: {
    GmailApp: "GMAIL",
    "GMAIL": "Gmail",
    CalendarApp: "CALENDAR",
    "CALENDAR": "Calendar",
    DriveApp: "DRIVE",
    "DRIVE": "Drive",
    DocsApp: "DOCS",
    "DOCS": "Docs",
    SheetsApp: "SHEETS",
    "SHEETS": "Sheets",
    SlidesApp: "SLIDES",
    "SLIDES": "Slides"
  },
  PROPERTY: "property",
  PROPERTIES: "properties",
  PROPERTIES_INDEX: "properties.index"
};


/**
 * This class is specifically designed to pass parameters to functions triggered by Actions as a result of an event.
 * Actions have two rlatvent attributes. The function. name and the parameters.
 * Paramters must be josn key value pairs. 
 * Complex JSON is not allowed and an obscure error is raised if you pass complex (eg ioncludes arrys) JSON. 
 * 
 * This class helps stire complex JSON by converting it into name value pairs.
 * 
 * 
 *   
 */
class Param {

  /**
   * @param {JSON} event - will be used to popoulate the paramters 
   */
  constructor(event) {
    this._actions = {};
    S6Context.info("Event[", event, "]");
    this._parameters = new Map();
    if (event != null) {
      this.event = event;
      var p = event.parameters;
      if (p) {
        S6Context.debug("Event paramters[", JSON.stringify(p), "]");
        for (let [key, value] of Object.entries(p)) {
          S6Context.debug(`Loading parameter [${key}: ${value}]`);
          this._parameters.set(key, value)
        }
      }
      if (this._parameters.get(PARAM.FIELDS) != null) {
        var fields = this.getJSON(PARAM.FIELDS);
        var newFields = this._addEventValuesToFields(event, fields);
        this.replaceJSON(PARAM.FIELDS, newFields);
      }
      if (this._parameters.get(PARAM.TEMPLATE) != null) {
        var template = this.getJSON(PARAM.TEMPLATE);
        var fields = this._addEventValuesToFields(event, template[ENTITY.TEMPLATE_ATTR.FIELDS]);
        template[ENTITY.TEMPLATE_ATTR.FIELDS] = fields;
        this.replaceJSON(PARAM.TEMPLATE, template);
      }
    }
  }

  recordaction(actionFn, paramName = EMPTY, valueOrType = EMPTY) {
    if (this._actions[actionFn.name]) {
      if (this._actions[actionFn.name][paramName]) {
        this._actions[actionFn.name] = { [paramName]: { count: this._actions[actionFn.name][paramName].count + 1, value: this._actions[actionFn.name][paramName].value + "," + valueOrType } };
      }
      else {
        this._actions[actionFn.name] = { [paramName]: { count: 1, value: valueOrType } };
      }
    }
    else {
      this._actions[actionFn.name] = { [paramName]: { count: 1, value: valueOrType } };
    }
  }
  get actions() {
    return this._actions;
  }

  getHostApp() {
    return this.event.commonEventObject.hostApp.toUpperCase();
  }
  getHostAppName() {
    return PARAM.HostApps[this.getHostApp()];
  }
  /**
   * Method checks if the field has a component included in the event nd can be updated
   */
  _isWorthy(event, field) {
    var res = true;
    if (!(event.formInputs.hasOwnProperty(field.field) && event.formInputs[field.field].length > 0)) {
      S6Context.trace("Field is not worthy", field.field, event.formInputs[field.field]);
      if (!(event.formInputs.hasOwnProperty(field.fieldSource) && event.formInputs[field.fieldSource].length > 0)) {
        res = false;
        S6Context.trace("FieldSource is not worthy", field.fieldSource, event.formInputs[field.fieldSource]);
      }
    }
    return res;
  }
  _addEventValuesToFields(event, fields) {
    S6Context.time("addEventValuesToFields");
    console.log("addEventValuesToFields fields", fields);
    var res = fields;
    if (event.hasOwnProperty("formInputs") && Object.keys(event.formInputs).length !== 0) {
      for (var i = 0; i < fields.length; i++) {
        S6Context.debugFn(this._addEventValuesToFields, fields[i]);
        //if (event.formInputs.hasOwnProperty(fields[i].field) && event.formInputs[fields[i].field].length > 0) {
        let newValue = EMPTY;
        let useNewValue = false;
        if (!this._isWorthy(event, fields[i])) {
          let typeOnly = S6UIService.canonicalType(fields[i].type);
          switch (typeOnly) {
            // switches that are off are not included in the event
            case DATA_TYPE_SWITCH:
              useNewValue = true;
              S6Context.debugFn(this._addEventValuesToFields, "Unworthy switch field updated", fields[i].field);
              newValue = NO;
              break;
          }
        }
        else {
          let typeOnly = S6UIService.canonicalType(fields[i].type);
          useNewValue = true;
          console.log("_addEventValuesToFields", typeOnly);
          switch (typeOnly) {
            //  case DATA_TYPE_SELECTOR:
            //   var selected = (event.formInputs[fields[i].field][0]).trim();
            //   newValue = fields[i][PROPERTIES.ATTR.SELECTOR_MAP][selected];
            //   break;
            case DATA_TYPE_SELECTOR:
            case DATA_TYPE_SELECTED:
              var fieldSource = fields[i].fieldSource;
              newValue = S6UIService.getSeletecedHelper(fields[i], event.formInputs[fieldSource][0]);
              break;
            case DATA_TYPE_DOMAIN:
              newValue = event.formInputs[fields[i].field][0];
              newValue = newValue.toLowerCase();
              break;
            case DATA_TYPE_ALLFOLDERS:
              newValue = event.formInputs[fields[i].field][0];
              newValue = newValue.replace(TEXT_ID_SUBFOLDER, "");
              newValue = newValue.replace(TEXT_ID_FOLDER, "");
              newValue = S6Utility.replaceFieldInText(fields, newValue)
              break;
            case DATA_TYPE_PRIPIDRIVE_DEALS:
              newValue = (event.formInputs[fields[i].field][0]).trim();
              ////console.log("DATA_TYPE_PRIPIDRIVE_DEALS",newValue);
              if (newValue.startsWith(TEXT_ID_SUBFOLDER)) {
                newValue = newValue.replace(TEXT_ID_SUBFOLDER, "").trim();
              }
              else if (newValue.startsWith(TEXT_ID_FOLDER)) {
                newValue = newValue.replace(TEXT_ID_FOLDER, "").trim()
              }
              else {
                newValue = newValue.replace(TEXT_ID_SUBFOLDER, "").replace(TEXT_ID_FOLDER, "").trim();
              }
              break;
            case DATA_TYPE_HARVEST_PROJECTS:
            case DATA_TYPE_SUBFOLDER:
            case DATA_TYPE_SUBFOLDERS:
              newValue = (event.formInputs[fields[i].field][0]).trim();
              if (newValue.startsWith(TEXT_ID_SUBFOLDER)) {
                newValue = newValue.replace(TEXT_ID_SUBFOLDER, "").trim();
                newValue = S6UIService.typeParameters(fields[i].type)[0] + FOLDER_SEPERATOR + newValue;
                newValue = S6Utility.replaceFieldInText(fields, newValue);
              }
              else if (newValue.startsWith(TEXT_ID_FOLDER)) {
                newValue = newValue.replace(TEXT_ID_FOLDER, "").trim()
              }
              else {
                newValue = newValue.replace(TEXT_ID_SUBFOLDER, "").replace(TEXT_ID_FOLDER, "").trim();
              }
              break;
            case DATA_TYPE_BHR_STAFF:
            case DATA_TYPE_TEXT:
            case DATA_TYPE_INPUT_LIST:
            case DATA_TYPE_PARAGRAH:
            case DATA_TYPE_CHOOSE:
            case DATA_TYPE_PAIRED_LIST:
            case DATA_TYPE_LINK:
            case DATA_TYPE_SWITCH:
            case DATA_TYPE_NUMBER:
              newValue = event.formInputs[fields[i].field][0];
              newValue = newValue.replace(TEXT_ID_SUBFOLDER, "").replace(TEXT_ID_FOLDER, "").trim();
              break;
            case DATA_TYPE_DATE:
            case DATA_TYPE_DATE_PRINTABLE:
              newValue = event.formInputs[fields[i].field][0].msSinceEpoch;
              var format = typeOnly == DATA_TYPE_DATE ? DATE_FORMAT.SORTABLE : DATE_FORMAT.PRINTABLE;
              if (newValue && newValue > 0) {
                var date = new Date(newValue + 0);
                var locale = PropertiesService.getUserProperties().getProperty(USER_PROPERTY_LOCALE);
                newValue = Utilities.formatDate(date, locale, format);
              }
              else {
                // //console.log("newDate",DATA_TYPE_DATE,newValue);
                newValue = event.formInputs[fields[i].field][0];
              }
              break;
          }
        }
        if (useNewValue) {
          S6Context.debug("NewValue[", newValue, "]");
          if (S6Utility.trim(newValue) != EMPTY) {
            fields[i].value = newValue;
            S6Context.debug("addEventValuesToFields/feilds:", fields[i].field, "/new value[" + fields[i].value, "]/type[", fields[i].type, "]");
          }
          else {
            S6Context.debug("addEventValuesToFields/feilds:", fields[i].field, "/old value[" + fields[i].value, "]/type[", fields[i].type, "]");
          }
        }
      }
    }
    S6Context.timeEnd("addEventValuesToFields");
    return res;
  }

  get parameters() {
    return this._parameters;
  }
  set parameters(param) {
    this._parameters = param;
  }

  getTimeZone() {
    return this.event.commonEventObject.timeZone.id;
  }

  /**  document **/
  setDocumentId(id) {
    this.recordaction(this.setDocumentId, "id", id);
    return this.replaceValue(PARAM.DOCUMENT_ID, id);
  }
  addDocumentId(id) {
    this.recordaction(this.addDocumentId, "id", id);
    return this.add(PARAM.DOCUMENT_ID, id);
  }
  getDocumentId(index = 0) {
    this.recordaction(this.getDocumentId, "index", index);
    var res = this._parameters.get(PARAM.DOCUMENT_ID + "_" + index);
    if (res == null || res == undefined) {
      S6Context.warn("No " + PARAM.DOCUMENT_ID + " for index:", index);
    }
    this.recordaction(this.getDocumentId, index, res);
    return res;
  }
  /**  document **/
  setNameSpace(nameSpace) {
    this.recordaction(this.setNameSpace, "nameSpace", nameSpace);
    return this.replaceValue(PARAM.NAME_SPACE, nameSpace);
  }
  addNameSpace(id) {
    this.recordaction(this.addNameSpace, "id", id);
    //console.log("addNameSpace:", nameSpace);
    return this.add(PARAM.NAME_SPACE, nameSpace);
  }
  getNameSpace(index = 0) {
    this.recordaction(this.getNameSpace, "index", 0);
    var res = this._parameters.get(PARAM.NAME_SPACE + "_" + index);
    if (res == null || res == undefined) {
      S6Context.warn("No " + PARAM.NAME_SPACE + " for index:", index);
    }
    this.recordaction(this.getNameSpace, index, res);
    return res;
  }
  /**  entity **/
  setEntityConfigId(id) {
    this.recordaction(this.setEntityConfigId, "id", id);
    return this.replaceValue(PARAM.ENTITY_CONFIG_ID, id);
  }
  addEntityConfigId(id) {
    this.recordaction(this.addEntityConfigId, "id", id);
    //console.log("addEntityConfigId:", id);
    return this.add(PARAM.ENTITY_CONFIG_ID, id);
  }
  getEntityConfigId(index = 0) {
    this.recordaction(this.addEntityConfigId, "index", index);
    var res = this._parameters.get(PARAM.ENTITY_CONFIG_ID + "_" + index);
    if (res == null || res == undefined) {
      S6Context.warn("No " + PARAM.ENTITY_CONFIG_ID + " for index:", index);
    }
    this.recordaction(this.addEntityConfigId, index, res);
    return res;
  }
  /**  entity **/
  setEntityInstanceId(id) {
    this.recordaction(this.setEntityInstanceId, "id", id);
    S6Validate.mandatoryType("id", id, DataType.DriveID);
    return this.replaceValue(PARAM.ENTITY_INSTANCE_ID, id);
  }
  addEntityInstanceId(id) {
    this.recordaction(this.addEntityInstanceId, "id", id);
    //console.log("addEntityInstanceId:", id);
    return this.add(PARAM.ENTITY_INSTANCE_ID, id);
  }
  getEntityInstanceId(index = 0) {
    this.recordaction(this.addEntityInstanceId, "index", index);
    var res = this._parameters.get(PARAM.ENTITY_INSTANCE_ID + "_" + index);
    if (res == null || res == undefined) {
      S6Context.warn("No " + PARAM.ENTITY_INSTANCE_ID + " for index:", index);
    }
    this.recordaction(this.addEntityInstanceId, index, res);
    return res;
  }

  /** 
  * @return {Array} entities - [{entityId : <id>},{etc}] 
  */
  getEntityConfigIds() {
    this.recordaction(this.getEntityConfigIds, "EntityConfigIds");
    var res = [];

    var length = this.countOf(PARAM.ENTITY_CONFIG_ID);
    let count = "";
    for (var i = 0; i < length; i++) {
      count = i + "";
      let hidden_key = `${PARAM.ENTITY_CONFIG_ID}_${count}`;
      let value = this._parameters.get(hidden_key);
      res[i] = { [PARAM.ENTITY_CONFIG_ID]: value };
    }
    this.recordaction(this.getEntityConfigIds, "", res);
    return res;
  }

  /**
  * Add's an entity id value (AKA folder of the entity).
  * @param {string} id - entity id
  */
  addEntityInstanceId(id) {
    this.recordaction(this.addEntityInstanceId, "id", id);
    return this.add(PARAM.ENTITY_INSTANCE_ID, id);
  }
  setEntityInstanceId(id) {
    this.recordaction(this.setEntityInstanceId, "id", id);
    return this.replaceValue(PARAM.ENTITY_INSTANCE_ID, id);
  }
  /**
   * @param {int} index - defaults to 0, normally you would not want to go beyond zero. 
   * @return {string} id - of the entity according to the index
   */
  getEntityInstanceId(index = 0) {
    this.recordaction(this.getEntityInstanceId, "index", index);
    var res = this._parameters.get(PARAM.ENTITY_INSTANCE_ID + "_" + index);
    if (res == null || res == undefined) {
      S6Context.warn("No  " + PARAM.ENTITY_INSTANCE_ID + " for index:", index);
    }
    this.recordaction(this.getEntityInstanceId, 0, res);
    return res;
  }
  /** 
  * @return {Array} entities - [{entityId : <id>},{etc}] 
  */
  getEntityInstanceIds() {
    this.recordaction(this.getEntityInstanceIds, "EntityInstanceIds");
    var res = [];

    var length = this.countOf(PARAM.ENTITY_INSTANCE_ID);
    let count = "";
    for (var i = 0; i < length; i++) {
      count = i + "";
      let hidden_key = `${PARAM.ENTITY_INSTANCE_ID}_${count}`;
      let value = this._parameters.get(hidden_key);
      res[i] = { [PARAM.ENTITY_INSTANCE_ID]: value };
    }
    this.recordaction(this.getEntityInstanceIds, "", res);
    return res;
  }

  replaceJSON(key, value) {
    this.recordaction(this.replaceJSON, key, "json");
    var res;
    let hidden_key = `${key}_0`;
    this._parameters.delete(hidden_key);
    this._parameters.delete(key);
    res = this.add(key, JSON.stringify(value));
    return res;
  }


  getValue(key) {
    this.recordaction(this.getValue, key);
    let count = "0";
    let hidden_key = `${key}_${count}`;
    var res = this._parameters.get(hidden_key);
    if (!res) {
      S6Context.warn(`No such param [${key}]`);
    }
    this.recordaction(this.getValue, key, res);
    return res;
  }
  setValue(key, value) {
    this.recordaction(this.setValue, key, value);
    var res;
    let hidden_key = `${key}_0`;
    this._parameters.delete(hidden_key);
    this._parameters.delete(key);
    res = this.add(key, value + "");
    return res;
  }

  /**
   * Adds a new element.
   * @param {string} key - must be a string 
   * @param {string} value - must be a string 
   */
  add(key, value) {
    this.recordaction(this.add, key, value);
    S6Context.debugFn("Param:add", key, value);
    var res;
    var count = this._parameters.get(key);
    if (count == null) {
      count = 0;
    }
    else {
      count++;
    }
    count = count + "";
    this._parameters.set(key, count);
    let hidden_key = `${key}_${count}`;
    res = this._parameters.set(hidden_key, value);
    return res;
  }


  /**
    * Adds a new element.
    * @param {string} key - must be a string 
    * @param {Object} value - will be converted to a string if possible 
    */
  addValue(key, value = EMPTY) {
    this.recordaction(this.addValue, key, value);
    S6Context.debugFn("Param:addValue", key, value);
    return this.add(key, value);
  }
  replaceValue(key, value) {
    this.recordaction(this.replaceValue, key, value);
    S6Context.debugFn("Param:replaceValue", key, value);
    var res;
    let hidden_key = `${key}_0`;
    this._parameters.delete(hidden_key);
    this._parameters.delete(key);
    res = this.add(key, value + "");
    return res;
  }

  /**
    * Adds a new element.
    * @param {string} key - must be a string 
    * @param {JSON} json - must be JSON
    */
  addJSON(key, json) {
    this.recordaction(this.addJSON, key, "JSON");
    return this.add(key, JSON.stringify(json));
  }
  /**
   * @return {int} count of values that are stored with the given key
   */
  countOf(key) {
    var res = 0;
    var count = this._parameters.get(key);
    if (count != null) {
      res = parseInt(count) + 1;
    }
    return res;
  }

  getJSON(key) {
    var res;
    let count = "0";
    let hidden_key = `${key}_${count}`;
    var json = this._parameters.get(hidden_key);
    if (!json) {
      console.warn(`No such param [${key}]`);
    }
    else {
      res = JSON.parse(json);
    }
    this.recordaction(this.getJSON, key, "JSON");
    //console.log("param.getJSON(", key, ")=>", res);
    return res;
  }

  getAll(key) {
    this.recordaction(this.getAll, key);
    var res = [];
    var length = this.countOf(key);
    let count = "";
    for (var i = 0; i < length; i++) {
      count = i + "";
      let hidden_key = `${key}_${count}`;
      res[i] = this._parameters.get(hidden_key);
    }
    this.recordaction(this.getAll, key, res);
    return res;
  }
  deleteAll(key) {
    this.recordaction(this.deleteAll, key);
    let res = 0;
    var length = this.countOf(key);
    this._parameters.delete(key);
    let count = "";
    for (var i = 0; i < length; i++) {
      count = i + "";
      let hidden_key = `${key}_${count}`;
      this._parameters.delete(hidden_key);
      res++;
    }
    return res;
  }

  /**
    * Used to seralise the contents to string to go into paramters that requie name value pairs.
    * 
    */
  toJSON(key) {
    this.recordaction(this.toJSON, key, "JSON");
    if (key == null) {
      return this.toJSON_();
    }
    var res = {};
    var index = res[key] = [];
    var length = this.countOf(key);
    let count = "";
    for (var i = 0; i < length; i++) {
      count = i + "";
      let hidden_key = `${key}_${count}`;
      var jsonString = this._parameters.get(hidden_key);
      var json = eval('(' + jsonString + ')');
      index.push(json);
    }
    return res;
  }

  /**
   * @return {JSON} - converts the contents of the Map into JSOn which only contains name-value pairs. 
   * Use this function to pass paramters to an Action class 
   * Eg
      var gotoAction = CardService.newAction()
       .setFunctionName("actionOpenFolder")
       .setParameters(param.toJSON());
   */
  toJSON_() {
    var res = Object.fromEntries(this._parameters);
    ////console.log("toJSON [" + JSON.stringify(res) +"]");
    return res;
  }
}
