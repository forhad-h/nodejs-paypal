const path = require('path')

const defaultOpts = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}

const oneTimeMethod = {
  entry: './public/src/one-time-method.js',
  output: {
    filename: 'built-one-time-method.js',
    path: path.resolve(__dirname, './public/dist')
  }
}

const oneTimeFrontend1 = {
  entry: './public/src/one-time-frontend-1.js',
  output: {
    filename: 'built-one-time-frontend-1.js',
    path: path.resolve(__dirname, './public/dist')
  }
}

const oneTimeFrontend2 = {
  entry: './public/src/one-time-frontend-2.js',
  output: {
    filename: 'built-one-time-frontend-2.js',
    path: path.resolve(__dirname, './public/dist')
  }
}

module.exports = [
  defaultOpts,
  oneTimeMethod,
  oneTimeFrontend1,
  oneTimeFrontend2
]
