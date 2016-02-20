define([
  'jquery',
  'vue',
  'vue-resource',
  'gridster'
],
function ($, Vue, Resource, gridster) {
  Vue.use(Resource);

  $('.task-table__columns.gridster').gridster({
    widget_selector: '.task-table__item',
    widget_margins: [10, 10],
    widget_base_dimensions: [240, 240],
    min_cols: 3
  });

});
