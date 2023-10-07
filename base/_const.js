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
// const ICON_S6_URL = "https://lh3.googleusercontent.com/-BA_sFlZaD40/YtjskUmaleI/AAAAAAAAAqg/2RvA2UkhG6ElCiTKVMZ0fySOKXmjQSFwQCNcBGAsYHQ/s400/32%2Bx%2B32%2Bhopferly-02.png";
// const ICON_CREATE_URL = "https://github.com/google/material-design-icons/blob/master/png/content/add_circle_outline/materialiconsoutlined/48dp/1x/outline_add_circle_outline_black_48dp.png?raw=true";
// const ICON_BRUSH_URL = "https://github.com/google/material-design-icons/blob/master/png/image/brush/materialiconsoutlined/48dp/2x/outline_brush_black_48dp.png?raw=true";
// const ICON_INFO_URL = "https://raw.githubusercontent.com/google/material-design-icons/master/png/action/info/materialiconsoutlined/48dp/1x/outline_info_black_48dp.png?raw=true";
// const ICON_EDIT_URL = "https://github.com/google/material-design-icons/blob/master/png/image/edit/materialiconsoutlined/48dp/2x/outline_edit_black_48dp.png?raw=true";
// const ICON_GO_TO_FOLDER_URL = "https://github.com/google/material-design-icons/blob/master/png/file/drive_file_move/materialiconsoutlined/48dp/2x/outline_drive_file_move_black_48dp.png?raw=true";
// const ICON_LIST_URL = "https://github.com/google/material-design-icons/blob/master/png/action/list/materialiconsoutlined/48dp/1x/outline_list_black_48dp.png?raw=true";
// const ICON_NEW_FILE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/note_add/materialiconsoutlined/48dp/2x/outline_note_add_black_48dp.png?raw=true";
// const ICON_NEW_FOLDER_URL = "https://github.com/google/material-design-icons/blob/master/png/file/create_new_folder/materialiconsoutlined/48dp/2x/outline_create_new_folder_black_48dp.png?raw=true";
// const ICON_FOLDER_URL = "https://github.com/google/material-design-icons/blob/master/png/file/folder/materialicons/48dp/2x/baseline_folder_black_48dp.png?raw=true";
// const ICON_FILE_URL = "https://github.com/google/material-design-icons/blob/master/png/file/text_snippet/materialicons/48dp/2x/baseline_text_snippet_black_48dp.png?raw=true";
// const ICON_SETTINGS_URL = "https://github.com/google/material-design-icons/blob/master/png/action/settings/materialiconsoutlined/48dp/2x/outline_settings_black_48dp.png?raw=true";
// const ICON_ADD_BOX_URL = "https://github.com/google/material-design-icons/blob/master/png/content/add_box/materialiconsoutlined/48dp/2x/outline_add_box_black_48dp.png?raw=true";
// const ICON_CHANGE = "https://github.com/google/material-design-icons/blob/master/png/action/change_history/materialiconsoutlined/48dp/2x/outline_change_history_black_48dp.png?raw=true";
// const ICON_DONE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/check_circle_outline/materialiconsoutlined/48dp/2x/outline_check_circle_outline_black_48dp.png?raw=true";
// const ICON_DRIVE_URL = "https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png";
// const ICON_DRIVE_OUTLINE_URL = "https://drive.google.com/uc?export=view&id=1O7zhJapVPwI808qp1kfUkFedkOF1icjF";
// const ICON_MOVE_DOWN_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/move_down/materialiconsoutlined/48dp/1x/outline_move_down_black_48dp.png?raw=true";
// const ICON_GEAR_GREEN_URL = "https://drive.google.com/uc?export=view&id=1elDKTR2GDIKrasPz5QEr_wFNTcwiha_B";
// const ICON_RIGHT_ARROW_URL = "https://drive.google.com/uc?export=view&id=1SdIqEl4gFDMw-OJmTLIL6YhMJvLPj32h";
// const ICON_OPEN_IN_NEW_WINDOW_URL = "https://drive.google.com/uc?export=view&id=12cIlSbWhNBojCmjo3ty0RFYd-TE5j_9d";
// const ICON_REPLY_ALL_URL = "https://drive.google.com/uc?export=view&id=15kN0GbpE4LXncGOS2bedLQjJaphlHY1k";
// const ICON_SCATTER_URL = "https://drive.google.com/uc?export=view&id=1rl7BYWEr7UEmXtCvk2-GzE-P4qPwUVaA";
// const ICON_LOCK_URL = "https://drive.google.com/uc?export=view&id=19sOh4be9N3Cz3d2EXHMSVP8QPti9iMUt";
// const ICON_CODE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/code/materialiconsoutlined/48dp/1x/outline_code_black_48dp.png?raw=true";
// const ICON_DELETE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/delete/materialiconsoutlined/24dp/2x/outline_delete_black_24dp.png?raw=true";
// const ICON_REFRESH_URL = "https://drive.google.com/uc?export=view&id=1WHbJ3RcPisXuKa3J1aeuH4gS5e6fbbhI";
// const ICON_RETURN_URL = "https://drive.google.com/uc?export=view&id=1mWniuyQfgvVwZkIXKbzpQud6PFmkwSta";
// const ICON_GLOBLE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/language/materialiconsoutlined/48dp/2x/outline_language_black_48dp.png?raw=true";
// const ICON_COPY_FILE_URL = "https://drive.google.com/uc?export=view&id=1jbpNp5nNnqnfALIIMacBWDV7tHW5W2z9";
// const ICON_MOVE_FILE_URL = "https://drive.google.com/uc?export=view&id=1Z4qFBNt9YwsT2Wpv4yfT2R90rOEl5RF2";
// const ICON_CREATE_SHORTCUT_URL = "https://drive.google.com/uc?export=view&id=1-vlL_zIzeug0dmVicW7AcehYprzvXrj2";
// const ICON_GAME_CONSOLE_URL = "https://drive.google.com/uc?export=view&id=1Ej8CQ7Yw49vz-3ertt_BYjkiDEfzuQHD";
// const ICON_TASKS_URL = "https://drive.google.com/uc?export=view&id=1QKqFELoOgEMJQWw_FwU0iOXoTbdbtDi6";
// const ICON_SEARCH_URL = "https://drive.google.com/uc?export=view&id=1k-Spd0_G6gkgz3TVOe5iwtcZT2X9rKVe";
// const ICON_HELP_URL = "https://drive.google.com/uc?export=view&id=1Fxb1z4o5Z72sWQtJOdNyg9HBNUIrPRzk";
// const ICON_WARNING_URL = "https://drive.google.com/uc?export=view&id=1sEPzqEWvblKMMgonxrd_ZglF0N_VtD7t";
// const ICON_TUNE_URL = "https://drive.google.com/uc?export=view&id=1x5PbjuqOoNZFep1s2Jzs15W573KD_9x_";
// const ICON_SWITCH_ACCESS_URL = "https://drive.google.com/uc?export=view&id=1wD4UWU_id6evNcYDd974sU7dWfsplbrb";
// const ICON_GOOGLE_TEAMDRIVE_URL = "https://drive.google.com/uc?export=view&id=1XIEF47xXpgkARLfiobeRl781R0ddUcHr";
// const ICON_DOUBLE_ARROW_LEFT = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/keyboard_double_arrow_left.png?raw=true";
// const ICON_DOUBLE_ARROW_LEFT_PURPLE = "https://drive.google.com/uc?export=view&id=1ftM41qmo7pd9iHE7mkOhKDcU1BIzMcVj";
// const ICON_POST_ADD_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/post_add/materialiconsoutlined/48dp/2x/outline_post_add_black_48dp.png?raw=true";
// const ICON_ARROW_LEFT_CIRCLE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/arrow_circle_left/materialiconsoutlined/48dp/2x/outline_arrow_circle_left_black_48dp.png?raw=true";
// const ICON_ONLINE_PREDICTIONS = "https://github.com/google/material-design-icons/blob/master/png/action/online_prediction/materialiconsoutlined/48dp/2x/outline_online_prediction_black_48dp.png?raw=true";
// const ICON_OPEN_AI_URL = "https://static-00.iconduck.com/assets.00/openai-icon-505x512-pr6amibw.png"
// const ICON_QUOTE_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/format_quote/materialiconsoutlined/48dp/2x/outline_format_quote_black_48dp.png?raw=true";
// const ICON_APP_SETTINGS_URL = "https://github.com/google/material-design-icons/blob/master/png/action/settings_applications/materialiconsoutlined/48dp/2x/outline_settings_applications_black_48dp.png?raw=true";
// const ICON_SAD_URL = "https://raw.githubusercontent.com/google/material-design-icons/master/png/social/sentiment_dissatisfied/materialiconsoutlined/48dp/2x/outline_sentiment_dissatisfied_black_48dp.png";

