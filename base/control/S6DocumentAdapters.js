const APPLY = {
  IMAGE: "image",
  TEXT: "text",
  LINK: "link"
}
var DOCUMENT_ELEMENT_TYPES = {
  [DocumentApp.ElementType.BODY_SECTION]: "BODY_SECTION",
  [DocumentApp.ElementType.COMMENT_SECTION]: "COMMENT_SECTION",
  [DocumentApp.ElementType.DATE]: "DATE",
  [DocumentApp.ElementType.DOCUMENT]: "DOCUMENT",
  [DocumentApp.ElementType.EQUATION]: "EQUATION",
  [DocumentApp.ElementType.EQUATION_FUNCTION]: "EQUATION_FUNCTION",
  [DocumentApp.ElementType.EQUATION_FUNCTION_ARGUMENT_SEPARATOR]: "EQUATION_FUNCTION_ARGUMENT_SEPARATOR",
  [DocumentApp.ElementType.EQUATION_SYMBOL]: "EQUATION_SYMBOL",
  [DocumentApp.ElementType.RICH_LINK]: "RICH_LINK",
  [DocumentApp.ElementType.FOOTER_SECTION]: "FOOTER_SECTION",
  [DocumentApp.ElementType.FOOTNOTE]: "FOOTNOTE",
  [DocumentApp.ElementType.FOOTNOTE_SECTION]: "FOOTNOTE_SECTION",
  [DocumentApp.ElementType.HEADER_SECTION]: "HEADER_SECTION",
  [DocumentApp.ElementType.HORIZONTAL_RULE]: "HORIZONTAL_RULE",
  [DocumentApp.ElementType.INLINE_DRAWING]: "INLINE_DRAWING",
  [DocumentApp.ElementType.INLINE_IMAGE]: "INLINE_IMAGE",
  [DocumentApp.ElementType.LIST_ITEM]: "LIST_ITEM",
  [DocumentApp.ElementType.PAGE_BREAK]: "PAGE_BREAK",
  [DocumentApp.ElementType.PARAGRAPH]: "PARAGRAPH",
  [DocumentApp.ElementType.PERSON]: "PERSON",
  [DocumentApp.ElementType.TABLE]: "TABLE",
  [DocumentApp.ElementType.TABLE_CELL]: "TABLE_CELL",
  [DocumentApp.ElementType.TABLE_OF_CONTENTS]: "TABLE_OF_CONTENTS",
  [DocumentApp.ElementType.TABLE_ROW]: "TABLE_ROW",
  [DocumentApp.ElementType.TEXT]: "TEXT",
  [DocumentApp.ElementType.UNSUPPORTED]: "UNSUPPORTED",
};

const DOCUMENT_GLYPH_TYPES = {
  [DocumentApp.GlyphType.BULLET]: "BULLET",
  [DocumentApp.GlyphType.HOLLOW_BULLET]: "HOLLOW_BULLET",
  [DocumentApp.GlyphType.SQUARE_BULLET]: "SQUARE_BULLET",
  [DocumentApp.GlyphType.NUMBER]: "NUMBER",
  [DocumentApp.GlyphType.LATIN_UPPER]: "LATIN_UPPER",
  [DocumentApp.GlyphType.LATIN_LOWER]: "LATIN_LOWER",
  [DocumentApp.GlyphType.ROMAN_UPPER]: "ROMAN_UPPER",
  [DocumentApp.GlyphType.ROMAN_LOWER]: "ROMAN_LOWER"
};

const MARKDOWN_TO_DOCUMENT_GLYPH_TYPES = {
  "-": DocumentApp.GlyphType.BULLET,
  " -": DocumentApp.GlyphType.HOLLOW_BULLET,
  "  -": DocumentApp.GlyphType.SQUARE_BULLET,
  "*": DocumentApp.GlyphType.BULLET,
  " *": DocumentApp.GlyphType.HOLLOW_BULLET,
  "  *": DocumentApp.GlyphType.SQUARE_BULLET,
  "1": DocumentApp.GlyphType.NUMBER,
  "A": DocumentApp.GlyphType.LATIN_UPPER,
  "a": DocumentApp.GlyphType.LATIN_LOWER,
  "I": DocumentApp.GlyphType.ROMAN_UPPER,
  "i": DocumentApp.GlyphType.ROMAN_LOWER
};
const MARKDOWN_TO_DOCUMENT_GLYPH_TYPES_PRINTABLE = {
  "-": "BULLET",
  " -": "HOLLOW_BULLET",
  "  -": "SQUARE_BULLET",
  "*": "BULLET",
  " *": "HOLLOW_BULLET",
  "  *": "SQUARE_BULLET",
  "1": "NUMBER",
  "A": "LATIN_UPPER",
  "a": "LATIN_LOWER",
  "I": "ROMAN_UPPER",
  "i": "ROMAN_LOWER"
};


const MARKDOWN_TO_DOCUMENT = {
  "#": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.HEADING1 },
  "##": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.HEADING2 },
  "###": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.HEADING3 },
  "####": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.HEADING4 },
  "#####": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.HEADING5 },
  "######": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.HEADING6 },
  "P": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.NORMAL }, // paragraph 
  "U": { [DocumentApp.Attribute.HEADING]: DocumentApp.ParagraphHeading.NORMAL }, // unknown
  "-": { [DocumentApp.Attribute.GLYPH_TYPE]: DocumentApp.GlyphType.BULLET },
  "*": { [DocumentApp.Attribute.GLYPH_TYPE]: DocumentApp.GlyphType.BULLET },
  "1": { [DocumentApp.Attribute.GLYPH_TYPE]: DocumentApp.GlyphType.NUMBER },
  "A": { [DocumentApp.Attribute.GLYPH_TYPE]: DocumentApp.GlyphType.LATIN_UPPER },
  "a": { [DocumentApp.Attribute.GLYPH_TYPE]: DocumentApp.GlyphType.LATIN_LOWER },
  "i": { [DocumentApp.Attribute.GLYPH_TYPE]: DocumentApp.GlyphType.ROMAN_LOWER },
  "~~": { [DocumentApp.Attribute.STRIKETHROUGH]: true },
  "**": { [DocumentApp.Attribute.BOLD]: true },
  "*": { [DocumentApp.Attribute.ITALIC]: true },
  "_": { [DocumentApp.Attribute.UNDERLINE]: true }
};

const DOCUMENT_FORMAT_TO_MARKEDOWN = {
  [DocumentApp.ParagraphHeading.HEADING1]: "# ",
  [DocumentApp.ParagraphHeading.HEADING2]: "## ",
  [DocumentApp.ParagraphHeading.HEADING3]: "### ",
  [DocumentApp.ParagraphHeading.HEADING4]: "#### ",
  [DocumentApp.ParagraphHeading.HEADING5]: "##### ",
  [DocumentApp.ParagraphHeading.HEADING6]: "###### ",
  [DocumentApp.ParagraphHeading.NORMAL]: "",
  [DocumentApp.GlyphType.BULLET]: "* ",
  [DocumentApp.GlyphType.NUMBER]: "1. ",
  [DocumentApp.GlyphType.LATIN_LOWER]: "a ",
  [DocumentApp.GlyphType.LATIN_UPPER]: "A ",
  [DocumentApp.GlyphType.ROMAN_LOWER]: "i ",
  [DocumentApp.GlyphType.ROMAN_LOWER]: "I ",
  [DocumentApp.Attribute.BOLD]: ""
};

