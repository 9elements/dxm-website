//Serverless
const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');

// Filters
const readableDate = require('./src/filters/readableDate.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const renderRichTextAsHtml = require('./src/filters/render-rich-text-as-html.js');
const renderRichTextAsString = require('./src/filters/render-rich-text-as-string.js ');

// Plugins
const svgSprite = require('eleventy-plugin-svg-sprite');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const purgeCSS = require('./src/transforms/css-purge-inline.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/js/');
  config.addPassthroughCopy('./src/downloads/');

  //Serverless
  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless', // The serverless function name from your permalink object
    functionsDir: './netlify/functions/',
    copy: ['src/filters', 'src/transforms', 'src/shortcodes', 'src/js'],
  });

  // Add filters
  config.addFilter('readableDate', readableDate);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addAsyncFilter('renderRichTextAsHtml', renderRichTextAsHtml);
  config.addFilter('renderRichTextAsString', renderRichTextAsString);
  config.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit);
  });
  config.addFilter('markdownFilter', markdownFilter);

  // Add Shortcodes
  config.addShortcode('icon', require('./src/shortcodes/icon.js'));
  config.addNunjucksShortcode(
    'ctflPicture',
    require('./src/shortcodes/ctflPicture.js')
  );
  config.addPairedNunjucksAsyncShortcode(
    'ctflDownload',
    require('./src/shortcodes/ctflDownload.js')
  );

  // Plugins
  config.addPlugin(svgSprite, {
    path: './src/icons',
    // relative path to SVG directory
    outputFilepath: './dist/icons/icons.svg',
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
    config.addTransform('purgeCSS', purgeCSS);
  }

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
