const path = require("path");
const autoprefixer = require("autoprefixer");
const polyfill = require('@babel/polyfill');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.WEBPACK_ENV;

module.exports = {
    mode,
    entry: ['@babel/polyfill', path.resolve(__dirname, "assets", 'js', 'main.js')],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'static')
    },
    module: {
        rules: [
          {
            test: /\.(js)$/,
            use: ['babel-loader']
          },
          {
            test: /\.(scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        [
                          "autoprefixer",
                          {
                            overrideBrowserslist:"cover 99.5%"
                          },
                        ],
                      ],
                    },
                  },
              },
              'sass-loader'
            ],
          },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'styles.css'}),
    ],
}