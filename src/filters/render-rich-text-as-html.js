const { BLOCKS, MARKS, INLINES } = require('@contentful/rich-text-types');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const eleventyImage = require('@11ty/eleventy-img');

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
			return `${imgId}-${width}w-embedded.${format}`;
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
			const entryType = entry.sys.contentType.sys.id;

			if (entryType === 'gallery') {
				let pictureList = [];
				for (const image of entry.fields.images) {
					const picture = `<div>${image}</div>`;
					pictureList.push(picture);
				}
				//pictureList = pictureList.join('');
				return `<div class="grid-switcher" style="
          --gs-columns-small: 1;
          --gs-bp-medium: 35rem;
          --gs-columns-medium: 2;
          --gs-bp-large: 65rem;
          --gs-columns-large: 3;
          --gs-gap: 2rem;
          --gs-gap-vertical: 2rem;
          align-items: start;
          ">${pictureList.join('')}</div>`;
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

const awaitImagesAndRender = async (value) => {
	return Promise.all(
		value.content.map(async (content) => {
			if (
				content.nodeType === 'embedded-asset-block' &&
				content.data.target.fields.file.contentType.startsWith('image')
			) {
				const picture = await eleventyPicture(content.data.target);
				content.data.target = picture;
			}

			if (
				content.nodeType === 'embedded-entry-block' &&
				content.data.target.sys.contentType.sys.id === 'gallery'
			) {
				const images = content.data.target.fields.images;
				for (const [index, image] of images.entries()) {
					const picture = await eleventyPicture(image);
					images[index] = `<div class="picture">${picture}</div>`;
				}
			}
		})
	).then(() => {
		return documentToHtmlString(value, richTextHtmlRendererOptions);
	});
};

module.exports = (value) =>
	awaitImagesAndRender(value, richTextHtmlRendererOptions);
