/**
 * webpack
 * */
module.exports = {
    entry:[
        './app/main.js'
    ],
    output: {
        path: __dirname + '/assets/',
        publicPath: "/assets/",
        filename: '[name].bundle.js'
    },
    resolve:{},
    module: {
        loaders: [
            /*{
             test: /\.scss$/,
             loaders: ["style", "css", "sass"]
             },*/

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                /*loaders: ['babel-loader'],*/
                loaders: ['babel-loader?presets[]=es2015,presets[]=react']
            }

        ]
    },
    plugins:[],
    watch:true
};