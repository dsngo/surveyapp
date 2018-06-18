const { join } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Initial configurations
const pageTitle = 'Survey App';
const PATH = {
  app: join(__dirname, 'app'),
  src: join(__dirname, 'src'),
  root: join(__dirname, ''),
  nodeModules: join(__dirname, 'node_modules'),
  template: join(__dirname, 'src/template.ejs'),
  styles: join(__dirname, 'src/css'),

};
const developmentPort = 8080;

function defineDevtool(num) {
  switch (num) {
    case 1:
      return 'eval';
    case 2:
      return 'cheap-module-eval-source-map';
    default:
      return 'source-map';
  }
}

module.exports = (env = {}) => {
  const devtool = defineDevtool(env.production ? 2 : 3);
  const stats = {
    colors: true,
    reasons: true,
    assets: true,
    errorDetails: true,
  };
  const extensions = ['.ts', '.tsx', '.css', '.scss', '.js', '.json'];
  // Typescript compiling configurations
  const tsBundleConfig = {
    context: PATH.root,
    entry: {
      main: ['./src/index', './src/css/index'],
    },
    output: {
      path: PATH.app,
      filename: 'assets/[name]/bundle.js',
      publicPath: '/',
      pathinfo: true,
    },
    mode: 'development',
    stats,
    devtool,
    devServer: {
      hot: true,
      open: true,
      inline: true,
      port: developmentPort,
      publicPath: '/',
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
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.s?css$/,
          include: PATH.styles,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: Boolean(env.development),
                importLoaders: 1,
                minimize: Boolean(env.production),
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        title: `${pageTitle} - Development`,
        filename: 'index.html',
        template: PATH.template,
      }),
    ],
  };
  // Webpack configurations
  if (!env.production) {
    tsBundleConfig.entry.main.unshift(
      `webpack-dev-server/client?http://localhost:${developmentPort}/`,
      'react-hot-loader/patch'
    );
  }
  if (env.production) {
    delete tsBundleConfig.devtool;
    delete tsBundleConfig.devServer;
    delete tsBundleConfig.output.pathinfo;
    tsBundleConfig.mode = 'production';
    tsBundleConfig.watch = false;
    tsBundleConfig.output = {
      path: PATH.app,
      filename: 'assets/js/[name].bundle.js',
      publicPath: '/',
    };
    tsBundleConfig.stats = 'normal';
    // tsBundleConfig.resolve.alias = {
    //   react: 'preact-compat',
    //   'react-dom': 'preact-compat',
    // };
    tsBundleConfig.optimization = {
      splitChunks: {
        cacheGroups: {
          manifest: {
            test: /[\\/]node_modules[\\/]/,
            name: 'manifest',
            chunks: 'all',
          },
        },
      },
    };
    tsBundleConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'assets/styles/[name].css',
        chunkFilename: 'assets/styles/[name].[id].css',
      }),
      new HtmlWebpackPlugin({
        title: `${pageTitle}`,
        filename: 'index.html',
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
