const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@user': path.resolve(__dirname, 'src/site/user'),
      '@admin': path.resolve(__dirname, 'src/site/admin'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@resources': path.resolve(__dirname, 'src/resources'),
      '@images': path.resolve(__dirname, 'src/resources/images'),
      '@strings': path.resolve(__dirname, 'src/resources/strings'),
      '@styles': path.resolve(__dirname, 'src/resources/styles'),
      '@data-access': path.resolve(__dirname, 'src/data-access'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@redux-store': path.resolve(__dirname, 'src/redux-store'),
      '@actions': path.resolve(__dirname, 'src/redux-store/actions'),
      '@hook': path.resolve(__dirname, 'src/hook'),
      '@svg': path.resolve(__dirname, 'src/resources/svg'),
    },
  };

  return config;
};
