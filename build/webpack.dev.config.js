const base = require("./webpack.base.config")
const merge = require("webpack-merge")
const webpack = require("webpack")
const config = require('.././config/dev.config')

module.exports = merge(base, {
    // This contains additional production settings
    plugins: [
        new webpack.DefinePlugin({
        "process": {
            env: config
        }
        })
    ],
    devServer: {
        port: 9191,
        host: "0.0.0.0",
        overlay: true,
        disableHostCheck: true,
        // proxy: {
        //      '/api/*': { "secure": false, "changeOrigin": true, "target":  "https://wkstn-core-api.herokuapp.com/" },
        //      '/images/*': { "secure": false, "changeOrigin": true, "target":  "https://wkstn-core-api.herokuapp.com/" },
        //      '/files/*': { "secure": false, "changeOrigin": true, "target":  "https://wkstn-core-api.herokuapp.com/" },
        //    // '/api/*': 'http://localhost:5454',
        //    // '/files/*': 'http://localhost:5454',
        //    // '/images/*': 'http://localhost:5454'
        // }
    }
})