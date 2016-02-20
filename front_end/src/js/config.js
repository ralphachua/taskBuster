requirejs.config({
  baseUrl: '/js/',
  paths: {
    jquery: 'vendor/jquery',
    vue : 'vendor/vue',
    'vue-resource' : 'vendor/vue-resource',
    highcharts: 'vendor/highcharts'
  },
  deps: ['main']
});
