const config = require('./config.base');
const DashboardPlugin = require('webpack-dashboard/plugin');

const devConfig = Object.assign({}, config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
});

devConfig.plugins.push(new DashboardPlugin());

module.exports = devConfig;