// next.config.js

// const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
// const withCSS = require("@zeit/next-css");
module.exports = withImages({
  publicRuntimeConfig: {
    ENDPOINT: process.env.ENDPOINT,
  },
});