//const ICON_DRIVE_URL = "img_DriveOutline";
//"img_DriveOutline.html";//"https://drive.google.com/uc?export=view&id=1O7zhJapVPwI808qp1kfUkFedkOF1icjF";

const ICON_APP_SETTINGS_URL = "https://github.com/google/material-design-icons/blob/master/png/action/settings_applications/materialiconsoutlined/48dp/2x/outline_settings_applications_black_48dp.png?raw=true";
const ICON_QUOTE_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/format_quote/materialiconsoutlined/48dp/2x/outline_format_quote_black_48dp.png?raw=true";
const ICON_DOUBLE_ARROW_LEFT = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/keyboard_double_arrow_left.png?raw=true";
const ICON_GOOGLE_TEAMDRIVE_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/folder.png?raw=true";
const ICON_POST_ADD_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/post_add/materialiconsoutlined/48dp/2x/outline_post_add_black_48dp.png?raw=true";
const ICON_SAD_URL = "https://raw.githubusercontent.com/google/material-design-icons/master/png/social/sentiment_dissatisfied/materialiconsoutlined/48dp/2x/outline_sentiment_dissatisfied_black_48dp.png";
const ICON_OPEN_AI_URL = "https://static-00.iconduck.com/assets.00/openai-icon-505x512-pr6amibw.png";
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
const ICON_DRIVE_OUTLINE_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google%20Drive%20Outline.png?raw=true";
const ICON_GEAR_GREEN_URL = "https://github.com/lomasnz/public-resources/blob/main/misc-icons/green_settings.png?raw=true";
const ICON_MOVE_DOWN_URL = "https://github.com/google/material-design-icons/blob/master/png/editor/move_down/materialiconsoutlined/48dp/2x/outline_move_down_black_48dp.png?raw=true";

