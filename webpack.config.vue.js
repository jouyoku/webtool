//https://github.com/RonnieSan/vue-browser-sfc
// ----------------------------------------------------------------------
// WEBPACK CONFIGURATION
// ----------------------------------------------------------------------

// INSTRUCTIONS
// webpack --env.file="./path/to/file" --relative to the src folder

// Import dependencies
const fs = require('fs');
const _ = require('lodash');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = env => {

  if(!fs.existsSync(env.src)) {
    console.log('Source does not exists!');
    return {};
  }

  var _output = {
    filename: '[name].js',
    path: resolve(env.dst)
  };

  if(env.dst.endsWith('.js')) {
    _output = {
      filename: path.basename(resolve(env.dst)),
      path: path.dirname(resolve(env.dst))
    }
  }

  var _files = glob.sync(env.src + "/**/*.vue");

  if(_files.length == 0) {
    var stat = fs.lstatSync(env.src);
    if(stat.isDirectory()) {
      console.log('Source contains no *.vue files!');
      return {};
    } else if(stat.isFile() && env.src.endsWith('.vue')) {
      _files.push(env.src);
      env.src = path.dirname(env.src);
    } else {
      console.log('Source is strange!');
      return {};
    }
  }

  var srcPath = resolve(env.src);

  var tmpFolderPath = resolve(".tmp");
  if (!fs.existsSync(tmpFolderPath)){
    fs.mkdirSync(tmpFolderPath);
  }

  var _entry = {};
  for (var i = 0; i < _files.length; i++) {
    var filePath = resolve(_files[i]);
    var tmpFile = tmpFolderPath + "/entry" + i + '.js';
    fs.writeFileSync(tmpFile,
      "import Component from '" + filePath + "';Vue.component(Component.name, Component);"
    );
    _entry[filePath.substring(srcPath.length).slice(0, -4)] = tmpFile;
  }

  var template = {
    watch: false,
    mode: 'production',
    entry: _entry,
    output: _output,
    resolve: {
      extensions: ['.vue', '.js'],
      alias: {
        'vue$': resolve('node_modules/vue/dist/vue.min.js'),
        '@': resolve('')
      }
    },
    externals: {
      vue: 'Vue',
      lodash: 'lodash'
    },
    module: {
      rules: [{
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
            resolve('')
          ],
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'less-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.sass$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  };

  return template;
};
