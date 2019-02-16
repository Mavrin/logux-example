var path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
