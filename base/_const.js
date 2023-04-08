const YES = "YES";
const NO = "NO";
const NEVER = "NEVER";
const ALWAYS = "ALWAYS";
const YES_IF_SELECTED = "YES IF SELECTED";

const TRUE = "true";
const FALSE = "false";

const EMPTY = "";
var _ = LodashGS.load();
/**
 * CONSTANTS 
 */
const ICON_S6_URL = "https://lh3.googleusercontent.com/-BA_sFlZaD40/YtjskUmaleI/AAAAAAAAAqg/2RvA2UkhG6ElCiTKVMZ0fySOKXmjQSFwQCNcBGAsYHQ/s400/32%2Bx%2B32%2Bhopferly-02.png";
const ICON_CREATE_URL = "https://github.com/google/material-design-icons/blob/master/png/content/add_circle_outline/materialiconsoutlined/48dp/1x/outline_add_circle_outline_black_48dp.png?raw=true";
const ICON_BRUSH_URL = "https://github.com/google/material-design-icons/blob/master/png/image/brush/materialiconsoutlined/48dp/2x/outline_brush_black_48dp.png?raw=true";



const ICON_INFO_URL = "https://raw.githubusercontent.com/google/material-design-icons/master/png/action/info/materialiconsoutlined/48dp/1x/outline_info_black_48dp.png?raw=true";


const ICON_EDIT_URL = "https://github.com/google/material-design-icons/blob/master/png/image/edit/materialiconsoutlined/48dp/2x/outline_edit_black_48dp.png?raw=true";
const ICON_GO_TO_FOLDER_URL = "https://github.com/google/material-design-icons/blob/master/png/file/drive_file_move/materialiconsoutlined/48dp/2x/outline_drive_file_move_black_48dp.png?raw=true";


const ICON_LIST_URL = "https://github.com/google/material-design-icons/blob/master/png/action/list/materialiconsoutlined/48dp/1x/outline_list_black_48dp.png?raw=true";


const ICON_NEW_FILE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/note_add/materialiconsoutlined/48dp/2x/outline_note_add_black_48dp.png?raw=true";


const ICON_NEW_FOLDER_URL = "https://github.com/google/material-design-icons/blob/master/png/file/create_new_folder/materialiconsoutlined/48dp/2x/outline_create_new_folder_black_48dp.png?raw=true";


const ICON_FOLDER_URL = "https://github.com/google/material-design-icons/blob/master/png/file/folder/materialicons/48dp/2x/baseline_folder_black_48dp.png?raw=true";
const ICON_FILE_URL = "https://github.com/google/material-design-icons/blob/master/png/file/text_snippet/materialicons/48dp/2x/baseline_text_snippet_black_48dp.png?raw=true";

const ICON_SETTINGS_URL = "https://github.com/google/material-design-icons/blob/master/png/action/settings/materialiconsoutlined/48dp/2x/outline_settings_black_48dp.png?raw=true";


const ICON_ADD_BOX_URL = "https://github.com/google/material-design-icons/blob/master/png/content/add_box/materialiconsoutlined/48dp/2x/outline_add_box_black_48dp.png?raw=true";
const ICON_CHANGE = "https://github.com/google/material-design-icons/blob/master/png/action/change_history/materialiconsoutlined/48dp/2x/outline_change_history_black_48dp.png?raw=true";

const ICON_DONE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/check_circle_outline/materialiconsoutlined/48dp/2x/outline_check_circle_outline_black_48dp.png?raw=true";


const ICON_DRIVE_URL = "https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png";
const ICON_DRIVE_OUTLINE_URL = "https://drive.google.com/uc?export=view&id=1O7zhJapVPwI808qp1kfUkFedkOF1icjF";
const ICON_MOVE_DOWN_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/move_down/materialiconsoutlined/48dp/1x/outline_move_down_black_48dp.png?raw=true";

const ICON_GEAR_GREEN_URL = "https://drive.google.com/uc?export=view&id=1elDKTR2GDIKrasPz5QEr_wFNTcwiha_B";
const ICON_RIGHT_ARROW_URL = "https://drive.google.com/uc?export=view&id=1SdIqEl4gFDMw-OJmTLIL6YhMJvLPj32h";
const ICON_OPEN_IN_NEW_WINDOW_URL = "https://drive.google.com/uc?export=view&id=12cIlSbWhNBojCmjo3ty0RFYd-TE5j_9d";
const ICON_REPLY_ALL_URL = "https://drive.google.com/uc?export=view&id=15kN0GbpE4LXncGOS2bedLQjJaphlHY1k";
const ICON_SCATTER_URL = "https://drive.google.com/uc?export=view&id=1rl7BYWEr7UEmXtCvk2-GzE-P4qPwUVaA";
const ICON_LOCK_URL = "https://drive.google.com/uc?export=view&id=19sOh4be9N3Cz3d2EXHMSVP8QPti9iMUt";
const ICON_CODE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/code/materialiconsoutlined/48dp/1x/outline_code_black_48dp.png?raw=true";
const ICON_DELETE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/delete/materialiconsoutlined/24dp/2x/outline_delete_black_24dp.png?raw=true";
const ICON_REFRESH_URL = "https://drive.google.com/uc?export=view&id=1WHbJ3RcPisXuKa3J1aeuH4gS5e6fbbhI";
const ICON_RETURN_URL = "https://drive.google.com/uc?export=view&id=1mWniuyQfgvVwZkIXKbzpQud6PFmkwSta";

