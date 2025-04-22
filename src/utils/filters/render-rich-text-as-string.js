import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export const renderRichTextAsString = (value) =>
  documentToPlainTextString(value);
