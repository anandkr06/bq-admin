var config = {
    entry: './main.js',
     
    output: {
       path:'./',
       filename: 'index.js',
    },
     
    devServer: {
       host:'0.0.0.0',     // deployment
       disableHostCheck : true,  
       inline: true,
       port: 8081,
       historyApiFallback: true
    },
    debug: true,
    devtool: "#eval-source-map",
     
    module: {
       loaders: [
          {
             test: /\.(js|jsx|mjs)$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
                 
             query: {
                presets: ['es2015', 'react', 'stage-2']
             }
          },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { 
            test: /\.(jpe?g|png|gif)$/, 
            loaders: ["file"] 
        },
        { 
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "url-loader?limit=10000&mimetype=application/font-woff" 
        },
        { 
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "file-loader" 
        },
       ]
    }
 }
 
 module.exports = config;
 