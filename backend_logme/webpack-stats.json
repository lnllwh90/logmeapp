// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);

import path from "path"
import webpack from "webpack"
import BundleTracker from "webpack-bundle-tracker"
import {CleanWebpackPlugin} from "clean-webpack-plugin"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// const path = require('path');
// const webpack = require('webpack')
// const BundleTracker = require('webpack-bundle-tracker')
// const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
// const staging = 'development'
// const prod = 'production'
// const FileManagerPlugin = require('filemanager-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')



export default {
  mode: "development", //development or production
  // watch: true, // enables the webpack to update itself and watch for any updates made to the source file(s)
  entry: {   // path to our input file also the name = 'main'
    LoginRegistration: './LogMe_app/static/js/index.js',
    welcome: './LogMe_app/static/js/welcome.js',
    mealLog: './LogMe_app/static/js/meal_log.js',
    goals: './static/goals.js'
  }, 
  
  //used to add a source map to your logged lines captured in the console panel. Without you may have a tough time locating which of the files included inside of bundle the error came from.

  // devtool: "eval-cheap-module-source-map",

  output: {
    filename: '[name].js',  // output bundle file name
    path: path.resolve(__dirname, './front-end/assets'),  // path to our Django static directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { 
            presets: [ "@babel/preset-react", 
              "@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  }, 
  plugins: [
    // '@babel/plugin-proposal-class-properties',
    new BundleTracker({filename: './webpack-stats.json'}), 
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({
      title: 'LogMe App',
      filename: 'base.html',
      inject: 'body',
      template: './LogMe_app/templates/base.html'
    })
  ]
};



