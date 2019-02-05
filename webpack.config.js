const { join, resolve } = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const ENV = process.env.APP_ENV;
const isProd = ENV === "prod";

const config = {
  mode: "development",
  entry: "./src/app.js",
  plugins: [new CleanWebpackPlugin(["dist"])],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.min.js",
    publicPath: "/",
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(svg|gif|png|eot|woff|ttf)$/,
        use: ["url-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src/public", "index.html"),
      inject: "body"
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      {
        from: __dirname + "/src/public"
      }
    ])
  ],
  devServer: {
    contentBase: "./src/public",
    port: 8080
  }
};

module.exports = config;