const ICON_RIGHT_ARROW_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_forward.png?raw=true";
const ICON_OPEN_IN_NEW_WINDOW_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/open_in_new.png?raw=true";
const ICON_REPLY_ALL_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/reply_all.png?raw=true";
const ICON_SCATTER_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/scatter_plot.png?raw=true";
const ICON_LOCK_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/lock.png?raw=true";
const ICON_CODE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/code/materialiconsoutlined/48dp/1x/outline_code_black_48dp.png?raw=true";
const ICON_DELETE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/delete/materialiconsoutlined/24dp/2x/outline_delete_black_24dp.png?raw=true";
const ICON_REFRESH_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/refresh.png?raw=true";
const ICON_RETURN_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/keyboard_return.png?raw=true";
const ICON_GLOBLE_URL = "https://github.com/google/material-design-icons/blob/master/png/action/language/materialiconsoutlined/48dp/2x/outline_language_black_48dp.png?raw=true";
const ICON_COPY_FILE_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/file_copy.png?raw=true";
const ICON_MOVE_FILE_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/drive_file_move.png?raw=true";
const ICON_CREATE_SHORTCUT_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/add_to_drive.png?raw=true";
const ICON_GAME_CONSOLE_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/stadia_controller.png?raw=true";
const ICON_TASKS_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/add_task.png?raw=true";
const ICON_SEARCH_URL = "https://github.com/google/material-design-icons/blob/master/png/action/search/materialiconsoutlined/48dp/1x/outline_search_black_48dp.png?raw=true";
const ICON_HELP_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/help.png?raw=true";
const ICON_WARNING_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/warning.png?raw=true";
const ICON_TUNE_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/tune.png?raw=true";
const ICON_SWITCH_ACCESS_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/switch_access_shortcut.png?raw=true";
const ICON_GOOGLE_ASSISTANT_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google-Assistant.webp?raw=true";
const ICON_STACKED_CHART_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/stacked_line_chart.png?raw=true";
const ICON_FILTER_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/filter.png?raw=true";
const ICON_MIC_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/mic.png?raw=true";
const ICON_ARROW_DROP_DOWN_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_drop_down.png?raw=true";
const ICON_KEYBOARD_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/keyboard.png?raw=true";
const ICON_EMOJI_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/emoji_emotions.png?raw=true";
const ICON_ATTACHMENT_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/attachment.png?raw=true";
const ICON_LOCATION_ON_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/location_on.png?raw=true";
const ICON_VIEW_QUILT_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/view_quilt.png?raw=true";
const ICON_GOOGLE_DRIVE_ICON_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google-Drive.webp?raw=true";
const ICON_ARROW_RIGHT_ALT_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_right_alt.png?raw=true";
const ICON_ARROW_BACK_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_back.png?raw=true";
const ICON_ACCOUNT_CIRCLE_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/account_circle.png?raw=true";
const ICON_KEYBOARD_ARROW_DOWN_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/keyboard_arrow_down.png?raw=true";
const ICON_KEYBOARD_ARROW_UP_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/keyboard_arrow_up.png?raw=true";
const ICON_ARROW_FORWARD_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_forward.png?raw=true";
const ICON_ARROW_UPWARD_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_upward.png?raw=true";
const ICON_ARROW_DOWNWARD_URL = "https://github.com/lomasnz/public-resources/blob/main/material-design-icons/arrow_downward.png?raw=true";
// DARK / BLACK
const ICON_GOOGLE_DOC_BLACK_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google-Docs-Black.webp?raw=true";
const ICON_GOOGLE_PRESENTATION_BLACK_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google-Slides-Black.webp?raw=true";
const ICON_GOOGLE_SPREADSHEET_BLACK_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google-Sheets-Black.webp?raw=true";
const ICON_GOOGLE_FORM_BLACK_URL = "https://raw.githubusercontent.com/lomasnz/public-resources/main/google-workspace-icons/Google-Drive-Folder.webp";

