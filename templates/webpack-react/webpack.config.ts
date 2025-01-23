import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import { CallableWebpackConfiguration } from "webpack-cli";

// webpack ts 配置: https://www.webpackjs.com/configuration/configuration-languages/#typescript
const config: CallableWebpackConfiguration = (env): Configuration => {
    return {
        mode: "development",
        entry: "./src/main.tsx",
        output: {
            filename: "[name]-[chunkhash].js",
            path: path.resolve(__dirname, "dist"),
            hashDigestLength: 5,
            clean: true,
            libraryTarget: "umd",
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader", "ts-loader"], // babel-loader 为了兼容babel配置，ts-loader 为了兼容ts配置
                    exclude: /node_modules/,
                },
                {
                    test: /\.less$/,
                    use: ["style-loader", "css-loader", "less-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: env?.WEBPACK_BUILD
                    ? "./index.html"
                    : "index.dev.html",
                filename: "index.html",
            }),
        ],
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
    };
};

export default config;
