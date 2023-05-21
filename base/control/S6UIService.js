const DATA_TYPE_DOMAIN = "domain";
const DATA_TYPE_TEXT = "text";
const DATA_TYPE_SUBFOLDER = "subfolder";
const DATA_TYPE_SUBFOLDERS = "subfolders";
const DATA_TYPE_ALLFOLDERS = "allfolders";
const DATA_TYPE_PARAGRAH = "paragraph";
const DATA_TYPE_DATE = "date";
const DATA_TYPE_DATE_PRINTABLE = "datePrintable";
const DATA_TYPE_CHOOSE = "choose";
const DATA_TYPE_PAIRED_LIST = "pairedlist"
const DATA_TYPE_BHR_STAFF = "bhr.staff"
const DATA_TYPE_HARVEST_PROJECTS = "harvest.projects.asfolders";
const DATA_TYPE_PRIPIDRIVE_DEALS = "pipedrive.deals.asfolders";
const DATA_TYPE_PRIPIDRIVE_DEALS_IDS = "pipedrive.deals.ids";
const DATA_TYPE_HARVEST_PROJECTS_IDS = "harvest.projects.ids";
const DATA_TYPE_STAFF = "staff";
const DATA_TYPE_INPUT_LIST = "inputList";
const DATA_TYPE_SLECTOR = "selector";
const DATA_TYPE_SLECTED = "selected";
const DATA_TYPE_LINK = "link";
const DATA_TYPE_SWITCH = "switch"
const DATA_TYPE_NUMBER = "number"

const TEXT_ID_FOLDER = "📁";
const TEXT_ID_SUBFOLDER = "➕📁";
const TEXT_STICKY_BLANK = "󠀠󠀠󠀠󠀠󠀠󠀠 ";


class S6UIService {
  static version() {
    return "1.0";
  }

  /**
   * Creates an action that does nothing
   * Most CardService objecte need action whether they do something or not. 
   * When they do not need to do anything ths is the actio for you. 
   * @return {Action}
   */
  static createDoNothingAction() {
    return S6UIService.createAction();
  }
  static createAction(functionName, param) {
    var res = CardService.newAction();
    if (functionName) {
      res.setFunctionName(functionName);
      if (param) {
        S6Context.debug("createAction(", functionName, "=", JSON.stringify(param), ")");
        res.setParameters(param);
      }
      if (functionName != "S6UIService_actionNotify") {
        res.setLoadIndicator(CardService.LoadIndicator.SPINNER);
      }
      else {
        res.setLoadIndicator(CardService.LoadIndicator.NONE);
      }
    }
    else {
      res.setFunctionName("S6UIService_doNothingAction");
      res.setLoadIndicator(CardService.LoadIndicator.NONE);
    }
    return res;
  }

  static createInfoLabel(info, color = SECONDARY_COLOUR) {
    return S6UIService.createParagraph(`<font color='${color}'>${info}</font>`);
  }

  static validateFields(fields) {
    S6Context.debug("validateFields(" + fields.length + ")")
    var res = null;
    var missing = false;

    let titleMandatory = EMPTY;
    let headMandatory = "is";
    let tailMandatory = "a value";
    let valid = true;
    let errMandatoy = EMPTY;
    let errFolder = EMPTY;
    for (var i = 0; i < fields.length; i++) {
      let typeOnly = S6UIService.canonicalType(fields[i].type);
      let man = fields[i].mandatory;
      let valueEmpty = S6Utility.trim(fields[i].value) == EMPTY;

      S6Context.debug("createNotificationForMandatoryFields/title:", fields[i].title, "/mandatory:", man, "/value:", S6Utility.trim(fields[i].value), "/type:", typeOnly, "/empty:", valueEmpty);
      if (man == YES && valueEmpty) {
        S6Context.warn("Missing mandatory value for:", fields[i].title);
        valid = false;
        if (missing) {
          titleMandatory = titleMandatory + " and " + fields[i].title;
          headMandatory = "are"
          tailMandatory = "their values"
        }
        else {
          missing = true;
          titleMandatory = fields[i].title;
        }
      }

      if (typeOnly == DATA_TYPE_NUMBER) {
        if (isNaN(fields[i].value)) {
          valid = false;
          errFolder = errFolder + `${fields[i].title}' expects a number but got: ${fields[i].value}.`;
        }

      }

      if (typeOnly.includes("folder")) {
        S6Context.debug("validate folder with value " + fields[i].value);
        if (fields[i].value.indexOf("[") > -1 || fields[i].value.indexOf("]") > -1) {
          valid = false;
          errFolder = errFolder + "Invalid new folder name for " + fields[i].title + " of '" + fields[i].value + "'. ";
        }

      }
    }
    if (!valid) {
      if (missing) {
        errMandatoy = `The ${titleMandatory} ${headMandatory} mandatory. Please enter ${tailMandatory}.`;
      }
      res = S6UIService.createNotification(errMandatoy + errFolder);
    }
    return res;
  }
  static createNotification(msg, build = true) {
    S6Context.warn(msg);
    var res = CardService.newActionResponseBuilder().setNotification
      (
        CardService.newNotification()
          .setText(msg)

      )
      ;
    if (build) {
      return res.build();
    }
    return res;
  }
  static createNotificationWithNavigation(msg, navigation) {
    var res;
    S6Context.warn(msg);
    res = CardService.newActionResponseBuilder().setNotification
      (
        CardService.newNotification()
          .setText(msg)

      )
      .setNavigation(navigation)
      .build();
    return res;
  }
  static createRunTimeErrorNotification(err) {
    var stack = new Error(err);

    var user = Session.getActiveUser().getEmail();
    S6Context.error("Error for user[", user, "] with err[", stack.stack, "]");

    var msg = "I am sorry, its not work. It's not you. It's me! Something went wrong. It's been logged. If you can send feeback as to what time this problem happned then. we can find it in the logs...." + err;
    var res = CardService.newActionResponseBuilder().setNotification
      (
        CardService.newNotification()
          .setText(msg)
      )
      .build();
    return res;
  }

