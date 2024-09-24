// const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
require("dotenv").config();

module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/assets/*/**");
  // eleventyConfig.addPlugin(EleventyVitePlugin);

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
}