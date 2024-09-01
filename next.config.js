const path = require('path');

module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/, // Add your desired video formats here
      use: {
        loader: 'file-loader',
        options: {
          publicPath: `/_next/static/videos/`, // Where the files will be accessible
          outputPath: 'static/videos/', // Where the files will be saved in the project
          name: '[name].[hash].[ext]', // File naming convention with a hash for cache-busting
          esModule: false, // Ensure compatibility with CommonJS modules
        },
      },
    });

    return config;
  },
};
