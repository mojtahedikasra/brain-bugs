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

  // SEO: ISO date format for sitemaps, feeds, and JSON-LD schema
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  // SEO: Word count for Article schema
  eleventyConfig.addFilter("wordCount", (content) => {
    return (content || "").split(/\s+/).length;
  });

  // SEO: HTML encode for Atom feed content
  eleventyConfig.addFilter("htmlEncode", (content) => {
    return (content || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
