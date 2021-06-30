var path = require('path');

module.exports = [
  {
    entry: './src/polyfill.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'spd-var.js',
      library: "spd",
      libraryTarget: 'var',
    },
    mode: 'production',
  },
  {
    entry: './js/spd.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'spd.js',
      library: "spd",
      libraryTarget: 'commonjs2',
    },
    mode: 'production',
  }
  
];