const DOCUMENT_ATTRIBUTE = {
  [DocumentApp.Attribute.BACKGROUND_COLOR]: "BACKGROUND_COLOR",
  [DocumentApp.Attribute.BOLD]: "BOLD",
  [DocumentApp.Attribute.BORDER_COLOR]: "BORDER_COLOR",
  [DocumentApp.Attribute.BORDER_WIDTH]: "BORDER_WIDTH",
  [DocumentApp.Attribute.CODE]: "CODE",
  [DocumentApp.Attribute.FONT_FAMILY]: "FONT_FAMILY",
  [DocumentApp.Attribute.FONT_SIZE]: "FONT_SIZE",
  [DocumentApp.Attribute.FOREGROUND_COLOR]: "FOREGROUND_COLOR",
  [DocumentApp.Attribute.HEADING]: "HEADING",
  [DocumentApp.Attribute.HEIGHT]: "HEIGHT",
  [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]: "HORIZONTAL_ALIGNMENT",
  [DocumentApp.Attribute.INDENT_END]: "INDENT_END",
  [DocumentApp.Attribute.INDENT_FIRST_LINE]: "INDENT_FIRST_LINE",
  [DocumentApp.Attribute.INDENT_START]: "INDENT_START",
  [DocumentApp.Attribute.ITALIC]: "ITALIC",
  [DocumentApp.Attribute.GLYPH_TYPE]: "GLYPH_TYPE",
  [DocumentApp.Attribute.LEFT_TO_RIGHT]: "LEFT_TO_RIGHT",
  [DocumentApp.Attribute.LINE_SPACING]: "LINE_SPACING",
  [DocumentApp.Attribute.LINK_URL]: "LINK_URL",
  [DocumentApp.Attribute.LIST_ID]: "LIST_ID",
  [DocumentApp.Attribute.MARGIN_BOTTOM]: "MARGIN_BOTTOM",
  [DocumentApp.Attribute.MARGIN_LEFT]: "MARGIN_LEFT",
  [DocumentApp.Attribute.MARGIN_RIGHT]: "MARGIN_RIGHT",
  [DocumentApp.Attribute.MARGIN_TOP]: "MARGIN_TOP",
  [DocumentApp.Attribute.NESTING_LEVEL]: "NESTING_LEVEL",
  [DocumentApp.Attribute.MINIMUM_HEIGHT]: "MINIMUM_HEIGHT",
  [DocumentApp.Attribute.PADDING_BOTTOM]: "PADDING_BOTTOM",
  [DocumentApp.Attribute.PADDING_LEFT]: "PADDING_LEFT",
  [DocumentApp.Attribute.PADDING_RIGHT]: "PADDING_RIGHT",
  [DocumentApp.Attribute.PADDING_TOP]: "PADDING_TOP",
  [DocumentApp.Attribute.PAGE_HEIGHT]: "PAGE_HEIGHT",
  [DocumentApp.Attribute.PAGE_WIDTH]: "PAGE_WIDTH",
  [DocumentApp.Attribute.SPACING_AFTER]: "SPACING_AFTER",
  [DocumentApp.Attribute.SPACING_BEFORE]: "SPACING_BEFORE",
  [DocumentApp.Attribute.STRIKETHROUGH]: "STRIKETHROUGH",
  [DocumentApp.Attribute.UNDERLINE]: "UNDERLINE",
  [DocumentApp.Attribute.VERTICAL_ALIGNMENT]: "VERTICAL_ALIGNMENT",
  [DocumentApp.Attribute.WIDTH]: "WIDTH"
}



/**
 * This file contains a number of different classs.
 * S6DocumentAdapater is a super class. With a sub class for each Google document type.
 * S6DocsAdapater - Documents
 * S6SlidesAdapater - Slides
 * S6SheetAdapater - Sheets
 * 
 * Each class provide a standard interface for inserting and replacing text. This is necessary as ecah document type implements insert and replace functionality differently.  
 * 
 * 
 */

/**
 * Super class
 */
class S6DocumentAdapater {

  constructor(file) {
    this._file = file;
    let type = S6Utility.getGoogleDocTypeFromURL(file.getUrl());
    switch (type) {
      case GOOGLE_FILE_TYPE_DOC_NAME:
        this._doc = DocumentApp.openById(file.getId());
        break;
      case GOOGLE_FILE_TYPE_SLIDE_NAME:
        this._doc = SlidesApp.openById(file.getId());
        break;
      case GOOGLE_FILE_TYPE_SPREADSHEET_NAME:
        this._doc = SpreadsheetApp.openById(file.getId());
        break;
      case GOOGLE_FILE_TYPE_FORM_NAME:
        this._doc = FormApp.openById(file.getId());
        break
      default:
        throw "Unknown document type " + type;
    }
  }

  replace(thisText, withThatText, link, color) {
    throw "Methods needs to be implemented";
  }

  replaceImage(text, image) {
    throw "Methods needs to be implemented";
  }

  insert(thisText, color, link) {
    throw "Methods needs to be implemented";
  }


  docProperties() {
    return [];
  }


  /**
   * Factory method to create the correct subclass version of this class. 
   */
  static create(docId, doc) {
    console.log("S6DocumentAdapater.create(", docId, ")");
    var res;
    if (!doc) {
      doc = DriveApp.getFileById(docId);
    }
    let type = S6Utility.getGoogleDocTypeFromURL(doc.getUrl());

    switch (type) {
      case GOOGLE_FILE_TYPE_DOC_NAME:
        res = new S6DocsAdapater(doc);
        break;
      case GOOGLE_FILE_TYPE_SLIDE_NAME:
        res = new S6SlidesAdapater(doc);
        break;
      case GOOGLE_FILE_TYPE_SPREADSHEET_NAME:
        res = new S6SheetsAdapater(doc);
        break;
      case GOOGLE_FILE_TYPE_FORM_NAME:
        throw "Document type not supported " + type;
        break
      default:
        throw "Unknown document type " + type;
    }
    return res;
  }
}

class S6DocsAdapater extends S6DocumentAdapater {

  getReadyToInsert(input) {
    let line = EMPTY;
    let key = EMPTY;
    let listItemNumber = EMPTY;
    // Replace the entire input string with the first part of the string up to the first space
    var work = input.replace(/^([^\s]+)\s.*$/, "$1")
    // Check if the first part is a number and replace it with "1"
    // otherwise check if the first part starts with a letter of the alphabet and replace it with "P"
    // otherwise return the original string
    key = (isFinite(work.replace(/\s.*$/, ""))) ? "1" : (work.match(/^[a-zA-Z]/) ? "P" : work);
    //key = (isFinite(work.replace(/\s.*$/, ""))) ? work.replace(/\s.*$/, "") : (work.match(/^[a-zA-Z]/) ? "P" : work);

    if (key === "1") {
      var match = input.match(/^\D*(\d+)/);
      listItemNumber = match ? match[1] : '';
    }

    if (key === "P") {
      line = input;
    }
    else {
      line = input.replace(/^\S*\s/, '');
    }

    if (!MARKDOWN_TO_DOCUMENT[key]) {
      key = "P";
      line = input;
    }
    var res = { key, line, listItemNumber };
    S6Context.debugFn("getReadyToInsert", res);
    return res;
  }


