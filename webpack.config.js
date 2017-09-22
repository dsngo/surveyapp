const { join } = require("path");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Initial configurations
const pageTitle = "Survey App";
const PATH = {
    app: join(__dirname, "app"),
    src: join(__dirname, "src"),
    root: join(__dirname, ""),
    nodeModules: join(__dirname, "node_modules"),
};
const developmentPort = 8080;

function defineDevtool(num) {
    switch (num) {
        case 1:
            return "eval";
        case 2:
            return "cheap-module-eval-source-map";
        default:
            return "source-map";
    }
}

module.exports = (env = {}) => {
    const devtool = defineDevtool(env.prod ? 2 : 3);
    const stats = { colors: true, reasons: true, assets: true, errorDetails: true };
    const extensions = [".ts", ".tsx", ".css", ".scss", ".js", ".json"];
    const devSassLoader = ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
            {
                loader: "css-loader",
                options: { sourceMap: devtool === "source-map", importLoaders: 1 },
            },
            "sass-loader",
        ],
    });
    // Typescript compiling configurations
    const tsBundleConfig = {
        context: PATH.root,
        entry: {
            main: ["react-hot-loader/patch", "./src/index", "./src/css/index"],
        },
        output: {
            path: PATH.app,
            filename: "assets/[name]/bundle.js",
            publicPath: "/",
            pathinfo: true,
        },
        stats,
        devtool,
        devServer: {
            hot: true,
            open: true,
            inline: true,
            port: developmentPort,
            publicPath: "/",
            compress: true,
            historyApiFallback: { disableDotRule: true },
            contentBase: join(__dirname, "app"),
            // https: true,
        },
        resolve: { extensions },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: PATH.src,
                    use: [
                        { loader: "react-hot-loader/webpack" },
                        {
                            loader: "awesome-typescript-loader",
                            options: {
                                transpileOnly: false, // enable/disable typechecking
                                sourceMap: devtool === "source-map",
                            },
                        },
                    ],
                },
                {
                    test: /\.s?css$/,
                    include: join(PATH.src, "css"),
                    use: env.prod
                        ? devSassLoader
                        : [
                              "style-loader",
                              {
                                  loader: "css-loader",
                                  options: { sourceMap: devtool === "source-map", importLoaders: 1 },
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
                template: join(__dirname, "src/template.ejs"),
            }),
        ],
    };
    // Webpack configurations
    if(!env.prod) {
        tsBundleConfig.entry.main.unshift(`webpack-dev-server/client?http://localhost:${developmentPort}/`);
    }
    if (env.prod) {
        delete tsBundleConfig.devtool;
        delete tsBundleConfig.devServer;
        delete tsBundleConfig.output.pathinfo;
        tsBundleConfig.watch = false;
        tsBundleConfig.output = {
            path: PATH.app,
            filename: "assets/[name]/bundle.js",
            publicPath: "/",
        };
        tsBundleConfig.stats = "normal";
        tsBundleConfig.resolve.alias = {
            react: "preact-compat",
            "react-dom": "preact-compat",
        };
        tsBundleConfig.plugins = [
            new webpack.DefinePlugin({ "process.env": { NODE_ENV: '"production"' } }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest",
                filename: "assets/main/[name].js",
                minChunks: Infinity,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true,
            }),
            new webpack.optimize.UglifyJsPlugin({ comments: false }),
            new ExtractTextPlugin({ filename: "assets/css/bundle.css", allChunks: true }),
            new HtmlWebpackPlugin({ title: `${pageTitle}`, filename: "index.html", template: join(__dirname, "src/template.ejs") }),
        ];
    }
    const config = [tsBundleConfig];
    return config;
};
