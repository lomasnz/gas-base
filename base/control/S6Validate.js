const DataType = {
  URL: "URL",
  ARRAY: "ARRAY",
  JSON: "JSON",
  STRING: "STRING",
  FIELDS: "fields",
  DriveID: "ID"
};
class S6Validate {

  static mandatory(name, value) {
    //S6Context.debug("mandatory[", name, "] is", (value ?"defined" : "undefined"));
    if (!value) {
      S6Validate.mandatory("S6Validate::mandatory:name",name);
      throw new Error(`Missing mandatory value for [${name}]`);
    }
    return S6Validate;
  }
  static mandatoryType(name, value, type) {
    return S6Validate.mandatory(name, value).type(name, value, type);
  }

  static type(name, value, type) {
    if (value) {
      switch (type) {
        case DataType.URL:
          if (!value.startsWith("https://")) {
            throw new Error(`Does not look like a URL for [${name}] with value[${value}]`);
          }
          break;
        case DataType.ARRAY:
          if (!S6Validate._isArray(value)) {
            throw new Error(`[${name}] is not an array, with value[${value}]`);
          }
          break;
        case DataType.FIELDS:
          if (!S6Validate._isJSON(value)) {
            throw new Error(`JSON fields [${name}] does not contain Json. Value[${value}]`);
          }
          if (!S6Validate._isFields(value)) {
            throw new Error(`Fields JSON [${name}] is missing 'fields' attribute, with value[${value0}]`);
          }
          if (!S6Validate._isFieldInFields(value)) {
            throw new Error(`Array of fields [${name}] Json fields[0] is missing one or more of 'field', 'value', 'title', with value[${value}]`);
          }
          break;
        case DataType.JSON:
          if (!S6Validate._isJSON(value)) {
            throw new Error(`[${name}] is not JSON, with value[${value}]`);
          }
          break;
        case DataType.STRING:
          if (!S6Validate._isString(value)) {
            throw new Error(`[${name}] is not a String, with value[${value}]`);
          }
          break;
        case DataType.DriveId: {
          if (!S6Validate._isString(value)) {
            throw new Error(`[${name}] is not a a DriveID unless it is a String. Value[${value}]`);
          }
          if (value.includes(".")) {
            throw new Error(`[${name}] is does not look like a DrivceId with the value[${value}]`);
          }
          break;
        }
      }
    }
    return S6Validate;
  }

  static _isFieldInFields(obj) {
    return obj.fields[0].hasOwnProperty("field") && obj.fields[0].hasOwnProperty("value") && obj.fields[0].hasOwnProperty("title");
  }
  static _isFields(obj) {
    return obj.hasOwnProperty("fields");
  }

  static _isArray(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Array;
  }

  static _isBoolean(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Boolean;
  }

  static _isFunction(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Function;
  }

  static _isNumber(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Number;
  }

  static _isString(obj) {
    return obj !== undefined && obj !== null && obj.constructor == String;
  }

  static _isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }

  static _isJSON(obj) {
    return obj !== undefined && obj !== null && obj.constructor == ({}).constructor;
  }

  static _isInstanced(obj) {
    if (obj === undefined || obj === null) { return false; }

    if (_isArray(obj)) { return false; }
    if (_isBoolean(obj)) { return false; }
    if (_isFunction(obj)) { return false; }
    if (_isNumber(obj)) { return false; }
    if (_isObject(obj)) { return false; }
    if (_isString(obj)) { return false; }

    return true;
  }

}