  /**
  * Converts markdown-style formatting in the input text to corresponding formatting in a Google Document represented by the input element.
  * The markdown styles that are supported are bold, italic, and underlined.
  * @param {GoogleAppsScript.Document.Text} element - A Google Docs Text object.
  * @param {string} text - The text to be converted from markdown to Google Docs formatting.
  * @param {number} [iteration=0] - An optional parameter that indicates the current iteration of the conversion process. Default is 0.
  */
  _markdown2DocText(element) {
    const asText = element.editAsText();
    const text = asText.getText();
    const pattern = /(\*\*\*|___|\*\*|__|\*_|_\*|\*|_|_)(.*?)\1/g;
    const matches = text.match(pattern) || []; // Get an array of all matches

    for (const match of matches) {
      // Remove markdown formatting from the matched text
      const textWithoutMarkdown = match.replace(pattern, '$2');

      // Calculate the start and end offsets of the matched text
      const startIndex = text.indexOf(match);
      const endIndex = startIndex + textWithoutMarkdown.length;

      // Get the correct attribute for the markdown style
      const markdownStyle = match.match(pattern)[0];
      const attributes = MARKDOWN_TO_DOCUMENT[markdownStyle];

      // Replace the original text with the modified text
      asText.replaceText(match, textWithoutMarkdown);
      // Set the attributes on the text element
      asText.setAttributes(startIndex, endIndex, attributes);
    }
  }
  _getElementToInsertAfter(searchText, body) {
    console.log("_getElementToInsertAfter", searchText, searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    var searchResult = body.findText(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    var targetParent = null;
    var targetIndex = null;
    var asText = null;

    if (searchResult) {
      var element = searchResult.getElement();
      var parent = element.getParent();
      var elementType = parent.getType();

      if (elementType === DocumentApp.ElementType.PARAGRAPH) {
        var paragraph = parent.asParagraph();
        var sibling = paragraph.getNextSibling();
        targetParent = paragraph.getParent();
        targetIndex = targetParent.getChildIndex(sibling || paragraph);
        asText = paragraph.editAsText();
      }
      else if (elementType === DocumentApp.ElementType.LIST_ITEM) {
        var listItem = parent.asListItem();
        var sibling = listItem.getNextSibling();
        targetParent = listItem.getParent();
        targetIndex = targetParent.getChildIndex(sibling || listItem) + 1;
        asText = listItem.editAsText();
      }
      else if (elementType === DocumentApp.ElementType.TABLE_CELL) {
        var tableCell = parent.asTableCell();
        asText = tableCell.editAsText();
        targetParent = tableCell;
        targetIndex = tableCell.getNumChildren();
      }
      else {
        // Unsupported element type
        console.log("Unsupported element type: " + elementType);
      }
    }
    else {
      console.log("Text not found in the document.");
    }
    console.log(`Found Element type: ${elementType}`);
    return { parent: targetParent, index: targetIndex, asText: asText };
  }


  mergeMarkdown(text, body, childIndex = 0, markdown, color, listItemNumber = EMPTY) {
    let newElement = null;
    switch (markdown) {
      case "#":
      case "##":
      case "###":
      case "####":
      case "#####":
      case "######":
      case "P":
      case "U":
        console.log("insertParagraph", markdown, text);
        newElement = body.insertParagraph(childIndex, "");
        //newElement = body.appendParagraph(text);
        newElement.editAsText().setText(text);
        newElement.setAttributes(this._getAttributes(markdown));
        this._formatText(newElement.editAsText());
        if (color) {
          newElement.setBackgroundColor(color);
        };
        break;
      case "-":
      case "*":
      case " *":
      case "  *":
      case "1":
      case "A":
      case "a":
      case "I":
      case "i":
        newElement = body.insertListItem(childIndex, listItemNumber);
        //newElement = body.appendListItem(text);
        newElement.editAsText().setText(text);
        var glyph = MARKDOWN_TO_DOCUMENT_GLYPH_TYPES[markdown];
        console.log("insertListItem, markdown, text, glyph", markdown, text, MARKDOWN_TO_DOCUMENT_GLYPH_TYPES_PRINTABLE[markdown]);
        newElement.setGlyphType(glyph);
        this._formatText(newElement.editAsText());
        if (color) {
          newElement.setBackgroundColor(color);
        }
        break;
      default:
        // newElement = body.insertParagraph(childIndex, "");
        // newElement.setAttributes(DocumentApp.ParagraphHeading.NORMAL);
        console.error('Unknown element markedown: ', markdown, text);
    }
  }

  _getAttributes(markdown) {
    if (markdown in MARKDOWN_TO_DOCUMENT) {
      return MARKDOWN_TO_DOCUMENT[markdown];
    }
    else {
      return {};
    }
  }

  /**
   * Finds the formatting options for the text immediately following a Markdown markup symbol.
   * @param {number} index - The current index of the Markdown markup symbol in the `textArr` array.
   * @param {Array} textArr - An array of text fragments and markup ranges created by splitting the input text using a regular expression.
   * @returns {Object} An object containing the index of the next text fragment, an array of formatting options, and the number of array elements skipped to find the next text fragment.
   */
  _findFormats(index, textArr) {
    var formats = []
    var inIndex = index;

    // Loop through the `textArr` array to find the next text fragment and its formatting options
    for (let f = 0; index < textArr.length; index++) {
      if (MARKDOWN_TO_DOCUMENT[textArr[index]]) {
        formats[f++] = MARKDOWN_TO_DOCUMENT[textArr[index]];
      }
      // If the next array element is not a formatting option, it is the next text fragment, so break out of the loop
      else if (textArr[index] != EMPTY) {
        break;
      }
    }

    // Calculate the number of array elements skipped to find the next text fragment
    const indexDiff = index - inIndex;

    // Return an object containing the index of the next text fragment, the formatting options, and the number of skipped array elements
    return { index, formats, indexDiff };
  }

  /**
   * Formats a Text object containing Markdown markup using the Google Docs API.
   *
   * @param {Text} text - The Text object to format.
   * @returns {Text} A new Text object with the Markdown markup replaced with Google Docs formatting.
   */
  _formatText(text) {
    // Get the input text from the provided Text object
    const input = text.getText();

    // Define a regular expression to match Markdown markup (bold, italic, underline.) and split the input text into an array of text fragments and markup ranges
    // Also ignore escape mardown characters eg \*
    const markupRegex = /(?<!\\)(\*\*|\_\_|\*|\_|\~\~)(?!\\)/g;
    const textArr = input.split(markupRegex);

    // Initialize variables to hold the formatted text and ranges
    let newText = '';
    let ranges = [];

    // Loop through the text fragments and markup ranges to build the formatted text and range data
    let index = 0;
    while (index < textArr.length) {
      let str = '';
      const next = textArr[index];

      // If the current text fragment is Markdown markup, find the formatting options and apply them to the previous text fragment
      if (MARKDOWN_TO_DOCUMENT[next]) {
        const find = this._findFormats(index, textArr);
        index = find.index;

        // Get the text fragment that immediately follows the Markdown markup and escape any Markdown markup symbols that should be treated as literal characters
        str = textArr[index++];
        str = str.replace(/\\([\*\_])/g, '$1');

        // Add the text fragment to the formatted text and store the formatting options and range data in the `ranges` array
        const start = newText.length;
        newText += str;
        const end = newText.length - 1;
        index += find.indexDiff;
        const formats = find.formats;
        for (let f = 0; f < formats.length; f++) {
          ranges.push({ start, end, format: formats[f], str });
        }
      }
      // If the current text fragment is not Markdown markup, add it to the formatted text without any formatting options
      else {
        newText += next;
        index++;
      }
    }

    // Update the original Text object with the formatted text
    text.setText(newText);

    // Apply the formatting options to the appropriate ranges of text in the original Text object
    for (let i = 0; i < ranges.length; i++) {
      text.setAttributes(ranges[i].start, ranges[i].end, ranges[i].format);
    }

    // Return the formatted Text object
    return text;
  }

  parseTextInPlace(replace, text, color = null) {
    const body = this._doc.getBody();
    const after = this._getElementToInsertAfter(replace, body)

    const lines = text.split("\n");

    for (let i = lines.length - 1; i >= 0; i--) {
      let item = lines[i].trim();
      if (item === "") {
        //this.mergeMarkdown("", after.parent, after.index, "P", color);
      }
      else {
        var { key, line, listItemNumber } = this.getReadyToInsert(item);
        this.mergeMarkdown(line, after.parent, after.index, key, color, listItemNumber);
      }
    }
    this.replace(replace, EMPTY);
    this.unselect();
  }


  parseText2Document(text, replaceSelected = true, color = null) {
    const lines = text.split("\n");

    var { location, childIndex } = this._findSelectedElementLocation2(this._doc);

    for (let i = lines.length - 1; i >= 0; i--) {
      let item = lines[i].trim();
      if (item === EMPTY) {
        //this.mergeMarkdown("", body, childIndex, "P", color);
      }
      else {
        var { key, line, listItemNumber } = this.getReadyToInsert(item);
        if (line.trim() != EMPTY) {
          this.mergeMarkdown(line, location, childIndex + 1, key, color, listItemNumber);
        }
      }
    }
    this.unselect();

  }

  _getMarkDown(element, nextNumberItem) {
    let markup = EMPTY;
    const attrs = element.getAttributes();

    if (element.getType() === DocumentApp.ElementType.LIST_ITEM) {

      S6Context.debugFn("Attribute", DOCUMENT_FORMAT_TO_MARKEDOWN[attrs[DocumentApp.Attribute.GLYPH_TYPE]]);
      markup = DOCUMENT_FORMAT_TO_MARKEDOWN[attrs[DocumentApp.Attribute.GLYPH_TYPE]];
      if (attrs[DocumentApp.Attribute.GLYPH_TYPE] === DocumentApp.GlyphType.NUMBER) {
        markup = `${nextNumberItem++}. `;
      }
    }
    else if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
      S6Context.debugFn("Attribute", DOCUMENT_FORMAT_TO_MARKEDOWN[attrs[DocumentApp.Attribute.HEADING]]);
      markup = DOCUMENT_FORMAT_TO_MARKEDOWN[attrs[DocumentApp.Attribute.HEADING]];
      nextNumberItem = 1;
    }
    else {
      nextNumberItem = 1;
    }
    S6Context.debugFn("_getMarkDown", markup);
    return { markup, nextNumberItem }
  }



  getSelectedText(withMarkdown = false) {
    let res = EMPTY;
    const selection = this._doc.getSelection();
    let numberItem = 1;
    let markupPrefix = EMPTY;
    if (selection) {
      const elements = selection.getSelectedElements();
      for (let i = 0; i < elements.length; ++i) {
        const rangeElement = elements[i];
        const element = rangeElement.getElement();

        if (withMarkdown) {
          var { markup, nextNumberItem } = this._getMarkDown(element, numberItem);
          numberItem = nextNumberItem;
          markupPrefix = markup;
          res = res + markupPrefix + this._textToMarkdown(element.editAsText(), element.getText(), rangeElement) + "\n";
        }

      }
    }
    return res;
  }


  /**
   * Converts the formatted text within a TextElement to Markdown format.
   *
   * @param {TextElement} textElement - The TextElement to convert to Markdown.
   * @param {string} text - The plain text contents of the TextElement.
   * @param {RangeElement|null} rangeElement - The optional RangeElement indicating a subset of the text to format.
   * @returns {string} The Markdown formatted text.
   */
  _textToMarkdown(textElement, text, rangeElement) {
    // Initialize variables to hold the formatted text and the start index of the next unformatted text fragment
    console.log("_textToMarkdown, text", text);
    let markdown = '';
    let startIndex = 0;

    // Get the indices of the selected subset of text, if a RangeElement is provided
    let rangeStart = 0;
    let rangeEnd = text.length - 1;
    console.log("_textToMarkdown, rangeElement", rangeElement.isPartial(), rangeElement.getStartOffset(), rangeElement.getEndOffsetInclusive());
    if (rangeElement && rangeElement.isPartial()) {
      rangeStart = rangeElement.getStartOffset();
      rangeEnd = rangeElement.getEndOffsetInclusive();
    }

    // Get the indices at which text formatting changes
    const indices = textElement.getTextAttributeIndices();
    console.log("_textToMarkdown, indices", indices);

    // Loop through the paragraph, checking the formatting of each range of text
    for (let i = 0; i < indices.length; i++) {
      // Get the start and end indices of the current range of text
      startIndex = indices[i];
      const endIndex = (i === indices.length - 1) ? text.length - 1 : indices[i + 1] - 1;
      console.log("_textToMarkdown, startIndex, rangeStart, startIndex, endIndex", startIndex, rangeStart, startIndex, endIndex);

      // Check if the current range of text is within the selected subset of text, if a RangeElement is provided
      if (rangeElement && (startIndex > rangeEnd || endIndex < rangeStart)) {
        continue;
      }

      // Check if the current range of text is formatted with bold, italic, or underline formatting
      const bold = textElement.isBold(startIndex) === true;
      const italic = textElement.isItalic(startIndex) === true;
      const underline = textElement.isUnderline(startIndex) === true;
      const strikethrough = textElement.isStrikethrough(startIndex) === true;
      console.log("_textToMarkdown,startIndex, bold, italic, underline, strikethrough", startIndex, bold, italic, underline, strikethrough);

      // If the current range of text is not formatted, add it to the formatted text as plain text
      // if (!bold && !italic && !underline) {
      //   const plainText = text.substring(startIndex, endIndex + 1);
      //   markdown += plainText;
      // } else {
      // If the current range of text is formatted, add the Markdown markup to the formatted text
      const markupStart = `${bold ? "**" : ""}${italic ? "*" : ""}${underline ? "_" : ""}${strikethrough ? "~~" : ""}`;
      const markupEnd = `${strikethrough ? "~~" : ""}${underline ? "_" : ""}${italic ? "*" : ""}${bold ? "**" : ""}`
      markdown += `${markupStart}${text.substring(startIndex, endIndex + 1)}${markupEnd}`;
      //}
    }

    console.log("_textToMarkdown,markdown", markdown);

    return markdown;
  }

  /**
   * _findSelectedElementLocation is a function that receives a google doc object and returns an object containing the child 
   * index of the selected element or the cursor position element in the document body and the body element. 
   * At the same time oif any text is select it is removed.
   * @param {DocumentApp.Document} doc - the google doc object
   * @returns {Object} - returns an object containing the child index of the selected element or the cursor position element in the document body and the body element
   */
  _findSelectedElementLocation(doc, replaceSelected = true) {
    let keepText = replaceSelected == false;
    let childIndex = -1;
    var element;
    let body = doc.getBody();
    console.log("Started _findSelectedElementLocation function...");
    var location; // initialize location variable

    try {
      var range = doc.getSelection();
      if (!range) throw new Error("No selection range found");
      console.log("Range selected...");

      var rangeElements = range.getRangeElements();
      var rangeElement = rangeElements[0];
      if (!rangeElement) throw new Error("No range element found");
      console.log("First range element selected...");

      element = rangeElement.getElement();
      console.log("Element assigned...");

      if (rangeElement.isPartial()) {
        console.log("Range element is partial...");
        if (replaceSelected && element.asText) {
          console.log("Deleting selected text...");
          replaceSelected = false;
          element.asText().deleteText(rangeElement.getStartOffset(), rangeElement.getEndOffsetInclusive());
        }
      }
      if (element.getType() == DocumentApp.ElementType.TABLE_CELL) {
        console.log("Element is a Table Cell...");
        location = element; // assign the table cell to the location
        let tableRow = element.getParent();
        let table = tableRow.getParent();
        childIndex = body.getChildIndex(table);
        console.log("Table Index in the body: ", childIndex);
      } else {
        location = body; // if not a table cell, location is the body
      }
      if (replaceSelected && element.getType() != DocumentApp.ElementType.TABLE_CELL) {
        console.log("Finding selected child index and removing elements...");
        childIndex = this._findSelectedChildIndex(rangeElements, doc, body, false);
        for (let r = 0; r < rangeElements.length; r++) {
          const nextElement = rangeElements[r].getElement();
          console.log("Removing element ", r);
          nextElement.removeFromParent();
        }
      }
      if (keepText) {
        console.log("Keeping text and finding selected child index...");
        if (rangeElements) {
          childIndex = this._findSelectedChildIndex(rangeElements, doc, body, true);
        }
      }
    }
    catch (err) {
      console.error("Error: ", err.message);
    }
    childIndex = childIndex == -1 ? 0 : childIndex;
    console.log("Final child index: ", childIndex);
    return { childIndex, location }; // return an object containing the child index and the location
  }

  unselect() {
    var doc = this._doc;
    var range = doc.getSelection();

    // If there's no selection, there's nothing to unselect
    if (!range) return;

    var rangeElements = range.getRangeElements();
    var rangeElement = rangeElements[rangeElements.length - 1];

    // If the range is not partial, the whole element is selected and we can just use it
    var element = rangeElement.isPartial() ? rangeElement.getElement().asText() : rangeElement.getElement().editAsText();
    var endOffset = rangeElement.getEndOffsetInclusive(); // get end offset of selection

    // Insert a space at the end of the selection, move the cursor to the space, then delete the space
    element.insertText(endOffset + 1, " ");
    var rangeBuilder = doc.newRange();
    rangeBuilder.addElement(element, endOffset + 1, endOffset + 1);
    doc.setSelection(rangeBuilder.build());
    element.deleteText(endOffset + 1, endOffset + 1);
  }

  _findSelectedElementLocation2(doc) {
    console.log("_findSelectedElementLocation2");

    // Open the document
    var body = doc.getBody();
    console.log("Document opened and body retrieved");

    // Initialize variables
    var childIndex = -1;
    var element;
    var location;

    try {
      console.log("Attempting to get the selected range...");

      // Attempt to get the selected range
      var range = doc.getSelection();
      let element;
      var partial = false;
      if (!range) {
        console.log("No Range found. Getting cursor");
        var pos = doc.getCursor();
        element = pos.getElement();
      }
      else if (range) {
        console.log("Range found. Getting the first range element...");

        // Get the first range element
        var rangeElements = range.getRangeElements();
        var rangeElement = rangeElements[rangeElements.length - 1];
        if (!rangeElement) throw new Error("No range element found");

        console.log("Range element found. Getting the selected element...");

        // Get the selected element
        element = rangeElement.getElement();
        partial = rangeElement.isPartial()
      }


      console.log("Selected element found. Checking if the element is a table cell...");

      // Traverse up the parent hierarchy until we either find a table cell or reach the body
      var parent = element.getParent();
      while (parent && parent.getType() != DocumentApp.ElementType.TABLE_CELL && parent.getType() != DocumentApp.ElementType.BODY_SECTION) {
        element = parent;
        parent = element.getParent();
      }

      // Check if we found a table cell
      if (parent.getType() == DocumentApp.ElementType.TABLE_CELL) {
        console.log("Element is a table cell.");
        location = parent; // Assign the table cell to the location
        // let tableRow = location.getParent();
        // let table = tableRow.getParent();
        childIndex = parent.getChildIndex(element);
        console.log("Table index in the body: " + childIndex);
      } else {
        console.log("Element is not a table cell. Location is the body.");
        location = body; // If not a table cell, location is the body
        childIndex = body.getChildIndex(element);
        console.log("Element index in the body: " + childIndex, partial);

        // Check if the element has a next sibling
        if (parent.getNumChildren() > childIndex + 1) {
          childIndex = childIndex + 1;
          console.log("Next sibling element index in the body: " + childIndex);
        } else {
          console.log("No next sibling found in the body for the selected element");
        }
      }
    }
    catch (err) {
      console.error("Error: ", err.message);
    }

    // Return an object containing the child index and the location
    console.log("Returning child index and location...", childIndex, location);
    return { childIndex, location };
  }



  /**
 * Finds the child index of the first BODY_SECTION element in a range of elements.
 * 
 * @param {Array<RangeElement>} rangeElements - An array of range elements.
 * @param {Document} doc - The document containing the range elements.
 * @param {Body} body - The document body.
 * @param {boolean} [reverse=true] - Whether to loop through the range elements backwards. Defaults to true.
 * @returns {number} The index of the first BODY_SECTION element, or the index where a new paragraph was appended if no BODY_SECTION element was found.
 */
  _findSelectedChildIndex(rangeElements, doc, body, reverse = true) {
    let childIndex = -1;

    // Determine the loop start, end, and step based on the 'reverse' parameter
    const start = reverse ? rangeElements.length - 1 : 0;
    const end = reverse ? -1 : rangeElements.length;
    const step = reverse ? -1 : 1;

    // Loop through the range elements and find the first BODY_SECTION element
    for (let r = start; r !== end; r += step) {
      const nextElement = rangeElements[r].getElement();
      S6Context.debugFn("_findSelectedElementLocation 1 e", DOCUMENT_ELEMENT_TYPES[nextElement.getType()]);
      if (nextElement.getType() == DocumentApp.ElementType.BODY_SECTION ||
        nextElement.getType() == DocumentApp.ElementType.TABLE_CELL) {
        // If a BODY_SECTION element is found, set the cursor position and calculate the child index
        var pos = doc.newPosition(nextElement, 0);
        doc.setCursor(pos);
        childIndex = body.getChildIndex(nextElement) + r + 1;
        S6Context.debugFn("_findSelectedElementLocation 1 parent found", childIndex);
        break;
      }
    }

    // If no BODY_SECTION element was found, find the first parent BODY_SECTION element
    if (childIndex == -1) {
      let nextElement = rangeElements[reverse ? rangeElements.length - 1 : 0].getElement();
      let nextParent = nextElement;
      while (nextParent) {
        S6Context.debugFn("_findSelectedElementLocation 2 e", DOCUMENT_ELEMENT_TYPES[nextElement.getType()], "p", DOCUMENT_ELEMENT_TYPES[nextParent.getType()]);
        if (nextParent.getType() == DocumentApp.ElementType.BODY_SECTION) {
          break;
        }
        nextElement = nextParent;
        nextParent = nextElement.getParent();
      }
      if (nextParent) {
        childIndex = body.getChildIndex(nextElement) + 1;
        S6Context.debugFn("_findSelectedElementLocation 2 parent found", childIndex);
      }
    }

    // If no parent BODY_SECTION element was found, append a new paragraph to the body and get its child index
    if (childIndex == -1) {
      S6Context.debugFn("_findSelectedElementLocation2", "childIndex not valid", childIndex);
      var p = body.appendParagraph("");
      childIndex = body.getChildIndex(p);
    }

    // Return the child index
    return childIndex;
  }

  applyBoilerplate(bolierplateDoc, headersAndFooters = false) {
    var doc = this._doc;
    var res = true;

    try {

      var { location, childIndex } = this._findSelectedElementLocation2(doc);
      S6Context.debug("applyBoilerplate at:", childIndex);

      console.log("Merge in Body");
      this._loopElements(bolierplateDoc.getBody(), location, childIndex);

      S6Context.debug("applyBoilerplate headersAndFooters:", headersAndFooters);
      if (headersAndFooters) {
        var footer = doc.getFooter();
        var header = doc.getHeader();
        if (!footer && bolierplateDoc.getFooter()) {
          footer = doc.addFooter();
        }
        if (bolierplateDoc.getFooter()) {
          console.log("Merge in Footer");
          this._loopElements(bolierplateDoc.getFooter().copy(), footer);
        }
        if (!header && bolierplateDoc.getHeader()) {
          header = doc.addHeader();
        }
        if (bolierplateDoc.getHeader()) {
          console.log("Merge in Header");
          this._loopElements(bolierplateDoc.getHeader().copy(), header);
        }
      }
    }
    catch (err) {
      res = false;
      S6Context.error(err.stack);
      S6Context.error(err);
    }
    return res;
  }

  _loopElements(parent, base, childIndex = 0) {
    if (parent) {
      var totalElements = parent.getNumChildren();
      S6Context.trace("_loopElements:total:", totalElements);
      for (var j = totalElements - 1; j > -1; j--) {
        S6Context.trace("_loopElements:next", j);
        this._mergeElements(parent.getChild(j).copy(), base, childIndex);
      }
    }
    else {
      S6Context.debug("skip _loopElements, no parent");
    }
  }

  _mergeElements(element, base, childIndex = 0) {
    var type = element.getType();
    if (base) {
      console.log("Merge type:", DOCUMENT_ELEMENT_TYPES[type]);
      if (type == DocumentApp.ElementType.PARAGRAPH) {
        base.insertParagraph(childIndex, element);
        //base.appendParagraph(element);
      }
      else if (type == DocumentApp.ElementType.TABLE) {
        base.insertTable(childIndex, element)
        //base.appendTable(element);
      }
      else if (type == DocumentApp.ElementType.LIST_ITEM) {
        var glyph = element.getGlyphType();// the glyph sometimes get dropped, so capture it and then apply it again after 
        var li = base.insertListItem(childIndex, element);
        li.setGlyphType(glyph);
      }
      else if (type == DocumentApp.ElementType.PAGE_BREAK) {
        base.insertPageBreak(childIndex);
        //base.appendPageBreak();
      }
      else if (type == DocumentApp.ElementType.HORIZONTAL_RULE) {
        base.insertHorizontalRule(childIndex);
        //base.appendHorizontalRule();
      }
      else if (type == DocumentApp.ElementType.INLINE_IMAGE) {
        // var guid = S6Utility.makePseudoGuid(12);
        // this._replacedImages[guid] = element;
        // base.insertParagraph(childIndex, guid);
        base.insertImage(childIndex, element);
        // base.appendImage(element);
      }
      else if (type == DocumentApp.ElementType.INLINE_DRAWING) {
        //base.appendImage(element);
      }
      // else if (type == DocumentApp.ElementType.FOOTNOTE) {
      //   base.appendFootnote(element);
      // }
      else if (type == DocumentApp.ElementType.FOOTER_SECTION) {
        var f = element.asFooterSection();
        this._loopElements(f, base, childIndex)
      }

      else if (type == DocumentApp.ElementType.HEADER_SECTION) {
        var h = element.asHeaderSection();
        this._loopElements(h, base, childIndex)
      }
    }
    else {
      S6Context.error("_mergeElements, no base", childIndex, type)
    }
  }

  replaceImage(text, image) {
    S6Context.debug("replaceTextToImage", text);
    //body.replaceText(thisText, withThatText);
    var next;
    var p = this._doc.getBody().getParent();
    // let's loop through all the child elements in the document
    for (var i = 0; i < p.getNumChildren(); i++) {
      var t = p.getChild(i).getType();
      if (t === DocumentApp.ElementType.BODY_SECTION) {
        var object = p.getChild(i).asBody();
        do {
          console.log("body", i);
          next = this._replaceTextToImage(object, text, image, 55);
        }
        while (next);
      }
      if (t === DocumentApp.ElementType.HEADER_SECTION) {

        var object = p.getChild(i).asHeaderSection();
        do {
          console.log("header", 1);
          next = this._replaceTextToImage(object, text, image, 55);
        }
        while (next);
      }
      else if (t === DocumentApp.ElementType.FOOTER_SECTION) {

        var object = p.getChild(i).asFooterSection();
        do {
          console.log("footer", i);
          next = this._replaceTextToImage(object, text, image, 55);
        }
        while (next);
      }
    }
    var body = this._doc.getBody();

  }
  _replaceTextToImage(object, searchText, image, height) {
    var res = object.findText(searchText);
    if (res) {
      var e = res.getElement();
      var p = e.getParent();
      e.asText().replaceText(searchText, EMPTY);
      var cursor = this._doc.newPosition(e, res.getStartOffset());
      var newImage;
      if (cursor) {
        console.log("replace at curosr");
        newImage = cursor.insertInlineImage(image);
      }
      else {
        console.log("replace at para");
        newImage = p.asParagraph().insertInlineImage(0, image);
      }
      if (newImage) {
        var w = newImage.getWidth();
        var h = newImage.getHeight();
        newImage.setHeight(height);
        newImage.setWidth(height * w / h);
      }

    }
    return res;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  replace(thisText, withThatText, link = EMPTY, color) {
    //var body = this._doc.getBody();
    S6Context.debug("replace", thisText, "=>", withThatText);
    //body.replaceText(thisText, withThatText);
    //this._reColor(thisText);

    var p = this._doc.getBody().getParent();

    // let's loop through all the child elements in the document
    for (var i = 0; i < p.getNumChildren(); i++) {
      var t = p.getChild(i).getType();
      if (t === DocumentApp.ElementType.BODY_SECTION) {
        this._findReplaceAndLink(p.getChild(i).asBody(), thisText, withThatText, link, color);
      }
      if (t === DocumentApp.ElementType.HEADER_SECTION) {
        this._findReplaceAndLink(p.getChild(i).asHeaderSection(), thisText, withThatText, link, color);
        p.getChild(i).asHeaderSection().replaceText(S6Utility.escapeRegExp(thisText), withThatText);
      }
      else if (t === DocumentApp.ElementType.FOOTER_SECTION) {
        this._findReplaceAndLink(p.getChild(i).asFooterSection(), thisText, withThatText, link, color);
        p.getChild(i).asFooterSection().replaceText(S6Utility.escapeRegExp(thisText), withThatText);
      }

    }
  }
  /**
   * 
   * @param {Element} item 
   * @param {string} thisText 
   * @param {string} withThatText 
   * @param {strin} link - url
   */
  _findReplaceAndLink(item, thisText, withThatText, link = EMPTY, color) {
    var foundElement = item.findText(S6Utility.escapeRegExp(thisText));
    while (foundElement != null) {
      // Get the text object from the element
      var foundText = foundElement.getElement().asText();
      //S6Context.trace("Found / Text:", foundText.getText());

      // Where in the Element is the found text?
      var start = foundElement.getStartOffset();
      var end = foundElement.getEndOffsetInclusive();

      foundText.insertText(start, withThatText);
      if (link != EMPTY) {
        end = start + withThatText.length;
        S6Context.debug("Text:", thisText, ", start:", start, ", end:", end, ", withThatText:", withThatText, " link:", link);
        foundText.setLinkUrl(start, end, link);
        this._applyBackgroundColor(foundText, color, start, end);
        start = start + withThatText.length;
        foundText.deleteText(start, start + thisText.length - 1);
      }
      else {
        this._applyBackgroundColor(foundText, color, start, start + withThatText.length);
        S6Context.debug("Before / Text:", thisText, ", start:", start, ", end:", end, ", withThatText.length:", withThatText.length, ", thisText.length:", thisText.length);
        start = start + withThatText.length;
        end = start + thisText.length - 1;
        S6Context.debug("After / Text:", thisText, ", start:", start, ", end:", end, ", withThatText:", withThatText);

        foundText.deleteText(start, end);
      }
      // Find the next match
      foundElement = item.findText(S6Utility.escapeRegExp(thisText));// , foundElement);
    }
  }

  update(text, replaceSelected = false, color) {
    let res;
    S6Context.debugFn("doc.update", replaceSelected);
    var selection = this._doc.getSelection();
    if (selection) {
      var es = selection.getRangeElements();
      if (es && es.length > 0) {
        const last = es.length - 1;
        S6Context.trace("update doc cursuor:", last, es[0].getStartOffset(), es[0].getEndOffsetInclusive(), es[0].isPartial());
        var offset = es[last].getEndOffsetInclusive() == -1 ? 0 : es[last].getEndOffsetInclusive();
        this._doc.setCursor(this._doc.newPosition(es[last].getElement(), offset + 1));
        if (replaceSelected) {
          for (var e = 0; e < es.length; e++) {
            if (es[e].getElement()) {
              es[e].getElement().removeFromParent();
            }
          }
        }
      }
    }
    res = this.insert(text, color);
    if (!replaceSelected) {
      this.insert("\n");
    }
  }
  insert(thisText, color = null, link = EMPTY, del = true) {
    var res = false;
    var cursor = this._doc.getCursor();
    if (cursor) {
      S6Context.debug("insert text at cursor:", thisText);
      S6Context.debug("Cursor:" + cursor);
      S6Context.debug("Cursor.insertText:" + cursor.insertText);

      S6Context.time("Insert:" + thisText);
      var text = cursor.insertText(thisText);
      if (color) {
        text.setBackgroundColor(color);
      }

      if (text && link != EMPTY) {
        text.setLinkUrl(0, thisText.length - 1, link);
      }
      S6Context.timeEnd("Insert:" + thisText);
      res = true;
    }
    else {
      S6Context.debug("no cursor:", thisText);
      var sel = this._doc.getSelection();
      if (sel) {
        var es = sel.getRangeElements();
        if (del) {
          for (let i = 0; i < es.length; i++) {
            S6Context.time("Delete Insert:" + thisText);
            res = this._deleteAndInsert(es[i], thisText, 0, 0, false, color, link);
            S6Context.timeEnd("Delete Insert:" + thisText);
          }
        }
        else {
          var re = es[es.length - 1];
          var pos = re.isPartial() ? re.getEndOffsetInclusive() : 0;
          var text = re.getElement().editAsText().insertText(pos, thisText);
          if (color) {
            text.setBackgroundColor(color);
          }
        }
      }
      else {
        S6Context.warn("Unable to find position in document to insert into.")
      }
    }
    return res;
  }
  insertImage(image, repeat = false) {
    var res = false;
    var newImage;
    var cursor = this._doc.getCursor();
    if (cursor) {
      S6Context.debug("insert image at cursor");
      newImage = cursor.insertInlineImage(image);
      let height = 55;
      var w = newImage.getWidth();
      var h = newImage.getHeight();
      newImage.setHeight(height);
      newImage.setWidth(height * w / h);
    }
    else {
      S6Context.debug("no cursor");
      var sel = this._doc.getSelection();
      if (sel) {
        var es = sel.getRangeElements();
        for (let i = 0; i < es.length; i++) {
          S6Context.trace(es[i].getStartOffset(), es[i].getEndOffsetInclusive(), es[i].isPartial());
          if (es[i].isPartial()) {
            this._deleteAndInsert(es[i], "");
            this._doc.setCursor(this._doc.newPosition(es[i].getElement(), es[i].getStartOffset()));
          }
          else {
            this._doc.setCursor(this._doc.newPosition(es[i].getElement(), 0));
          }
          var cursor = this._doc.getCursor();
          newImage = cursor.insertInlineImage(image);
        }
      }
      else if (!repeat) {
        // this can happen when the user is at the end of the document and has slected the last paragraph marker. 
        this._deleteAndInsert(this._doc, getBody(), "");
        res = this.insertImage(image, true);

      }
    }
    if (newImage) {
      let height = 55;
      var w = newImage.getWidth();
      var h = newImage.getHeight();
      newImage.setHeight(height);
      newImage.setWidth(height * w / h);
    }
    return res;
  }
  docProperties() {
    var res = {
      [PROPERTIES.AUTOMATIC]: {},
      [PROPERTIES.STANDARD]: {}
    };

    var p = this._doc.getBody().getParent();
    // let's loop through all the child elements in the document
    for (var i = 0; i < p.getNumChildren(); i += 1) {
      var t = p.getChild(i).getType();
      if (t === DocumentApp.ElementType.BODY_SECTION) {
        this._nextAutomaticProperty(res, p.getChild(i).asBody());
      }
      else if (t === DocumentApp.ElementType.HEADER_SECTION) {
        this._nextAutomaticProperty(res, p.getChild(i).asHeaderSection());
      }
      else if (t === DocumentApp.ElementType.FOOTER_SECTION) {
        this._nextAutomaticProperty(res, p.getChild(i).asFooterSection());
      }
    }
    return res;
  }


  _reColor(text) {
    var p = this._doc.getBody().getParent();
    // let's loop through all the child elements in the document
    for (var i = 0; i < p.getNumChildren(); i += 1) {
      var t = p.getChild(i).getType();
      if (t === DocumentApp.ElementType.BODY_SECTION) {
        this._findNextAndReColor(text, p.getChild(i), color);
      }
      else if (t === DocumentApp.ElementType.HEADER_SECTION) {
        this._findNextAndReColor(text, p.getChild(i), color);
      }
      else if (t === DocumentApp.ElementType.FOOTER_SECTION) {
        this._findNextAndReColor(text, p.getChild(i), color);
      }
    }
  }
  _applyBackgroundColor(object, color, start = -1, end = -1) {
    var backGround = {};
    backGround[DocumentApp.Attribute.BACKGROUND_COLOR] = color;
    if (start != -1) {
      object.setAttributes(start, end, backGround);
    }
    else {
      object.setAttributes(backGround);
    }
  }

  _findNextAndReColor(text, object, color) {
    var range = object.asText().findText(text);;
    while (range) {
      if (range.isPartial()) {
        var endOffset = range.getEndOffsetInclusive();
        var startOffset = range.getStartOffset();
        this._applyBackgroundColor(range.getElement().asText(), color, startOffset, endOffset);
      }
      else {
        this._applyBackgroundColor(range.getElement().asText(), color);
      }
      range = object.asText().findText(text, range);
    }
  }



  _nextAutomaticProperty(res, body, range) {
    var reg = "{.+?}";
    //var reg = "?<={.+?(?=}";
    if (body) {
      var newRange = body.findText(reg, range);
      if (newRange) {
        var next = S6Utility.trim(newRange.getElement().asText().getText());
        console.log("NEXT", next);
        this._splitOutProps(res, next);
        this._nextAutomaticProperty(res, body, newRange);
      }
    }
  }

  _splitOutProps(props, text) {
    var split = text.split("{");
    for (var i = 0; i < split.length; i++) {
      var end = split[i].indexOf("}");
      if (end > -1) {
        var field = split[i].substring(0, end);
        var { title, value } = this._extractTitleAndValue(field);
        if (field.indexOf("#") > 0) {
          props[PROPERTIES.STANDARD][`{${title}}`] = { value: value, field: field, title: title };
        }
        else
          props[PROPERTIES.AUTOMATIC][`{${title}}`] = { value: value, field: field, title: title };
      }
    }
  }
  _extractTitleAndValue(str) {
    const index = str.indexOf(':');
    if (index === -1) {
      return { title: str, value: str };
    }
    const title = str.substring(0, index);
    const value = str.substring(index + 1);
    return { title, value };
  }

  _deleteAndInsert(e, thisText, start = 0, end = 0, isPartial = false, color, link = EMPTY) {
    var res = false;
    console.log("Text:", thisText, ", start:", start, ", end:", end, ", partial:", isPartial);

    // Check if the "e" variable is defined and not null
    if (e !== undefined && e !== null) {
      // Get the "editAsText", "removeFromParent", and "getElement" functions from the "e" object
      var func_editAsText = e.editAsText;
      var func_removeFromParent = e.removeFromParent;
      var func_getElement = e.getElement;

      // Check if the "editAsText" function exists and is a function
      if (func_editAsText && func_editAsText.toString().toLowerCase().includes("function")) {

        // Get the text of the element as a Text object
        var txt = e.editAsText();

        // Check if the "end" variable is greater than -1 (i.e. a valid end index has been specified)
        if (end > -1) {
          // Delete the text from the start index to the end index
          txt.deleteText(start, end);

          // Insert the new text at the start index
          var item = txt.insertText(start, thisText)

          // If the new text is not empty, set the background color and link (if specified)
          if (thisText.length > 0) {
            if (link != EMPTY) {
              txt.setLinkUrl(start, start + thisText.length - 1, link);
            }

            item.setBackgroundColor(start, (start + thisText.length - 1), color);

          }
        }
        else {
          // If the "end" variable is not a valid end index, check if the element has a next sibling element
          if (e.getNextSibling()) {
            // If the element has a next sibling, remove it from the parent element
            txt.removeFromParent();
          }
          else {
            // If the element does not have a next sibling, clear the element's content and insert the new text
            e.clear();
            txt.insertText(0, thisText).setBackgroundColor(color);

            // If a link is specified, set the link for the inserted text
            if (link != EMPTY) {
              txt.setLinkUrl(0, thisText.length, link);
            }
            // Set the cursor to the start of the inserted text
            this._doc.setCursor(this._doc.newPosition(txt, 0));
          }
        }
        // Set the return value to true
        res = true;
      }
      // Check if the "removeFromParent" function exists and is a function
      else if (func_removeFromParent && func_removeFromParent.toString().toLowerCase().includes("function")) {
        // Check if the element has a next sibling element
        if (e.getNextSibling()) {
          // If the element has a next sibling, remove it from the parent element
          e.removeFromParent();
        }
        else {
          // If the element does not have a next sibling, clear the element's content
          e.clear();
        }
        // Set the return value to true
        res = true;
      }
      // Check if the "getElement" function exists and is a function
      else if (func_getElement && func_getElement.toString().toLowerCase().includes("function")) {
        // Print a message to the console indicating that the "getElement" function is being used
        console.log("getElement");

        // Get the start and end offsets of the element
        var offset = e.getStartOffset();
        var endset = e.getEndOffsetInclusive();
        // Get the partial status of the element
        var p = e.isPartial();
        // Recursively call the deleteAndInsert function for the element returned by the "getElement" function, using the same input variables
        return this._deleteAndInsert(e.getElement(), thisText, offset, endset, p, color, link);
      }
      else {
        // If none of the above conditions are met, print the value of the "e" variable to the console
        console.log(e);
      }

    }
    // Return the result of the function
    return res;
  }


}
class S6SlidesAdapater extends S6DocumentAdapater {
  replace(thisText, withThatText) {
    var slide = this._doc.getSlide();
    slide.replaceAllText(thisText
      , withThatText);
    return true;
  }
}

class S6SheetAdapater extends S6DocumentAdapater {
  replace(thisText, withThatText) {
    var finder = this._doc.createTextFinder(thisText);
    finder.replaceAllWith(withThatText);
    return true;
  }
}


