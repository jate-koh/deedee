const path = require('path');

const terserPlugin = require('terser-webpack-plugin');
const tsconfigPath = require("tsconfig-paths-webpack-plugin");

const dist_path = path.resolve(__dirname, 'dist');
const src_path = path.resolve(__dirname, 'src');

const main = {
    entry: path.resolve(src_path, 'index.ts'),
    module: {
        rule: {
            test: /\.ts$/,
            loader: 'ts-loader',
            include: srcPath,
            options: { 
                transpileOnly: true 
            },
        },
    },

    plugins: [],

    resolve: {
        extensions: [".ts"], 
        plugins: [new tsconfigPath()]
    },

    optimization: {
        minimize: true,
        minimizer: [ 
            new terserPlugin( { extractComments: false } ) 
        ]
    },

    output: {
        path: dist_path,
        clean: true
    }

};

module.export = [main];
