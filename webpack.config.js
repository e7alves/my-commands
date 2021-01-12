const path = require('path')
const Webpack = require('webpack')
const WebpackCleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const CopyPlugin = require('copy-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BABEL_ENV = process.env.NODE_ENV
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

const isEnvDevelopment = process.env.NODE_ENV === 'development'
const isEnvProduction = process.env.NODE_ENV === 'production'
const packageInfo = require('./package.json')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
  },
}

module.exports = () => ({
  context: __dirname,
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  devtool: isEnvDevelopment && '#cheap-module-source-map',
  entry: {
    main: [
      './src/assets/index.html',
      path.join(__dirname, packageInfo.browser),
    ],
    images: [path.join(__dirname, 'src/extension-resources/icon48.png')],
  },

  watchOptions: {
    aggregateTimeout: 100,
    poll: 100,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    chunkFilename: 'chunks/[name].[chunkhash].js',
    pathinfo: isEnvDevelopment,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new WebpackCleanObsoleteChunks(),
    new CopyPlugin({
      patterns: [
        { from: './src/extension-resources/manifest.json', to: '' },
        { from: './src/extension-resources/background.js', to: '' },
        { from: './src/extension-resources/content.js', to: '' },
        { from: './src/extension-resources/icon16.png', to: '' },
        { from: './src/extension-resources/icon48.png', to: '' },
        { from: './src/extension-resources/icon128.png', to: '' },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        exclude: /node_modules/,
        loaders: isEnvProduction
          ? [babelLoader]
          : [babelLoader, 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /envconfig\.json$/,
        loader: ['./conf/propreplace-loader.js'],
      },
      {
        test: /\.html$/,
        loader: [
          'file-loader?name=[name].[ext]',
          './conf/propreplace-loader.js',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|ico)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
})
