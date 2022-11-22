const eleventyImage = require("@11ty/eleventy-img");

async function ctflPictureShortcode(content, ctflImage) {
  if (!ctflImage.imgObj) {
    return "Contentful image-object must be provided";
  }

  if (
    ctflImage.imgObj.fields == undefined ||
    ctflImage.imgObj.fields.file == undefined ||
    ctflImage.imgObj.fields.file.contentType == undefined ||
    ctflImage.imgObj.fields.file.contentType.startsWith("image") == false
  ) {
    return "imgObj must be a valid contentful image object";
  }

  const { imgObj } = ctflImage;
  let imgUrl = imgObj.fields.file.url;
  const imgId = imgObj.sys.id;
  const originSizes = imgObj.fields.file.details.image;

  const imgWidth = originSizes.width;
  const imgHeight = originSizes.height;

  if (imgUrl.startsWith("//")) {
    imgUrl = "https:" + imgUrl;
  }

  let options = {
    formats: ["jpeg"],
    widths: [null],
    urlPath: "/images/ctfl",
    outputDir: "dist/images/ctfl",
    filenameFormat: function (id, src, width, format, options) {
      // Log files saved to dist
      console.log(`download-${imgId}-${imgWidth}x${imgHeight}.${format}`);
      return `download-${imgId}-${imgWidth}x${imgHeight}.${format}`;
    },
  };

  let stats;
  stats = await eleventyImage(imgUrl, options);

  let data = stats.jpeg[stats.jpeg.length - 1];
  return `<a class="download-grid__link" href="${data.url}" download="${imgObj.fields.title}">
      ${content}
      <span class="download-grid__link-body">
        <span>${imgObj.fields.title}</span>
        <span>${imgWidth}px x ${imgHeight}px</span>
        <span class="button">Download</span>
      </span>
    </a>`;
}

module.exports = ctflPictureShortcode;
