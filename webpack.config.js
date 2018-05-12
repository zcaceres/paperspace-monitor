const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
  return {
    mode: 'development',
    entry: {
      'main': './src/index.js'
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'manifest.json',
          to: 'manifest.json'
        },
      ])
    ]
  }
}
