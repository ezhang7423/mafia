const path = require("path");
const fs = require("fs");

function load(dirname) {
  var normalizedPath = path.join(__dirname, dirname);
  fs.readdirSync(normalizedPath).forEach(function (file) {
    exports[file.split(".")[0]] = require(`./${dirname}/` + file);
  });
}
load("./");
