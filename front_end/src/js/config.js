requirejs.config({
  baseUrl: '/js/',
  paths: {
    jquery         : 'vendor/jquery',
    vue            : 'vendor/vue',
    'vue-resource' : 'vendor/vue-resource',
    'vue-router'   : 'vendor/vue-router',
    dragula        : 'vendor/dragula',
    highcharts     : 'vendor/highcharts',
    phaser         : 'vendor/phaser',
    animatesprite  : 'vendor/jquery.animateSprite.min',
    datedropper    : 'vendor/datedropper.min',
    auth0          : '//cdn.auth0.com/js/lock-8.2.min',
    starscroll   : 'vendor/starscroll.min'
  },
  shim: {
    animatesprite: ['jquery'],
    starscroll: ['jquery']
  },
  deps: ['main']
});

console.log(requirejs);
