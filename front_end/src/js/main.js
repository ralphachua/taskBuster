define([
  'jquery',
  'vue',
  'vue-resource',
  'text!test.html',
  'common/components/ProgressBar/progressBar'
],
function ($, Vue, Resource, test, ProgressBar) {
  Vue.use(Resource);

  console.log(test);
  Vue.component('progress-bar', ProgressBar);

  var app;
  app = new Vue({
    el: '#App',
    data: {
    }
  });

});