  static createRunTimeErrorCard(err) {

    var user = Session.getActiveUser().getEmail();
    S6Context.error("Error for user[", user, "] with err[", err.stack, "]");

    var msg = "<b>I am sorry, its not work. But it's not you. It's me!</b><br><br>The error has been logged. To find it in our logs we just need to know what time it happned.";

    var res = S6UIService.createCard("Error", "Something went wrong", ICON_SAD_URL);
    var section = S6UIService.createSection();
    var sorry = S6UIService.createParagraph(msg);
    var errtitle = S6UIService.createLabel("Error:");
    var errmsg = S6UIService.createParagraph('<font color="#757575">' + err.stack + '</font>');

    section.addWidget(sorry);
    section.addWidget(S6UIService.createSpacer());
    section.addWidget(S6UIService.createDivider());
    section.addWidget(errtitle);
    section.addWidget(errmsg);
    section.addWidget(S6UIService.createDivider());
    res.addSection(section);

    return res.build();
  }


  static createInputFromField(field, params = null, onChangeAction = null) {
    return S6UIService.createInputForType(field.field, field.title, field.type, field.hint, field.value, params, onChangeAction);
  }

  /**
   *    
   */
  static createInputForType(fieldName, title, type, hint, value, params = null, onChangeAction = null) {
    var res = null;
    if (title == null) {
      S6Context.error("createInputForType(title is null)");
    }
    let typeOnly = S6UIService.canonicalType(type);
    S6Context.debug("createInputForType:" + typeOnly);
    switch (typeOnly) {
      case DATA_TYPE_SWITCH:
        res = S6UIService.createSwitch(fieldName, title, hint, value, params, onChangeAction);
        break;
      case DATA_TYPE_TEXT:
        res = S6UIService.createTextInput(fieldName, title, hint, value);
        break;
      case DATA_TYPE_NUMBER:
        res = S6UIService.createTextInput(fieldName, title, hint, value);
        break;
      case DATA_TYPE_DOMAIN:
        res = S6UIService.createTextInput(fieldName, title, hint, value);
        break;
      case DATA_TYPE_PARAGRAH:
        res = S6UIService.createTextParagraphInput(fieldName, title, hint, value);
        break;
      case DATA_TYPE_DATE:
      case DATA_TYPE_DATE_PRINTABLE:
        res = S6UIService.createDateInput(fieldName, title, hint, value);
        break;
      case DATA_TYPE_INPUT_LIST:
        var list = S6UIService.typeParameters(type);
        res = S6UIService.createInputList(fieldName, title, hint, list, value);
        break;
      case DATA_TYPE_ALLFOLDERS:
        var rootFolder = S6UIService.typeParameters(type)[0];
        S6Context.debug("Allfoldders for rootfolder:" + rootFolder);
        if (params == null) {
          S6Context.error("Params null. Params.id must be included when the type is allfolders");
        }
        else if (!params.hasOwnProperty("id")) {
          S6Context.error("Params id missing. Params.id must be included when the type is allfolders");
        }
        else {
          res = S6UIService.createFolderDropdown_(params.id, rootFolder, title, hint);
        }
        break;
      case DATA_TYPE_PRIPIDRIVE_DEALS_IDS:
        var domain = S6UIService.typeParameters(type)[0];
        S6Context.debug("PipiDrive Deals for:" + domain);
        res = S6UIService._createSelectionPipeDriveDealIds(domain, title, hint);
        break;
      case DATA_TYPE_HARVEST_PROJECTS_IDS:
        var domain = S6UIService.typeParameters(type)[0];
        S6Context.debug("Harvest Projects:" + domain);
        res = S6UIService._createSelectionHarvestProjectsID(domain, title, hint);
        break;
      case DATA_TYPE_PRIPIDRIVE_DEALS:
        var domain = S6UIService.typeParameters(type)[0];
        S6Context.debug("PipiDrive Deals for:" + domain);
        res = S6UIService.createInputPipeDriveDeals(domain, title, hint);
        break;
      case DATA_TYPE_SUBFOLDER:
      case DATA_TYPE_SUBFOLDERS:
        var rootFolder = S6UIService.typeParameters(type)[0];
        S6Context.debug("Subfolder for rootfolder:" + rootFolder);
        if (params == null) {
          S6Context.error("Params null. Params.id must be included when the type is subfolder");
        }
        else if (!params.hasOwnProperty("id")) {
          S6Context.error("Params id missing. Params.id must be included when the type is subfolder");
        }
        else {
          res = S6UIService.createFolderInput(params.id, rootFolder, title, hint);
        }
        break;
      case DATA_TYPE_HARVEST_PROJECTS:
        var domain = S6UIService.typeParameters(type)[0];
        var list = S6Utility.createPairedListFromArray(HarvestAPIService.listProjectsForClientDomainName(domain));
        res = S6UIService._createPairedListDropdown(title, hint, list, value, params, onChangeAction);
        break;
      case DATA_TYPE_BHR_STAFF:
        var list = BambooHR.listStaffAsPairdedList();
        res = S6UIService._createPairedListDropdown(title, hint, list, value, params, onChangeAction);
        break;
      case DATA_TYPE_PAIRED_LIST:
        var list = S6UIService.typeParameters(type);
        res = S6UIService._createPairedListDropdown(title, hint, list, value, params, onChangeAction);
        break;
      case DATA_TYPE_CHOOSE:
        res = S6UIService.createChoiceInput(title, hint, value, params.choices);
        break;
      default:
        S6Context.error(`Invlaid type createInputForType(...${type})`);
        break;

    }
    if (res.setFieldName) {
      res.setFieldName(fieldName);
    }
    return res;
  }

