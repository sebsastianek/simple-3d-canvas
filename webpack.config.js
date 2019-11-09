const path = require('path');

module.exports = {
    entry: './main.ts',
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 700
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};