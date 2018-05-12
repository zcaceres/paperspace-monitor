const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
  return {
    mode: 'production',
    entry: {
      'main': './src/index.js'
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'manifest.json',
          to: 'manifest.json'
        },
        {
          from: 'assets',
          to: 'assets'
        },
      ])
    ]
  }
}
