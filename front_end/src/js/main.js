define([
  'jquery',
  'vue',
  'vue-resource',
  'text!test.html',
  'common/components/ProgressBar/progressBar',
  'common/components/BurndownChart/burndownChart'
],
function ($, Vue, Resource, test, ProgressBar, Burndown) {
  Vue.use(Resource);

  console.log(test);

  var app = new Vue({
    el: '#App',
    data: {
      global: {}
    },
    components: {
      burndown: Burndown
    }
  });

  Vue.component('progress-bar', ProgressBar);
  Vue.component('burndown', Burndown);

});
