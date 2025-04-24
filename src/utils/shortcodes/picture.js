import eleventyImage from "@11ty/eleventy-img";

export const pictureShortcode = async (picture) => {
  let src = picture.src;
  let alt = picture.alt;
  let widths = picture.widths ? picture.widths : [300, 600];
  let sizes = picture.sizes ? picture.sizes : "100vw";
  let imgOptions = picture.imgOptions ? picture.imgOptions : "";
  let imgClass = picture.class ? picture.class : "";
  let formats = picture.formats ? picture.formats : ["avif", "jpg"];
  let loading = picture.loading ? picture.loading : "lazy";

  if (src.startsWith("//")) {
    src = "https:" + src;
  }

  let options = "";
  if (imgOptions) {
    imgOptions.forEach((option, index) => {
      if (index == 0) {
        options = "?" + option;
      } else {
        options = options + "&" + option;
      }
    });
  }
  src = src + options;

  let cacheOptions = {};

  cacheOptions.duration = "1d";
  cacheOptions.directory = ".cache";
  cacheOptions.removeUrlQueryParams = false;

  const metadata = await eleventyImage(src, {
    widths: widths,
    formats: formats,
    outputDir: "./dist/assets/images/ctfl/",
    urlPath: "/assets/images/ctfl/",
  });

  let imageAttributes = {
    class: imgClass,
    alt,
    sizes,
    loading: loading,
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return eleventyImage.generateHTML(metadata, imageAttributes);
};
