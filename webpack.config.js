const { join } = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Initial configurations
const pageTitle = "Survey App";
const developmentPort = 8080;
const PATH = {
  app: join(__dirname, "app"),
  src: join(__dirname, "src"),
  root: join(__dirname, ""),
  nodeModules: join(__dirname, "node_modules"),
  template: join(__dirname, "src/template.ejs"),
  styles: join(__dirname, "src/css"),
};

module.exports = (env = {}) => {
  const target = "web";
  const main = ["./src/index", "./src/css/index"];
  if (!env.production) {
    main.unshift(
      `webpack-dev-server/client?http://localhost:${developmentPort}/`,
      "react-hot-loader/patch",
    );
  }
  const extensions = [".ts", ".tsx", ".css", ".scss", ".js", ".json"];
  // Typescript compiling configurations
  const tsBundleConfig = {
    target,
    context: PATH.root,
    entry: { main },
    output: {
      path: PATH.app,
      filename: "assets/[name]/bundle.js",
      publicPath: "/",
      pathinfo: !env.production,
    },
    mode: env.production ? "production" : "development",
    stats: env.production ? "minimal" : "normal",
    devtool: env.production ? "false" : "source-map",
    devServer: {
      hot: true,
      open: true,
      inline: true,
      port: developmentPort,
      publicPath: "/",
      compress: true,
      historyApiFallback: { disableDotRule: true },
      contentBase: PATH.app,
      // https: true,
    },
    resolve: { extensions },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: PATH.src,
          use: [{ loader: "ts-loader" }],
        },
        {
          test: /\.s?css$/,
          include: PATH.styles,
          use: [
            env.production ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: Boolean(env.development),
                importLoaders: 1,
                minimize: Boolean(env.production),
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        title: `${pageTitle} - Development`,
        filename: "index.html",
        template: PATH.template,
      }),
    ],
  };
  // Webpack configurations
  if (env.production) {
    delete tsBundleConfig.devServer;
    // tsBundleConfig.resolve.alias = {
    //   react: 'preact-compat',
    //   'react-dom': 'preact-compat',
    // };
    tsBundleConfig.optimization = {
      splitChunks: {
        cacheGroups: {
          manifest: {
            test: /[\\/]node_modules[\\/]/,
            name: "manifest",
            chunks: "all",
          },
        },
      },
    };
    tsBundleConfig.plugins = [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "assets/styles/[name].css",
        chunkFilename: "assets/styles/[name].[id].css",
      }),
      new HtmlWebpackPlugin({
        title: `${pageTitle}`,
        filename: "index.html",
        template: PATH.template,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
        },
      }),
    ];
  }
  const config = [tsBundleConfig];
  return config;
};
