const path = require('path')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './index.ts', // Entry point: the directory containing scripts
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // alias: {
    //   "@utils": path.resolve(__dirname, './scripts/utils'),
    // }
  },
  output: {
    filename: 'index.js', // Output filename pattern
    path: path.resolve(__dirname, './dist-package'), // Output directory
    library: { // Important: Use an object for ESM
      // name: '@ruslan-sedziukh/md-parser',
      type: 'module', // Key for ESM
    },
  },
  experiments: { // Add this for Node.js ESM compatibility
    outputModule: true,
  },
};
