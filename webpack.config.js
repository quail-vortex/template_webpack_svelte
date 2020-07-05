const MiniCssExtract = require("mini-css-extract-plugin");
const path = require('path');

const files = {
  app: './src/svelte.js',
}

module.exports = [{
  mode: 'development',
  devtool: 'source-map',
  entry: files,
  output: {
    path: `${__dirname}/assets`,
    filename: 'js/[name].js',
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [{
      test: /\.mjs$/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: './babel.config.json',
        }
      }],
    }, {
      test: /\.svelte$/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: './babel.config.json',
        }
      }, {
        loader: 'svelte-loader',
        options: {
          preprocess: require('svelte-preprocess')({
            scss: true,
            postcss: true
          }),
          dev: true,
          emitCss: true,
        }
      }]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtract.loader,
        "css-loader",
      ],
    }]
  },
  plugins: [
    new MiniCssExtract({
      filename: "css/[name].css"
    }),
  ]
}, {
  mode: 'production',
  entry: files,
  output: {
    path: `${__dirname}/assets`,
    filename: 'js/[name].min.js',
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [{
      test: /\.svelte$/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: './babel.config.json',
        }
      }, {
        loader: 'svelte-loader',
        options: {
          preprocess: require('svelte-preprocess')({
            scss: true,
            postcss: true
          }),
          dev: false,
          emitCss: true,
        }
      }]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtract.loader,
        "css-loader",
      ],
    }]
  },
  plugins: [
    new MiniCssExtract({
      filename: "css/[name].min.css"
    }),
  ]
}];
