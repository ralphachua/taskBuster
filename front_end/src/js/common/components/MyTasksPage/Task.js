define(['vue', 'text!./Task.html'], function (Vue, Template) {
  return Vue.extend({
    template: Template,
    props: {
      taskData: Object
    }
  });
});
