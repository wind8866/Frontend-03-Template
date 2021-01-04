const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [// 要保证顺序
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
}