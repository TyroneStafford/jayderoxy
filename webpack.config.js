var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: true
});

var webpack = require("webpack");

module.exports = {
    entry: ['babel-polyfill', './assets/js/app.js'],
    output: {
        path: path.resolve(__dirname, "dist"),
        //publicPath: "/assets/",
        filename: 'bundle.js'
    },
    devtool:'source-map',
    module : {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            }
        ],
        rules: [
            {
                test: /\.html/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: [{
                        loader: "css-loader", options: { sourceMap : true}
                    }, {
                        loader: "sass-loader", options: { sourceMap : true}
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    resolve: {
        mainFields: ['browserify', 'browser', 'module', 'main']
    },
    plugins: [
        extractSass,
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};