const ICON_GLOBLE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/language/materialiconsoutlined/48dp/2x/outline_language_black_48dp.png?raw=true";
const ICON_COPY_FILE_URL = "https://drive.google.com/uc?export=view&id=1jbpNp5nNnqnfALIIMacBWDV7tHW5W2z9";
const ICON_MOVE_FILE_URL = "https://drive.google.com/uc?export=view&id=1Z4qFBNt9YwsT2Wpv4yfT2R90rOEl5RF2";
const ICON_CREATE_SHORTCUT_URL = "https://drive.google.com/uc?export=view&id=1-vlL_zIzeug0dmVicW7AcehYprzvXrj2";
const ICON_GAME_CONSOLE_URL = "https://drive.google.com/uc?export=view&id=1Ej8CQ7Yw49vz-3ertt_BYjkiDEfzuQHD";
const ICON_TASKS_URL = "https://drive.google.com/uc?export=view&id=1QKqFELoOgEMJQWw_FwU0iOXoTbdbtDi6";
const ICON_SEARCH_URL = "https://drive.google.com/uc?export=view&id=1k-Spd0_G6gkgz3TVOe5iwtcZT2X9rKVe";
const ICON_HELP_URL = "https://drive.google.com/uc?export=view&id=1Fxb1z4o5Z72sWQtJOdNyg9HBNUIrPRzk";
const ICON_WARNING_URL = "https://drive.google.com/uc?export=view&id=1sEPzqEWvblKMMgonxrd_ZglF0N_VtD7t";
const ICON_TUNE_URL = "https://drive.google.com/uc?export=view&id=1x5PbjuqOoNZFep1s2Jzs15W573KD_9x_";
const ICON_SWITCH_ACCESS_URL = "https://drive.google.com/uc?export=view&id=1wD4UWU_id6evNcYDd974sU7dWfsplbrb";
const ICON_GOOGLE_TEAMDRIVE_URL = "https://drive.google.com/uc?export=view&id=1XIEF47xXpgkARLfiobeRl781R0ddUcHr";
const ICON_DOUBLE_ARROW_LEFT = "https://drive.google.com/uc?export=view&id=1SLQf4L6FT3BV6EtvCAO0KuY8fCMiM1D0";
const ICON_DOUBLE_ARROW_LEFT_PURPLE = "https://drive.google.com/uc?export=view&id=1ftM41qmo7pd9iHE7mkOhKDcU1BIzMcVj";
const ICON_POST_ADD_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/post_add/materialiconsoutlined/48dp/2x/outline_post_add_black_48dp.png?raw=true";
const ICON_ARROW_LEFT_CIRCLE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/arrow_circle_left/materialiconsoutlined/48dp/2x/outline_arrow_circle_left_black_48dp.png?raw=true";
const ICON_ONLINE_PREDICTIONS = "https://github.com/google/material-design-icons/blob/master/png/action/online_prediction/materialiconsoutlined/48dp/2x/outline_online_prediction_black_48dp.png?raw=true";
const ICON_OPEN_AI_URL = "https://static-00.iconduck.com/assets.00/openai-icon-505x512-pr6amibw.png"
const ICON_QUOTE_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/format_quote/materialiconsoutlined/48dp/2x/outline_format_quote_black_48dp.png?raw=true";
const ICON_APP_SETTINGS_URL = "https://github.com/google/material-design-icons/blob/master/png/action/settings_applications/materialiconsoutlined/48dp/2x/outline_settings_applications_black_48dp.png?raw=true";
const ICON_SAD_URL = "https://raw.githubusercontent.com/google/material-design-icons/master/png/social/sentiment_dissatisfied/materialiconsoutlined/48dp/2x/outline_sentiment_dissatisfied_black_48dp.png";

//const ICON_DRIVE_URL = "img_DriveOutline";
//"img_DriveOutline.html";//"https://drive.google.com/uc?export=view&id=1O7zhJapVPwI808qp1kfUkFedkOF1icjF";

const PRIMARY_COLOUR = "#61166d";
const SECONDARY_COLOUR = "#4185f4";
const CANCEL_COLOUR = "#ee0200";

const GOOGLE_FILE_TYPE_SPREADSHEET_ID = "spreadsheets";
const GOOGLE_FILE_TYPE_DOC_ID = "document";
const GOOGLE_FILE_TYPE_PRESENTATION_ID = "presentation";
const GOOGLE_FILE_TYPE_FORMS_ID = "forms";

