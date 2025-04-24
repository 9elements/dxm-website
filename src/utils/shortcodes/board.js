import eleventyImage from "@11ty/eleventy-img";
import slugify from "slugify";

export const boardShortcode = async (board) => {
  const title = board.fields.title;
  const slug = slugify(title).toLowerCase();
  let backgroundUrl = board.fields.teaserImage.fields.file.url;
  backgroundUrl = "https:" + backgroundUrl;

  let metadata = await eleventyImage(backgroundUrl, {
    widths: [600],
    formats: ["webp"],
    urlPath: "/assets/images/ctfl",
    outputDir: "dist/assets/images/ctfl",
  });

  let data = metadata.webp[metadata.webp.length - 1];

  return `<a class="image-link | text-step-2 uppercase leading-tight weight-light" href="/${slug}" style="background-image: url(${data.url});">
    <span class="image-link__overlay"></span></span><span aria-hidden="true" class="weight-bold">10xD</span><span>${title}</span>
  </a>`;
};