  /**
   * Get the datatype, excluding paramters from a given type
   */
  static canonicalType(type = EMPTY) {
    let res = EMPTY;
    res = type.split("[")[0];
    if (type == DATA_TYPE_SUBFOLDERS) {
      type = DATA_TYPE_SUBFOLDER;
    }
    return res;
  }
  /**
   * Get the parameters from the data type. Parameters follow a type in ( brackets ).
   */
  static typeParameters(type) {
    let res = [];
    let work = type.split("[");
    if (work.length > 1) {
      if (work[1].includes("|")) {
        res = work[1].split("|");
      }
      else {
        res = work[1].split(",");
      }
      res[res.length - 1] = res[res.length - 1].split("]")[0];
    }
    return res;
  }

  static createTextParagraphInput(fieldName, title, hint, value) {
    var res = S6UIService.createTextInput(fieldName, title, hint, value);
    res.setMultiline(true);
    return res;
  }
  /**
   * Create a field for inputting text
   */
  static createTextInput(fieldName, title, hint, value) {
    S6Validate.mandatory("fieldName", fieldName);
    var res = CardService.newTextInput();

    res.setFieldName(fieldName);
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    else {
      res.setTitle(" ");
    }
    if (S6Utility.trim(hint) != EMPTY) {
      res.setHint(hint);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValue(value);
    }

    return res;
  }
  static createDateInput(fieldName, title, hint, value) {
    S6Validate.mandatory("fieldName", fieldName);
    var res = CardService.newDatePicker();
    res.setFieldName(fieldName);
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    else {
      res.setTitle(" ");
    }
    if (S6Utility.trim(hint) != EMPTY) {
      //res.setHint(hint);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValueInMsSinceEpoch(Date.parse(value));
    }
    return res;
  }

  static createIamgeLabel(text, hint, iconUrl) {
    var res = S6UIService._createDecoratedText(text, hint);

    res.setWrapText(true);

    if (S6Utility.trim(iconUrl) != EMPTY) {
      //res.setStartIcon(makeIcon(iconUrl));
      res.setIconUrl(iconUrl);
    }

    return res;
  }

  static createActionLabelOpenFile(file) {
    var param = new Param();
    param.setValue(PARAM.URL, file.getUrl());
    return S6UIService.createActionLabelOpen(file.getName(), S6Utility.getFileTypeName(file), S6Utility.getIconUrlForFile(file), "S6UIService_actionOpenFolderByURL", param.toJSON(), ICON_OPEN_IN_NEW_WINDOW_URL);
  }


  static createActionLabelOpen(text, hint, iconUrl, actionFunctionName, param) {
    return S6UIService.createActionLabel(text, hint, iconUrl, actionFunctionName, param, ICON_OPEN_IN_NEW_WINDOW_URL)

  }
  /**
   * Create read only lable that is clickable and executes and action
   */
  static createActionLabel(text, hint, iconUrl, actionFunctionName, param, rightImageUrl) {
    var res = S6UIService._createDecoratedText(text, hint);
    res.setWrapText(true);

    if (S6Utility.trim(iconUrl) != EMPTY) {
      res.setIconUrl(iconUrl);
    }
    if (S6Utility.trim(actionFunctionName) == EMPTY && param && param.hasOwnProperty("notify")) {
      actionFunctionName = "S6UIService_actionNotify";
    }
    if (rightImageUrl) {
      res.setEndIcon(makeIcon(rightImageUrl));
    }
    else {
      res.setEndIcon(makeIcon(ICON_RIGHT_ARROW_URL));
    }
    res.setOnClickAction(S6UIService.createAction(actionFunctionName, param));
    return res;
  }

  static createRefreshButton(param, refreshCache = true) {
    var res;
    if (refreshCache) {
      res = S6UIService._createDecoratedText("Refresh", "Clears the cache and refereshes this page with any new data.");
      var actionName = "S6UIService_refreshCacheAndPage";
    }
    else {
      res = S6UIService._createDecoratedText("Refresh", "Referesh this page with any new data.");
      var actionName = "S6UIService_refreshPage";
    }
    res.setWrapText(true);
    res.setEndIcon(makeIcon(ICON_REFRESH_URL));

    res.setOnClickAction(S6UIService.createAction(actionName, param));
    return res;
  }



  static createOpenLabel(title, hint, iconUrl, link) {
    S6Validate.mandatory("title", title).mandatoryType("iconUrl", iconUrl, DataType.URL).mandatoryType("link", link, DataType.URL);
    var param = new Param();
    param.setValue(PARAM.URL, link);
    return S6UIService.createActionLabelOpen(title, hint, iconUrl, "S6UIService_actionOpenFolderByURL", param.toJSON(), ICON_OPEN_IN_NEW_WINDOW_URL);
  }

  /**
  * Create read only lable
  */
  static createLabel(title, hint) {
    var res = CardService.newDecoratedText();
    res.setText(title);
    res.setWrapText(true);
    if (hint) {
      res.setBottomLabel(hint);
    }
    return res;
  }
  /**
* Create read only lable that is clickable and executes and action
*/
  static createValueLabel(title, value, iconUrl) {
    var res = CardService.newDecoratedText();
    res.setText(`<b>${title}</b> : ${value}`);
    res.setWrapText(true);
    if (iconUrl) {
      res.setIconUrl(iconUrl);
    }
    return res;
  }

  static _createDecoratedText(text, hint) {
    var res = CardService.newDecoratedText();
    if (text && hint) {
      res.setText(`${text}<br><font color="#757575")>${hint}</font>`);
      res.setWrapText(true);
    }
    else if (text) {
      res.setText(text);
      res.setWrapText(true);
    }
    else {
      res.setText(" ");
    }
    return res;
  }
  static createThumbnailImageFromUrl(fileURL) {
    return S6UIService.createThumbnailImageFromId(S6Utility.getIdFromUrl(fileURL));
  }

  static createThumbnailImageFromId(id) {
    return S6UIService.createThumbnailImageFromFile(DriveApp.getFileById(id));
  }

