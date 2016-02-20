requirejs.config({
  baseUrl: '/js/',
  paths: {
    jquery: 'vendor/jquery',
    vue : 'vendor/vue',
    'vue-resource' : 'vendor/vue-resource',
    'vue-router' : 'vendor/vue-router',
    'gridster' : 'vendor/gridster',
    highcharts: 'vendor/highcharts'
  },
  deps: ['main']
});
