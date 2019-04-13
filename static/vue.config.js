module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    },
    receiver: {
      entry: 'src/main-receiver.js',
      template: 'public/receiver.html',
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