  static createThumbnailImageFromFile(file) {
    var res;
    var thumb = file.getThumbnail();
    if (thumb) {
      res = CardService.newImage();
      var imageBytes = thumb.getBytes();
      var encodedImageURL = "data:image/jpeg;base64," + Utilities.base64Encode(imageBytes);
      res.setImageUrl(encodedImageURL);
    }
    else {
      res = CardService.newDecoratedText()
        .setIconUrl(S6Utility.getIconUrlForFile(file))
        .setText("Can not create a thumbnail for this type of file.")
        .setWrapText(true);


    }
    return res;

  }

  static createLablesFromJson(json, title) {
    var res = CardService.newTextParagraph();
    var text = EMPTY;
    if (title) {
      text = `<font color='${SECONDARY_COLOUR}'>${title}</font><br>`;
    }
    let br = EMPTY
    for (const property in json) {
      text = `${text}${br}<b>${property}: </b>${json[property]}`;
      br = "<br>";
    }
    res.setText(text);
    return res;
  }


  static createIconLabel(title, hint = EMPTY, iconUrl = EMPTY) {
    S6Validate.mandatoryType("title", title, DataType.STRING).type("iconUrl", iconUrl, DataType.URL);

    //var buttonIcon = CardService.newImageButton().setIconUrl(iconUrl).setOnClickAction(S6UIService.createDoNothingAction());
    var res = CardService.newDecoratedText();
    res.setText(title);
    if (hint !== EMPTY) {
      res.setBottomLabel(hint);
    }
    if (iconUrl != EMPTY) {
      res.setStartIcon(makeIcon(iconUrl));
    }

    res.setWrapText(true);
    return res;
  }
  /**
  * Create read only lable that is clickable and executes and action
  */
  static createSmallLabel(title) {
    var res = CardService.newTextParagraph();
    res.setText(`<font color="#757575">${title}</font>`);
    // var res = CardService.newDecoratedText();
    // res.setText(" ");
    // res.setBottomLabel(title);
    // res.setWrapText(true);
    return res;
  }
  /**
   * Create read only lable that is clickable and executes and action
   */
  static createParagraph(text) {
    var res = CardService.newTextParagraph();
    if (S6Utility.trim(text) == EMPTY) {
      res.setText(" ");
    }
    else {
      res.setText(text);
    }
    return res;
  }

