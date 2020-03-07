const path = require("path");

module.exports = {
  context: __dirname,
  entry: {
    application: "./client/assets/javascripts/App",
    vendor: ["styled-components"]
  },

  output: {
    path: path.resolve(__dirname, "./app/assets/javascripts/react_stuff"),
    filename: "[name]-bundle.js"
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".config.js"],
    modules: [
      path.join(__dirname, "client/assets/javascripts"),
      path.join(__dirname, "app/assets/javascripts"),
      path.join(__dirname, "node_modules")
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: "vendor"
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  }
};
