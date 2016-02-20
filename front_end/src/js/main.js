define([
  'jquery',
  'vue',
  'vue-resource',
  'common/components/ProgressBar/progressBar',
  'gridster'
],
function ($, Vue, Resource, ProgressBar, gridster) {
  Vue.use(Resource);

  Vue.component('progress-bar', ProgressBar);

  var app;
  app = new Vue({
    el: '#App',
    data: {
    }
  });

  $('.task-table__columns.gridster').gridster({
    widget_selector: '.task-table__item',
    widget_margins: [10, 10],
    widget_base_dimensions: [240, 240],
    min_cols: 3
  });



});
