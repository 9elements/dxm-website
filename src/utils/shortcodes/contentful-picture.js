/* ==========================================================
This shortcode can be used for images loaded from Contentful.
It generates a <picture> with all the formats and widths defined in the shortcode.

Required properties:
  - imgObj -> The whole image object from contentful (not just the URL!)

Not required, but recommended:
  - alt -> alt for the image (works with ""). Defaults to the image's title defined in Contentful
  - imgWidth -> The width of the image requested from contentful. Defaults to 800
  - imgHeight -> The height of the image requested from contentful. Defaults to 600
  !! if you define either imgWidth or imgHeight, the other one will be calculated based on the image's
  dimensions taken from contentful. If you specify both, the image will be resized. !!

Optional properties:
  - formats -> The image formats generated for the picture. Defaults to ["avif", "webp", "jpg"]
  - widths -> all the widths for the picture elements. Works with [none]. Defaults to [300, 600]
  - sizes -> defines the sizes for the picture. Works with [none]. Defaults to "(min-width: 22em) 30vw, 100vw"
  - classes -> add some classes
  - fit -> if you resize the image this defines how it should be resized. Defaults to "fill"
  - focus -> when the image is resized define where the focus is set (face, faces, top-left etc.). Defaults to "center"

Basic usage:
{% ctflPicture imgObj = myImage, alt="ctfl image", imgWidth="800", imgHeight="600" %}

Thumbnail example:
{% ctflPicture
  imgObj = myImage,
  alt="Avatar",
  imgWidth="32",
  imgHeight="32",
  fit="thumb",
  focus="face",
  widths=[32],
  sizes="2rem"
%}
========================================================== */

import eleventyImage from "@11ty/eleventy-img";

export const ctflPictureShortcode = (ctflImage) => {
  if (!ctflImage.imgObj) {
    return "Contentful image-object must be provided";
  }

  if (
    ctflImage.imgObj?.fields?.file?.contentType == undefined ||
    ctflImage.imgObj.fields.file.contentType.startsWith("image") == false
  ) {
    return "imgObj must be a valid contentful image object";
  }

  const { imgObj } = ctflImage;
  let imgUrl = imgObj.fields.file.url;

  const imgId = imgObj.sys.id;
  const originSize = imgObj.fields.file.details.image;
  const ratio = originSize.width / originSize.height;
  let alt = "";
  if (ctflImage.alt == undefined) {
    alt = imgObj.fields.title;
  } else {
    alt = ctflImage.alt;
  }
  alt = alt.replaceAll('"', "&quot;");
  const formats = ctflImage.formats || ["avif", "webp", "png"];
  const widths = ctflImage.widths || [400, 800];
  const sizes = ctflImage.sizes || "(min-width: 22em) 30vw, 100vw";
  const classes = ctflImage.classes || "";
  const fit = ctflImage.fit || "fill";
  const focus = ctflImage.focus || "center";

  let imgWidth = originSize.width;
  let imgHeight = originSize.height;

  if (ctflImage.imgWidth && ctflImage.imgHeight) {
    imgWidth = ctflImage.imgWidth;
    imgHeight = ctflImage.imgHeight;
  }

  if (ctflImage.imgWidth && !ctflImage.imgHeight) {
    let calculatedHeight = Math.floor(ctflImage.imgWidth / ratio);
    imgWidth = ctflImage.imgWidth;
    imgHeight = calculatedHeight;
  }

  if (!ctflImage.imgWidth && ctflImage.imgHeight) {
    let calculatedWidth = Math.floor(ctflImage.imgHeight * ratio);
    imgHeight = ctflImage.imgHeight;
    imgWidth = calculatedWidth;
  }

  if (imgUrl && imgUrl.startsWith("//")) {
    imgUrl = "https:" + imgUrl;
  }

  imgUrl =
    imgUrl +
    "?f=" +
    focus +
    "&fit=" +
    fit +
    "&w=" +
    imgWidth +
    "&h=" +
    imgHeight;

  const options = {
    formats: formats,
    widths: widths,
    urlPath: "/assets/images/ctfl",
    outputDir: "dist/assets/images/ctfl",
    filenameFormat: function (id, src, width, format, options) {
      return `${imgId}-${imgWidth}x${imgHeight}-${width}w-${fit}-${focus}.${format}`;
    },
  };

  eleventyImage(imgUrl, options);

  const stats = eleventyImage.statsByDimensionsSync(
    imgUrl,
    imgWidth,
    imgHeight,
    options
  );

  const imageAttributes = {
    alt: alt,
    loading: "lazy",
    decoding: "async",
    sizes: sizes,
    class: classes,
  };

  return eleventyImage.generateHTML(stats, imageAttributes);
};