  static createInputList(fieldName, title, hint, list = [], value = EMPTY) {
    S6Context.debugFn("createInputList", fieldName, title, hint, list, value, list.length);
    //list[list.length] = value;
    var res = CardService.newTextInput()
      .setSuggestions(CardService.newSuggestions().addSuggestions(list));
    res.setMultiline(true);
    if (S6Utility.trim(hint) != EMPTY) {
      res.setHint(hint);
    }
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValue(value);
    }
    res.setFieldName(fieldName);
    return res;
  }

  static createPropertySelector(prop, functionName = EMPTY, param) {
    var res = CardService.newSelectionInput();

    var title = prop[PROPERTIES.ATTR.TITLE];
    var value = prop[PROPERTIES.ATTR.VALUE];
    var propName = prop[PROPERTIES.ATTR.PROP_NAME];

    S6Context.debugFn("createPropertySelector:values", value);

    res.setTitle(`🔽 ${title}`);
    res.setFieldName(propName);
    res.setType(CardService.SelectionInputType.DROPDOWN);
    if (value.length > 0) {
      for (var v = 0; v < value.length; v++) {
        res.addItem(value[v++], value[v], v == 1);
      }
    }
    else {
      res.addItem(EMPTY, EMPTY, true);
    }
    if (functionName != EMPTY) {
      res.setOnChangeAction(S6UIService.createAction(functionName, param));
    }
    return res;
  }

  static createPropertySelected(prop, functionName = EMPTY, param) {
    var title = prop[PROPERTIES.ATTR.TITLE];
    var hint = prop[PROPERTIES.ATTR.HINT];
    var display = prop[PROPERTIES.ATTR.SELECTOR_DISPLAY];
    var propName = prop[PROPERTIES.ATTR.PROP_NAME];
    var text = `<b>${title} :</b> for ${display}`;
    var res = S6UIService._createDecoratedText(text, hint);
    res.setTopLabel(propName);
    res.setWrapText(true);
    res.setEndIcon(makeIcon(ICON_DOUBLE_ARROW_LEFT));
    res.setOnClickAction(S6UIService.createAction(functionName, param));
    return res;

  }


  static getSeletecedHelper(field, seed) {
    var res = EMPTY;
    var selector = field.selector;
    var values = field.selectorValues;
    for (var next in values[seed]) {
      if (selector == next.toString()) {
        res = values[seed][next];
        break;
      }
    }
    return res;
  }

  static createPropertyLabel(prop, functionName, param) {
    var title = prop[PROPERTIES.ATTR.TITLE];
    var hint = prop[PROPERTIES.ATTR.HINT];
    var value = prop[PROPERTIES.ATTR.VALUE];
    var propName = prop[PROPERTIES.ATTR.PROP_NAME];
    var text = `<b>${title} :</b> ${value}`;
    var res = S6UIService._createDecoratedText(text, hint);
    res.setTopLabel(propName);
    res.setWrapText(true);
    res.setEndIcon(makeIcon(ICON_DOUBLE_ARROW_LEFT));
    res.setOnClickAction(S6UIService.createAction(functionName, param));
    return res;
  }

  static createPropertyButton(prop, functionName, param) {
    var title = prop[PROPERTIES.ATTR.TITLE];
    var propName = prop[PROPERTIES.ATTR.PROP_NAME];
    var text = `<b>Apply :</b> ${title}<br><font color="#757575">${propName}</font>`;
    var res = S6UIService._createDecoratedText(text, EMPTY);
    res.setWrapText(true);
    res.setEndIcon(makeIcon(ICON_DOUBLE_ARROW_LEFT));
    res.setOnClickAction(S6UIService.createAction(functionName, param));
    return res;
  }

  static createPropertyDateInput(prop, functionName, param) {
    var title = prop[PROPERTIES.ATTR.TITLE];
    var hint = prop[PROPERTIES.ATTR.HINT];
    var value = prop[PROPERTIES.ATTR.VALUE];
    var field = prop[PROPERTIES.ATTR.FIELD];
    var res = S6UIService.createDateInput(field, title, hint, value);
    return res;
  }

  static createPropertyInput(prop, functionName, param) {
    var title = prop[PROPERTIES.ATTR.TITLE];
    var hint = prop[PROPERTIES.ATTR.HINT];
    var value = prop[PROPERTIES.ATTR.VALUE];
    var propName = prop[PROPERTIES.ATTR.PROP_NAME];
    var field = prop[PROPERTIES.ATTR.FIELD];
    var res = S6UIService.createTextInput(field, title, hint, value);
    // res.setEndIcon(makeIcon(ICON_ARROW_LEFT_CIRCLE_URL));
    // res.setOnClickAction(S6UIService.createAction(functionName, param));
    return res;
  }


  static createFolderLabel(folderName, subFolder) {
    var res;
    var hint = (subFolder && subFolder == YES) ? "Subfolder" : "Folder";
    var buttonIcon = CardService.newImageButton()
      .setIconUrl(ICON_FOLDER_URL)
      .setOnClickAction(S6UIService.createDoNothingAction());
    ;
    res = CardService.newDecoratedText()
      .setText(folderName)
      //.setIconUrl(ICON_FOLDER_URL)
      .setBottomLabel(hint)
      .setButton(buttonIcon)
      .setWrapText(true)
      ;
    return res;
  }


  static createFileLabelFromUrl(fileName, fileUrl) {
    S6Validate.mandatoryType("fileName", fileName, DataType.STRING).mandatoryType("fileUrl", DataType.URL);
    S6Context.debug(`createFileLabel(${fileName},${fileUrl}`);
    var icon = S6Utility.getAppIconForTypeFromURL(fileUrl);
    if (!icon || icon == EMPTY) {
      icon = S6Utility.getIconUrlForFolder();
    }
    return S6UIService.createFileLabel(fileName, icon);
  }
  static createFileLabel(fileName, icon) {
    S6Validate.mandatory("fileName", fileName).mandatory("icon", icon);
    var res;
    var buttonIcon = CardService.newImageButton()
      .setIconUrl(icon)
      .setOnClickAction(S6UIService.createDoNothingAction())
      ;

    res = CardService.newDecoratedText()
      .setText(fileName == null ? EMPTY : fileName)
      //.setIconUrl(ICON_FILE_URL)
      .setButton(buttonIcon)
      .setWrapText(true)
      .setBottomLabel("File")
      ;
    return res;
  }

  static createImageButton(iconURL, functionName, param) {
    var res = CardService.newImageButton();

    res.setIconUrl(iconURL);
    if (functionName) {
      res.setOnClickAction(S6UIService.createAction(functionName, param));
    }
    else {
      res.setOnClickAction(S6UIService.createDoNothingAction());
    }
    return res;
  }
  static createTextButton(title, colour, functionName, param = {}) {
    S6Context.debug("createTextButton:", param, ":", functionName);
    var res = CardService.newTextButton();
    res.setText(title);
    res.setTextButtonStyle(CardService.TextButtonStyle.FILLED);
    res.setBackgroundColor(colour);
    if (functionName != null) {
      res.setOnClickAction(CardService.newAction()
        .setFunctionName(functionName)
        .setParameters(param));
    }
    else {
      res.setOnClickAction(S6UIService.createDoNothingAction());
    }
    return res;
  }

  static createIconButton(title, iconUrl, functionName, param) {
    S6Validate.mandatory("title", title).mandatoryType("iconUrl", iconUrl, DataType.URL).type("functionName", functionName, DataType.STRING).type("param", param, DataType.JSON);
    var res = CardService.newDecoratedText();

    res.setText(title);
    res.setIconUrl(iconUrl);
    if (functionName != null) {
      res.setOnClickAction(CardService.newAction().setFunctionName(functionName).setParameters(param));
    }
    else {
      res.setOnClickAction(S6UIService.createDoNothingAction());
    }
    return res;
  }
  static createGoToCardButton(title, entity) {
    var res = S6UIService.createCreateButton(title, "S6UIService_doGoToCard", { goto: entity });
    return res;
  }

  static createCreateButton(title, functionName = EMPTY, param) {
    if (S6Utility.trim(functionName) == EMPTY) {
      functionName = "S6UIService_actionGoBack";
      param = {};
    }
    var res = S6UIService.createTextButton(title, PRIMARY_COLOUR, functionName, param);
    res.setTextButtonStyle(CardService.TextButtonStyle.FILLED); // required for fixed fotter 
    return res;
  }
  static createCancelButton(title, functionName = EMPTY, param) {
    if (S6Utility.trim(functionName) == EMPTY) {
      functionName = "S6UIService_actionGoBack";
      param = {};
    }
    var res = S6UIService.createTextButton(title, CANCEL_COLOUR, functionName, param);
    res.setTextButtonStyle(CardService.TextButtonStyle.TEXT);  // required for fixed fotter 
    return res;
  }
  static createButtonSet(createButton, cancelButton) {
    var res = CardService.newButtonSet();
    res.addButton(createButton);
    res.addButton(cancelButton);
    return res;
  }

  static createFooter(createButton, cancelButton) {
    var res = CardService.newFixedFooter();
    res.setPrimaryButton(createButton);
    if (cancelButton != null) {
      res.setSecondaryButton(cancelButton);

    }
    return res;
  }
  static createInputPipeDriveDeals(domain, title, hint, value) {
    var res = CardService.newTextInput()
      .setSuggestions(S6UIService._createPipeDriveDealSuggestions(domain));

    if (S6Utility.trim(hint) != EMPTY) {
      res.setHint(hint);
    }
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValue(value);
    }
    return res;
  }

  static _createSelectionPipeDriveDealIds(domain, title, hint, value) {
    var res = CardService.newSelectionInput()
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValue(value);
    }
    try {
      S6Context.debug("createPipiDriveDealSuggestions_(", domain, ")");
      var deals = S6PipeDrive.listOpenDealTitles(domain, true);
      if (deals && deals.length > 0) {
        for (let i = 0; i < deals.length; i++) {
          var text = deals[i++] + "";
          var value = deals[i] + "";
          var isValue = i == 0;
          res.addItem(text, value, isValue);
          S6Context.debugFn("addItem", text, value);
        }
      }
      else {
        res.addItem("test", "test", i == 0);
      }
    }
    catch (err) {
      S6Context.error(err.stack);
      S6Context.error(err);
    }
    return res;
  }

  static _createSelectionHarvestProjectsID(domain, title, hint, value) {
    var res = CardService.newSelectionInput()
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValue(value);
    }
    try {
      S6Context.debug("_createSelectionHarvestProjectsID(", domain, ")");
      var projects = HarvestAPIService.listProjectsForClientDomainName(domain, true);
      if (projects && projects.length > 0) {
        for (let i = 0; i < projects.length; i++) {
          var text = projects[i++] + "";
          var value = projects[i] + "";
          var isValue = i == 0;
          res.addItem(text, value, isValue);
          S6Context.debugFn("addItem", text, value);
        }
      }
      else {
        res.addItem("test", "test", i == 0);
      }
    }
    catch (err) {
      S6Context.error(err.stack);
      S6Context.error(err);
    }
    return res;
  }

  static _createPipeDriveDealSuggestions(domain) {
    let res = CardService.newSuggestions();
    try {
      S6Context.debug("createPipiDriveDealSuggestions_(", domain, ")");
      var deals = S6PipeDrive.listOpenDealTitles(domain);
      if (deals) {
        for (let i = 0; i < deals.length; i++) {
          res.addSuggestion(TEXT_ID_SUBFOLDER + S6Utility.squish(deals[i]));
        }
      }
    }
    catch (err) {
      S6Context.error(err);
    }
    res.addSuggestion(TEXT_ID_SUBFOLDER + " [Enter New Folder Name]");
    return res;
  }

  /**
   * Create a dropdown editable input field, filled with folder suggestions
   */
  static createFolderInput(id, subFolder, title, hint, value) {
    var res = CardService.newTextInput()
      .setSuggestions(S6UIService.createFolderSuggestions_(id, subFolder));

    if (S6Utility.trim(hint) != EMPTY) {
      res.setHint(hint);
    }
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    if (S6Utility.trim(value) != EMPTY) {
      res.setValue(value);
    }
    return res;
  }



  static createChoiceInput(title, hint, value, choices) {
    S6Context.debug(choices);
    var res = CardService.newSelectionInput().setType(CardService.SelectionInputType.RADIO_BUTTON);

    for (let i = 0; i < choices.length; i++) {
      res.addItem(choices[i], choices[i], choices[i] == value);
    }

    // if (S6Utility.trim(hint) != EMPTY) {
    //   res.setHint(hint);
    // }
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    // if (S6Utility.trim(value) != EMPTY) {
    //   res.setValue(value);
    // }
    return res;
  }

  static createNZBNSearch(field) {
    var res = S6UIService.createTextInput(field[ENTITY.FIELD_ATTR.FIELD_NAME], field[ENTITY.FIELD_ATTR.TITLE], field[ENTITY.FIELD_ATTR.HINT], field[ENTITY.FIELD_ATTR.VALUE]);
    var action = S6UIService.createAction(S6UIService_suggestNZBN.name, { fieldName: field[ENTITY.FIELD_ATTR.FIELD_NAME] });
    res.setSuggestionsAction(action);
    return res;

  }

  /**
   * Creates the list of subfolders as suggestiions for function createFolderInput.  
   */
  static createFolderSuggestions_(id, subFolder) {
    let res = CardService.newSuggestions();
    try {
      S6Context.debug("createFolderSuggestions_(" + id + "," + subFolder + ")");
      let rootFolder = S6DriveApp.getFolderById(id);

      var folder = S6Utility.getFolderFromRootFolderAndPath(rootFolder, subFolder);

      res.addSuggestion(TEXT_ID_FOLDER + " " + S6Utility.getFolderOrDriveName(folder));
      if (folder != null) {
        var it = folder.getFolders();
        while (it.hasNext()) {
          res.addSuggestion(TEXT_ID_SUBFOLDER + " " + it.next().getName());
        }
      }
    }
    catch (err) {
      S6Context.error(err);
    }
    res.addSuggestion(TEXT_ID_SUBFOLDER + " [Enter New Folder Name]");
    return res;
  }

  static createSwitch(fieldName, title, hint, selected, params, onChangeAction) {
    var res = S6UIService._createDecoratedText(title, hint);
    res.setWrapText(true);
    var sw = CardService.newSwitch();
    sw.setValue(YES);
    sw.setFieldName(fieldName);
    sw.setSelected(selected == YES);

    if (onChangeAction) {
      sw.setOnChangeAction(
        CardService.newAction()
          .setFunctionName(onChangeAction)
          .setParameters(params))
    }
    res.setSwitchControl(sw);
    return res;
  }

  static _createPairedListDropdown(title, hint, list, value, params, onChangeAction) {
    let res = CardService.newSelectionInput();
    if (params && params.hasOwnProperty("selectionInputType")) {
      var selectionInputType = params.selectionInputType;
      res.setType(selectionInputType);
    }
    else {
      res.setType(CardService.SelectionInputType.DROPDOWN);
    }
    for (let i = 0; i < list.length; i = i + 2) {
      //S6Context.debug("Add SelectionInput", list[i], list[i + 1]);
      res.addItem(list[i], list[i + 1], list[i + 1] == value);
    }
    if (title) {
      // if (hint) {
      //   res.setTitle(`${title}, ${hint}`);
      // }
      // else {
      res.setTitle(title);
      // }
    }
    if (onChangeAction) {
      res.setOnChangeAction(S6UIService.createAction(onChangeAction));
    }
    return res;
  }
  /**
 * Creates the list of subfolders as suggestiions for function createFolderInput.  
 */
  static createFolderDropdown_(id, subFolder, title, hint) {
    let res = CardService.newSelectionInput().setType(CardService.SelectionInputType.DROPDOWN);
    try {
      S6Context.debug("createFolderSuggestions_(" + id + "," + subFolder + ")");
      let rootFolder = S6DriveApp.getFolderById(id);
      var folder = S6Utility.getFolderFromRootFolderAndPath(rootFolder, subFolder);
      var folderName = folder.getName();
      //res.addItem(TEXT_ID_FOLDER + " " + folderName, folderName, false);
      res.addItem(TEXT_ID_FOLDER + " " + folderName, subFolder, false);
      var map = new Map();
      S6UIService._addFolderItems_(map, folder, TEXT_STICKY_BLANK, folderName, TEXT_ID_SUBFOLDER);
      var sortedMap = new Map([...map.entries()].sort());
      sortedMap.forEach((value, key) => {
        S6Context.debug(key);
        res.addItem(value, key, false);
      });

      if (title) {
        res.setTitle(title);
      }


    }
    catch (err) {
      S6Context.error(err);
      throw err;
    }

    if (S6Utility.trim(hint) != EMPTY) {
      //res.setHint(hint);
    }
    if (S6Utility.trim(title) != EMPTY) {
      res.setTitle(title);
    }
    return res;
  }
  static _addFolderItems_(map, folder, spacer, dir, prefix) {
    if (folder) {
      var it = folder.getFolders();
      while (it.hasNext()) {
        var nextFolder = it.next();
        var folderName = nextFolder.getName();
        var fullDir = "unknown";
        if (S6Utility.trim(dir) != EMPTY) {
          fullDir = dir + FOLDER_SEPERATOR + folderName;
        }
        else {
          fullDir = folderName;
        }
        S6Context.debug("_addFolderItems_:", folderName, "/dir:", fullDir);

        map.set(fullDir, spacer + prefix + folderName);
        S6UIService._addFolderItems_(map, nextFolder, spacer + TEXT_STICKY_BLANK, fullDir, TEXT_ID_SUBFOLDER);

      }
    }
  }
  static createDivider() {
    return CardService.newDivider();
  }
  static createSpacer() {
    return CardService.newTextParagraph().setText(" ");
  }

  static createImagePropertyChoice(imageUrl, text, hint) {
    var res = S6UIService._createDecoratedText();
    res.setIconUrl(imageUrl);
    res.setText(text);
    res.setBottomLabel(hint);
    res.setEndIcon(makeIcon(ICON_DOUBLE_ARROW_LEFT));
    return res;
  }

  static createImage(url) {
    S6Validate.mandatoryType("url", url, DataType.URL);
    return CardService.newImage().setImageUrl(url);
  }

  static createDomainLabel(title, domain, actionFunction, param) {
    var res;
    var buttonIcon = CardService.newImageButton()
      .setIconUrl(S6Utility.getFaviconDomainFetchURL(domain.toLowerCase()))
      .setOnClickAction(S6UIService.createAction(actionFunction, param));
    ;
    res = CardService.newDecoratedText()
      .setText(title)
      .setButton(buttonIcon)
      .setWrapText(true)
      ;
    return res;
  }

  static createFieldLabelsForSection(section, fields) {
    for (var i = 0; i < fields.length; i++) {
      S6Context.debug("createFieldLabelsForSection:", fields[i]);
      var fieldLabel = S6UIService.createFieldLabel(fields[i]);
      section.addWidget(fieldLabel);
    }
  }

  static createFieldLabel(field) {
    S6Context.debug("createFieldLabel:", field);
    var res;
    var value = S6Utility.trim(field.value);
    var title = S6Utility.trim(field.title);
    var type = S6Utility.trim(field.type);
    var text = `<font color='${SECONDARY_COLOUR}'>${title}</font> : <b>${value}</b>`;
    if (type == DATA_TYPE_DOMAIN) {
      res = S6UIService.createDomainLabel(text, value);
    }
    else {
      res = S6UIService.createLabel(text);
    }
    return res;
  }

  static createCard(title, hint, imageURL, name = title, functionName, params) {
    var res = CardService.newCardBuilder();
    if (S6Utility.trim(title) != EMPTY) {
      var h = CardService.newCardHeader();
      h.setTitle(title);
      if (S6Utility.trim(hint) != EMPTY) {
        h.setSubtitle(hint);
      }
      if (S6Utility.trim(imageURL) != EMPTY) {
        h.setImageUrl(imageURL);
      }
      res.setHeader(h);
    }
    else {
      S6Context.warn("Creating a Card without a title will mean it has no Header");
    }

    if (S6Utility.trim(name) != EMPTY) {
      res.setName(name);
    }

    if (S6Utility.trim(functionName) != EMPTY) {
      var ca = CardService.newCardAction();
      ca.setText("Card Action");
      var action = S6UIService.createAction(functionName, params);
      ca.setOnClickAction(action);
      res.addCardAction(ca);
      S6Context.info("Add card action:", ca);
    }

    return res;
  }
  static createSection(title = EMPTY, iconUrl = EMPTY) {
    var res = CardService.newCardSection();

    if (title != EMPTY && iconUrl != EMPTY) {
      var text = S6UIService._createDecoratedText(`<font color='${SECONDARY_COLOUR}'>${title}</font>`);
      text.setStartIcon(makeIcon(iconUrl))
      res.addWidget(text);
    }
    else if (title != EMPTY) {
      res.addWidget(S6UIService.createInfoLabel(title));
    }
    return res;
  }

  static createUpdateCardNavigation(card, url, msg) {
    var res = CardService.newActionResponseBuilder();
    var nav = CardService.newNavigation().popToRoot().updateCard(card);

    if (url) {

      var open = CardService.newOpenLink();

      open.setUrl(url);
      res.setOpenLink(open);
    }
    if (msg) {
      res.setNotification(CardService.newNotification().setText(msg));
    }
    res.setNavigation(nav);

    return res.build();
  }

  static createGoHomeNavigation(url, msg) {
    var res = CardService.newActionResponseBuilder();
    var nav = CardService.newNavigation().popToRoot();

    if (url) {
      var open = CardService.newOpenLink();
      open.setOpenAs(CardService.OpenAs.FULL_SIZE);
      open.setOnClose(CardService.OnClose.NOTHING);
      open.setUrl(url);
      res.setOpenLink(open);
    }
    if (msg) {
      res.setNotification(CardService.newNotification().setText(msg));
    }

    res.setNavigation(nav);
    var build = res.build();

    return build;
  }

  static createGoToNavigation(goTo, url, msg) {
    var nav = CardService.newNavigation().popToNamedCard(goTo);
    var res = CardService.newActionResponseBuilder().setNavigation(nav);

    if (url) {
      S6Context.debug("createGoHomeNavigation/url", url);
      var open = CardService.newOpenLink().setUrl(url);
      open.setOpenAs(CardService.OpenAs.FULL_SIZE);
      res.setOpenLink(open);
    }
    if (msg) {
      res.setNotification(CardService.newNotification().setText(msg));
    }
    return res.build();
  }

  static createInfoSection(name, section) {
    let res;
    const master = S6Master.newMaster();
    const info = master.info;
    for (var i = 0; i < info.length; i++) {
      if (info[i].name == name) {
        var hint = EMPTY;
        let icon = ICON_HELP_URL;
        if (info[i].type == INFO.INFO_TYPES.HELP) {
          icon = ICON_HELP_URL;
        }
        else if (info[i].type == INFO.INFO_TYPES.INFO) {
          icon = ICON_INFO_URL;
        }
        else if (info[i].type == INFO.INFO_TYPES.TIP) {
          icon = ICON_INFO_URL;
        }
        else if (info[i].type == INFO.INFO_TYPES.WARN) {
          icon = ICON_WARNING_URL;
        }
        if (!section) {
          res = S6UIService.createSection();
          res.setCollapsible(true);
          res.setNumUncollapsibleWidgets(1);
          var hint = "Expend ▼ to see information."
        }
        else {
          res = section;
        }
        res.addWidget(S6UIService.createIconLabel(`<b>${info[i].title}</b>`, `${hint}`, icon));
        res.addWidget(S6UIService.createParagraph(`${info[i].text}`));
        break;
      }
    }
    return res;

  }

  static createHelpSection(title, hint = EMPTY, helpText, collapsible = true, icon = ICON_HELP_URL) {
    var res = S6UIService.createSection();
    if (collapsible && hint == EMPTY) {
      hint = "Expend ▼ to see help information."
    }
    res.addWidget(S6UIService.createIconLabel(`<b>${title}</b>`, `${hint}`, icon));

    res.setCollapsible(collapsible);
    res.setNumUncollapsibleWidgets(1);
    res.addWidget(S6UIService.createParagraph(`${helpText}`));
    return res;
  }
}