const GOOGLE_FILE_TYPE_SPREADSHEET_NAME = "Spreadsheet";
const GOOGLE_FILE_TYPE_DOC_NAME = "Doc";
const GOOGLE_FILE_TYPE_SLIDE_NAME = "Slide Deck";
const GOOGLE_FILE_TYPE_FORM_NAME = "Form";

// DARK / BLACK
const ICON_GOOGLE_DOC_BLACK_URL = "https://drive.google.com/uc?export=view&id=1taToYXEwh4snw4_gzOgyC3ztDyx_rQ-Z";
const ICON_GOOGLE_PRESENTATION_BLACK_URL = "https://drive.google.com/uc?export=view&id=1jG4MmvhO9mbYOQAORY8P-LRCy9CMlOJn";
const ICON_GOOGLE_SPREADSHEET_BLACK_URL = "https://drive.google.com/uc?export=view&id=1FFC6juQby794j45sjCZ2XmwHx5_sr4TE";
const ICON_GOOGLE_FORM_BLACK_URL = "https://drive.google.com/uc?export=view&id=1P5HVlgRDLlTFe3mL4mIesjI2i4sgIaNQ";

// COLOURED 
const ICON_GOOGLE_DOC_URL = "https://drive.google.com/uc?export=view&id=1f72NAIUHCgk6s4dshtK4Sgy6XCNVbvh2";
const ICON_GOOGLE_PRESENTATION_URL = "https://drive.google.com/uc?export=view&id=13k5os5_w1pA7EfW7VATGZmWZbhayCSu4";
const ICON_GOOGLE_SPREADSHEET_URL = "https://drive.google.com/uc?export=view&id=1F1QIbSoaPCGKMa3o3wOXM6L6-u4xvGzq";
const ICON_GOOGLE_FORM_URL = "https://drive.google.com/uc?export=view&id=1ixK_wI1Q2yGI4ObdYxVH5ltiqjaJs8o-";
const ICON_DRIVE_FOLDER = "https://drive.google.com/uc?export=view&id=1V1wfvoR34HzwYNehQOzwG9MWoMt6RkN4";


const ICON_ATLASSIAN_URL = "https://www.google.com/s2/favicons?domain_url=atlassian.com";

const FOLDER_SEPERATOR = "\\";
const APPS_MAP = new Map();

const FOLDER_TYPE_ROOT = "RootFolder";
const FOLDER_TYPE_SUB = "SubFolder";


const USER_PROPERTY_MASTER_URL = "MASTER_URL";
const USER_PROPERTY_LOCALE = "LOCALE";
const USER_PROPERTY_HIDE_HELP = "HIDE_HELP";
const USER_PROPERTY_HOME = "HOME";

const MILLISECONDS_IN_A_MINUTE = 60000;

const DOC_ICON_URL_PREFIX = "https://drive-thirdparty.googleusercontent.com/16/type/";

var DOC_MIMETYPE_NAME = {
  "application/vnd.google-apps.audio": "Audio file",
  "application/vnd.google-apps.document": "Google Doc",
  "application/vnd.google-apps.drive-sdk": "3rd party shortcut",
  "application/vnd.google-apps.drawing": "Google Drawing",
  "application/vnd.google-apps.file": "Google Drive file",
  "application/vnd.google-apps.folder": "Google Drive folder",
  "application/vnd.google-apps.form": "Google Form",
  "application/vnd.google-apps.fusiontable": "Google Fusion Table",
  "application/vnd.google-apps.jam": "Google Jamboard",
  "application/vnd.google-apps.map": "Google My Map",
  "application/vnd.google-apps.photo": "Photo file",
  "application/vnd.google-apps.presentation": "Google Slide",
  "application/vnd.google-apps.script": "Google Apps Script",
  "application/vnd.google-apps.shortcut": "Folder/File Shortcut",
  "application/vnd.google-apps.site": "Google Sites",
  "application/vnd.google-apps.spreadsheet": "Google Sheet",
  "application/vnd.google-apps.unknown": "Unknown file",
  "application/vnd.google-apps.video": "Video file",
  "application/pdf": "PDF file",
  "image/jpeg": "JPEG Image",
  "image/png": "PNG Image",
  "image/gif": "GIF Image",
  "image/svg+xml": "SVG",
  "application/zip": "Zip",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "Microsoft PowerPoint",
  "application/vnd.ms-powerpoint": "Microsoft PowerPoint",
  "application/vnd.openxmlformats-officedocument.presentationml.slide": "Microsoft Slide",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": "Microsoft Slideshow",
  "application/vnd.openxmlformats-officedocument.presentationml.template": "Microsoft PowerPoint Template",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Microsoft Excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": "Microsoft Excel Template",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Microsoft Word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": "Microsoft Word Template"
}