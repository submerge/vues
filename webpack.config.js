var dev = __dirname + '/dev.js'
var nested = __dirname + '/nested.js'
console.log(dev)
console.log(nested)
module.exports = {
    entry: {
        dev: dev,
        nested: nested
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    }
}