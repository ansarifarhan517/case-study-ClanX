const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/styles.[name].[fullhash].css',
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
