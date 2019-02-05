const { join, resolve } = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  plugins: [new CleanWebpackPlugin(["dist"])],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
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
