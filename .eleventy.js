// Build Script
import { svgToSymbols } from "./src/utils/build/svg-to-symbols.js";

// Filters
import { markdownFilter } from "./src/utils/filters/markdown.js";
import { readableDateFilter } from "./src/utils/filters/readable-date.js";
import { renderRichTextAsHtml } from "./src/utils/filters/render-rich-text-as-html.js";
import { renderRichTextAsString } from "./src/utils/filters/render-rich-text-as-string.js";
import { toISODate } from "./src/utils/filters/to-iso-date.js";

// Transforms
import { purgeCSS } from "./src/utils/transforms/css-purge-inline.js";

// Shortcodes
import { boardShortcode } from "./src/utils/shortcodes/board.js";
import { ctflDownloadShortcode } from "./src/utils/shortcodes/contentful-download.js";
import { ctflPictureShortcode } from "./src/utils/shortcodes/contentful-picture.js";
import { iconShortcode } from "./src/utils/shortcodes/icon.js";
import { pictureShortcode } from "./src/utils/shortcodes/picture.js";
import { scriptShortcode } from "./src/utils/shortcodes/script.js";

// Other
import buildSystem from "@cagov/11ty-build-system";
import { globPlugin } from "esbuild-plugin-glob";
import fs from "node:fs";
import path from "path";

// Get the current directory
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === "production";

/** @param {import("./node_modules/@11ty/eleventy/src/UserConfig.js").default} config */
export default function EleventyConfig(config) {
  const cssDir = path.join(__dirname, "/dist/assets/css/");
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, {
      recursive: true,
    });
  }

  config.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
    await svgToSymbols();
  });

  config.setServerOptions({
    watch: ["dist/assets/css/**/*.css"],
  });

  // config.addWatchTarget("./dist/assets/css/");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy({ public: "/" });
  config.addPassthroughCopy("./src/assets/images/");
  config.addPassthroughCopy("./src/assets/fonts/");

  // Add filters
  config.addFilter("readableDate", readableDateFilter);
  config.addFilter("toISODate", toISODate);
  config.addFilter("markdown", markdownFilter);
  config.addFilter("limit", (arr, limit) => arr.slice(0, limit));
  config.addFilter("renderRichTextAsHtml", renderRichTextAsHtml);
  config.addFilter("renderRichTextAsString", renderRichTextAsString);

  // Add Shortcodes
  config.addShortcode("icon", iconShortcode);
  config.addShortcode("script", scriptShortcode);
  config.addShortcode("picture", pictureShortcode);
  config.addShortcode("ctflPicture", ctflPictureShortcode);
  config.addPairedShortcode("ctflDownload", ctflDownloadShortcode);
  config.addShortcode("board", boardShortcode);

  config.addPlugin(buildSystem, {
    processors: {
      esbuild: {
        watch: ["src/assets/scripts/**/*"],
        options: {
          entryPoints: [path.resolve(__dirname, "src/assets/scripts/**/*")],
          bundle: true,
          minify: isProduction,
          outdir: "dist/assets/scripts",
          splitting: true,
          format: "esm",
          plugins: [globPlugin()],
        },
      },
      postcss: {
        file: "postcss.config.cjs",
        watch: [
          "src/assets/css/**/*",
          "src/assets/design-tokens/**/*",
          "tailwind.config.js",
          "node_modules/tailwindcss/*.css",
          "src/**/*.njk",
        ],
      },
    },
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform("purgeCSS", purgeCSS);
  }

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
