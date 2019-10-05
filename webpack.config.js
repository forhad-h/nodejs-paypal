const path = require('path')

const defaultOpts = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}

const main = {
  entry: './public/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public/dist')
  }
}

const frontEndOnly2 = {
  entry: './public/src/front-end-only-2.js',
  output: {
    filename: 'built-front-end-only-2.js',
    path: path.resolve(__dirname, './public/dist')
  }
}

module.exports = [defaultOpts, main, frontEndOnly2]
