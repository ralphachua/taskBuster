requirejs.config({
  baseUrl: '/js/',
  paths: {
    jquery: 'vendor/jquery',
    vue : 'vendor/vue',
    'vue-resource' : 'vendor/vue-resource'
  },
  deps: ['main']
});
