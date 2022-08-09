const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/**
 * @type require("webpack").Configuration
 */
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "app", "index"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                loader: "babel-loader",
                options: {
                    presets: [ "@babel/env", "@babel/react", "@babel/typescript" ],
                    plugins: [ "react-hot-loader/babel" ],
                }
            },
            {
                test: /\.css$/,
                use: [ "style-loader", "css-loader" ],
            },
        ],
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    devServer: {
        static: path.resolve(__dirname, "dist"),
    },
    plugins: [ new ForkTsCheckerWebpackPlugin() ]
}
