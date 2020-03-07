const webpack = require("webpack");
const config = require("./webpack.common.config.js");
const NODE_ENV = "development";

config.plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  })
];

const bodyParser = require("body-parser");
const request = require("sync-request");
config.devtool = "inline-cheap-source-map";
config.mode = NODE_ENV;

module.exports = config;