// COLOURED 
const ICON_GOOGLE_DOC_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/document.png?raw=true";
const ICON_GOOGLE_PRESENTATION_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/presentation.png?raw=true";
const ICON_GOOGLE_SPREADSHEET_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/spreadsheet.png?raw=true";
const ICON_GOOGLE_FORM_URL = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/form.png?raw=true";
const ICON_DRIVE_FOLDER = "https://github.com/lomasnz/public-resources/blob/main/google-workspace-icons/Google-Drive-Folder.webp?raw=true";
const ICON_ATLASSIAN_URL = "https://www.google.com/s2/favicons?domain_url=atlassian.com";

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

const FOLDER_SEPERATOR = "\\";

const FOLDER_TYPE_ROOT = "RootFolder";
const FOLDER_TYPE_SUB = "SubFolder";

const USER_PROPERTY_MASTER_URL = "MASTER_URL";
const USER_PROPERTY_LOCALE = "LOCALE";
const USER_PROPERTY_HIDE_HELP = "HIDE_HELP";
const USER_PROPERTY_HOME = "HOME";

const MILLISECONDS_IN_A_MINUTE = 60000;

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

var HTTPS_STATUS_CODES = {
  100: { name: "Continue" },
  101: { name: "Switching Protocols" },
  102: { name: "Processing" },
  200: { name: "OK" },
  201: { name: "Created" },
  202: { name: "Accepted" },
  203: { name: "Non-Authoritative Information" },
  204: { name: "No Content" },
  205: { name: "Reset Content" },
  206: { name: "Partial Content" },
  207: { name: "Multi-Status" },
  208: { name: "Already Reported" },
  226: { name: "IM Used" },
  300: { name: "Multiple Choices" },
  301: { name: "Moved Permanently" },
  302: { name: "Found" },
  303: { name: "See Other" },
  304: { name: "Not Modified" },
  305: { name: "Use Proxy" },
  307: { name: "Temporary Redirect" },
  308: { name: "Permanent Redirect" },
  400: { name: "Bad Request" },
  401: { name: "Unauthorized" },
  402: { name: "Payment Required" },
  403: { name: "Forbidden" },
  404: { name: "Not Found" },
  405: { name: "Method Not Allowed" },
  406: { name: "Not Acceptable" },
  407: { name: "Proxy Authentication Required" },
  408: { name: "Request Timeout" },
  409: { name: "Conflict" },
  410: { name: "Gone" },
  411: { name: "Length Required" },
  412: { name: "Precondition Failed" },
  413: { name: "Payload Too Large" },
  414: { name: "URI Too Long" },
  415: { name: "Unsupported Media Type" },
  416: { name: "Range Not Satisfiable" },
  417: { name: "Expectation Failed" },
  418: { name: "I'm a teapot" },
  421: { name: "Misdirected Request" },
  422: { name: "Unprocessable Entity" },
  423: { name: "Locked" },
  424: { name: "Failed Dependency" },
  425: { name: "Too Early" },
  426: { name: "Upgrade Required" },
  428: { name: "Precondition Required" },
  429: { name: "Too Many Requests" },
  431: { name: "Request Header Fields Too Large" },
  451: { name: "Unavailable For Legal Reasons" },
  500: { name: "Internal Server Error" },
  501: { name: "Not Implemented" },
  502: { name: "Bad Gateway" },
  503: { name: "Service Unavailable" },
  504: { name: "Gateway Timeout" },
  505: { name: "HTTP Version Not Supported" },
  506: { name: "Variant Also Negotiates" },
  507: { name: "Insufficient Storage" },
  508: { name: "Loop Detected" },
  510: { name: "Not Extended" },
  511: { name: "Network Authentication Required" },
  520: { name: "Unknown Error" },
  521: { name: "Web Server Is Down" },
  522: { name: "Connection Timed Out" },
  523: { name: "Origin Is Unreachable" },
  524: { name: "A Timeout Occurred" },
  525: { name: "SSL Handshake Failed" },
  526: { name: "Invalid SSL Certificate" },
  527: { name: "Railgun Error" },
  530: { name: "Origin DNS Error" }
}
  ;