const {removeModuleScopePlugin, override, babelInclude, addWebpackAlias} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  // addWebpackAlias({
  //   "tictactoe-common": path.resolve(__dirname, "../common")
  // }),
  babelInclude([
    path.resolve("src"),
    path.resolve("../common"),
    // path.resolve("../server")
  ])
);