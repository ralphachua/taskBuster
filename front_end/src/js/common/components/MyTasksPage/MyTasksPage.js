define([
  'vue',
  'text!./MyTasksPage.html',
  'gridster'
],
function (Vue, Template, Gridster) {
  return Vue.extend({
    template: Template
  });
});