function S6UIService_suggestNZBN(event) {
  S6Context.debug(event);
  var field = event.parameters["fieldName"];
  var seed = event.formInputs[field][0];
  if (seed && seed.length > 1) {
    var found = S6RegisteredOrganisationService.find(seed);
    var suggestions = CardService.newSuggestions();
    suggestions.addSuggestions(found)
    return CardService.newSuggestionsResponseBuilder()
      .setSuggestions(suggestions)
      .build();
  }
}

function S6UIService_actionOpenFolderByURL(event) {
  var res;
  var param = new Param(event);

  var url = param.getValue(PARAM.URL);
  S6Context.debug(url);
  S6Context.debug("Ghost args:", ...arguments);

  res = CardService.newUniversalActionResponseBuilder()
    .setOpenLink(CardService.newOpenLink()
      .setOpenAs(CardService.OpenAs.FULL_SIZE)
      .setUrl(url))
    .build()
    ;
  return res;
}
function S6UIService_doNothingAction(event) {
  // do nothing
}

function S6UIService_doGoToCard(event) {
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation()
      .popToNamedCard(event.parameters.goto))
    .build()
    ;
  // do nothing
}

function S6UIService_onChangeDomain(event) {
  S6Context.debug(JSON.stringify(event));
}

function S6UIService_actionGoBack(event) {
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation()
      .popCard())
    .build()
    ;
}

