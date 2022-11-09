const {
  documentToPlainTextString
} = require("@contentful/rich-text-plain-text-renderer");

module.exports = (value) => documentToPlainTextString(value);
