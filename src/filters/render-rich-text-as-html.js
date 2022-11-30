const { BLOCKS, MARKS, INLINES } = require('@contentful/rich-text-types');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const eleventyImage = require('@11ty/eleventy-img');

// Props is an object
const renderImage = ({ src, alt, lazy = true, ...props }) => `
  <img
    src="${src}"
    alt="${alt}"
    ${lazy ? `loading="lazy" decoding="async"` : ''}
    ${Object.keys(props)
			.map((key) => `${key}="${props[key]}"`)
			.join(' ')}
  />
`;

const renderAvatar = (url, title) => {
	return `
    <h3>${title}</h3>
    ${renderImage({
			src: `https:${url}?fm=webp&fit=fill&w=200&h=200&f=face`,
			width: 200,
			height: 200,
			alt: title,
		})}
  `;
};

async function eleventyPicture(imgObj) {
	const imgId = imgObj.sys.id;
	let imgUrl = imgObj.fields.file.url;
	if (imgUrl.startsWith('//')) {
		imgUrl = 'https:' + imgUrl;
	}

	const options = {
		formats: ['avif', 'webp', 'jpeg', 'svg'],
		widths: [300, 600],
		urlPath: '/images/ctfl',
		outputDir: 'dist/images/ctfl',
		filenameFormat: function (id, src, width, format, options) {
			return `${imgId}-embedded.${format}`;
		},
	};

	const stats = await eleventyImage(imgUrl, options);

	const picture = eleventyImage.generateHTML(stats, {
		alt: '',
		loading: 'lazy',
		decoding: 'async',
		sizes: '(min-width: 22em) 30vw, 100vw',
		class: '',
	});

	console.log('FUNCTION!!!!!!!!!');

	return picture;
}

const richTextHtmlRendererOptions = {
	renderMark: {
		[MARKS.BOLD]: (node) => `<strong>${node}</strong>`,
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, next) =>
			`<p>${next(node.content).replace(/\n/g, `<br>`)}</p>`,
		[BLOCKS.LIST_ITEM]: (node, next) =>
			`<li>${next(node.content).replace(/<[/]*p>/g, '')}</li>`,
		// Todo: Add support for other files, display as Download
		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			return node.data.target;
		},

		[BLOCKS.EMBEDDED_ENTRY]: (node) => {
			const entry = node.data.target;
			const entryId = entry.sys.contentType.sys.id;

			if (entryId === 'person') {
				const imgUrl = entry.fields.photo.fields.file.url;
				const imgTitle = entry.fields.firstName + ' ' + entry.fields.lastName;
				return renderAvatar(imgUrl, imgTitle);
			}
		},

		[INLINES.EMBEDDED_ENTRY]: (node) => {
			const entry = node.data.target;
			const entryId = entry.sys.contentType.sys.id;

			if (entryId === 'shy') {
				return `&shy;`;
			}
		},
	},
};

const awaitImages = async (value) => {
	return Promise.all(
		value.content.map(async (content) => {
			if (content.nodeType === 'embedded-asset-block') {
				const picture = await eleventyPicture(content.data.target);
				content.data.target = picture;
			}
		})
	).then(() => {
		return documentToHtmlString(value, richTextHtmlRendererOptions);
	});
};

module.exports = (value) => awaitImages(value, richTextHtmlRendererOptions);
