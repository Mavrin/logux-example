require('./src/server/server');
// run webpack
const config = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
  hot: true,
  inline: true,
  contentBase: './build/'
});
server.listen(8080);