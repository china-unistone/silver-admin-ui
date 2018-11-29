const development = process.env.NODE_ENV !== 'production'

module.exports = {
  baseUrl: development ? '' : '/pc',
  configureWebpack: config => {
    if (development) {
      config.devtool = 'source-map'
    }
  }
}