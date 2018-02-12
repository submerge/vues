var dev = __dirname + '/examples/todos/app.js'
var nested = __dirname + '/examples/nested.js'
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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
            },{
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    ]
                })
            },{
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader'
                    },
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
}