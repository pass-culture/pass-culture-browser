const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        include: path.join(__dirname, '..', 'src', '.stories'),
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        test: /\.(js|jsx)?$/,
      },
    ],
  },
}