function S6UIService_actionGoHome(event) {
  return S6UIService.createGoHomeNavigation();
}

function S6UIService_Switch(event) {

  S6Context.debug(event);
  var location = event.parameters.fieldName;
  var card = event.parameters.card;
  var hide = event.formInput[location];

  var res = CardService.newActionResponseBuilder().setNavigation(
    CardService.newNavigation()
      .popToRoot()
      .popToNamedCard(card)
  );

  var j = res.build();
  S6Context.debug(j.printJson());
  return j;
}
function S6UIService_actionNotify(event) {
  var text = event.commonEventObject.parameters.notify;
  S6Context.debug(text);

  var res = CardService.newActionResponseBuilder().setNotification
    (
      CardService.newNotification()
        .setText(text)

    )
    .build();
  return res;
}
function S6UIService_refreshPage(event) {
  var param = new Param(event);
  var eventName = param.getValue(PARAM.EVENT_NAME);
  S6Context.debug("S6UIService_refreshPage", eventName);
  var newContext = S6Context.newFromName(eventName);

  return CardService.newNavigation().updateCard(newContext.executeBuild(event));


}
function S6UIService_refreshCacheAndPage(event) {
  var param = new Param(event);
  var eventName = param.getValue(PARAM.EVENT_NAME);
  S6Context.debug("S6UIService_refreshCacheAndPage", eventName);
  var newContext = S6Context.newFromName(eventName);

  S6Cache.userCacheClear();
  return CardService.newNavigation().updateCard(newContext.executeBuild(event));


}
