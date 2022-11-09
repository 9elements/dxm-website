const { BLOCKS, MARKS } = require("@contentful/rich-text-types");
const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

// Props is an object
const renderImage = ({ src, alt, lazy = true, ...props }) => `
  <img
    src="${src}"
    alt="${alt}"
    ${lazy ? `loading="lazy" decoding="async"` : ""}
    ${Object.keys(props)
      .map((key) => `${key}="${props[key]}"`)
      .join(" ")}
  />
`;

const renderAvatar = (url, title) => {
  return `
    <h3>${title}</h3>
    ${renderImage({
      src: `https:${url}?fm=webp&fit=fill&w=200&h=200&f=face`,
      width: 200,
      height: 200,
      alt: title
    })}
  `;
};

const renderTextImage = (bodycopy, imgUrl, imgAlt, position) => {
  return `
    <div class="cluster cluster--${position}">
      <div>${documentToHtmlString(bodycopy)}</div>
      <div>
        ${renderImage({
          src: `${imgUrl}?fm=webp&fit=fill&w=400&h=400&f=face&q=80"`,
          alt: imgAlt
        })}
      </div>
    </div>
  `;
};

const renderYoutube = (videoTitle, videoId) => {
  return `<lite-youtube
  videoid="${videoId}"
  style="background-image: url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg');"
  class="center"
>
  <button type="button" class="lty-playbtn">
    <span class="lyt-visually-hidden">Play Video: ${videoTitle}</span>
  </button>
</lite-youtube>`;
};

const renderGallery = (images) => {
  const imgList = images
    .map((image) => {
      const { file } = image.fields;
      const aspectRatio = file.details.image.width / file.details.image.height;
      const format = aspectRatio > 1 ? "landscape" : "portrait";

      return renderImage({
        src: `https:${file.url}?fm=webp&fit=fill&w=600&f=face&q=80`,
        alt: image.fields.title,
        class: `gallery__image gallery__image--${format}`
      });
    })
    .join("");

  return `
    <div class="gallery">${imgList}</div>
  `;
};

const richTextHtmlRendererOptions = {
  renderMark: {
    [MARKS.BOLD]: (node) => `<strong>${node}</strong>`
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) =>
      `<p>${next(node.content).replace(/\n/g, `<br>`)}</p>`,
    [BLOCKS.LIST_ITEM]: (node, next) =>
      `<li>${next(node.content).replace(/<[/]*p>/g, "")}</li>`,
    // Todo: Add support for other files, display as Download
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { fields } = node.data.target;
      const { file } = fields;
      const isImage = file.contentType.includes("image");
      const fileSizeInMb = `${(file.details.size / 1000000).toFixed(1)} MB`;

      return isImage
        ? `
          <figure class="stack-3xs">
            <script>
            </script>
            <picture>
              <source srcset="https:${file.url}?fm=avif&w=1000" media="(min-width: 600px)" type="image/avif">
              <source srcset="https:${file.url}?fm=webp&w=1000" media="(min-width: 600px)" type="image/webp">
              <source srcset="https:${file.url}?fm=jpg&w=1000" media="(min-width: 600px)" type="image/jpeg">
              <img loading="lazy" decoding="async" alt="${fields.description}" src="https:${file.url}?fm=jpg&w=1000">
            </picture>
            <figcaption class="text-300">
              ${fields.description}
            </figcaption>
          </figure>
        `
        : `
        <div class="download-item | sidebar-right | bg-gray-medium text-400" style="
          --sidebar-width: 5rem;
          --sidebar-gap: var(--space-xs);
        ">
          <p class="download-item__body leading-tight stack-3xs">
            <span class="weight-bold">${fields.title}</span>
            <span class="color-gray-light uppercase">${fileSizeInMb}</span>
          </p>
          <div class="download-item__sidebar download-item__sidebar--with-icon">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div> 
          <a href="https:${file.url}" target="_blank" rel="noopener noreferrer" class="download-item__link">
            <span class="sr-only">Download ${fields.title}</span>
          </a>
        </div>`;
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data.target;
      const entryId = entry.sys.contentType.sys.id;

      if (entryId === "person") {
        const imgUrl = entry.fields.photo.fields.file.url;
        const imgTitle = entry.fields.firstName + " " + entry.fields.lastName;
        return renderAvatar(imgUrl, imgTitle);
      }

      if (entryId === "textImage") {
        const bodycopy = entry.fields.bodycopy;
        const imgUrl = entry.fields.image.fields.file.url;
        const imgAlt = entry.fields.image.fields.title;
        const imgPosition = entry.fields.imagePosition;
        return renderTextImage(bodycopy, imgUrl, imgAlt, imgPosition);
      }

      if (entryId === "gallery") {
        const images = entry.fields.images;
        return renderGallery(images);
      }

      if (entryId === "youtubeVideo") {
        const videoTitle = entry.fields.videoTitle;
        const videoId = entry.fields.videoId;
        let posterImage = "";
        if (entry.fields.posterImage) {
          posterImage = entry.fields.posterImage.fields.file.url;
        } else {
          posterImage = "/images/event-placeholder.jpg";
        }
        return renderYoutube(videoTitle, videoId, posterImage);
      }
    }
  }
};

module.exports = (value) =>
  documentToHtmlString(value, richTextHtmlRendererOptions);
