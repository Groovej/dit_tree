const webpack = require("webpack");
const config = require("./webpack.common.config.js");
const NODE_ENV = "production";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

config.plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV),
      SC_DISABLE_SPEEDY: true
    }
  })
];
config.mode = NODE_ENV;
config.optimization = {};
config.optimization.minimizer = [new UglifyJsPlugin()];

module.exports = config;
