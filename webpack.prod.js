const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");  //Copies individual files or entire directories, which already exist, to the build directory.

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true, //Borra y vuelve a crear
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/, //Tenemos que excluir este archivo para que se ejecute en el siguiente bloque.
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebpack({
            title:  "Mi Webpack App",
            //filename: "index.html", //Opcional, se pone por defecto
            template: "./src/index.html",
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css', //'[name].[fullhash].css'
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets/', to: "assets/" }
            ],
          }),
    ]
}