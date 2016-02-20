requirejs.config({
  baseUrl: '/js/',
  paths: {
    jquery         : 'vendor/jquery',
    vue            : 'vendor/vue',
    'vue-resource' : 'vendor/vue-resource',
    'vue-router'   : 'vendor/vue-router',
    dragula        : 'vendor/dragula',
    highcharts     : 'vendor/highcharts'
  },
  deps: ['main']
});
