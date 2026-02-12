const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");

  const md = markdownIt({ html: true, breaks: true, linkify: true });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = (content || "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 230));
  });

  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
