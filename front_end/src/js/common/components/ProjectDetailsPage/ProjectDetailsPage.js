define(['vue',
        'text!./ProjectDetailsPage.html',
        'common/components/BurndownChart/burndownChart'
      ], function (Vue, Template, Burndown) {
  return  Vue.extend({
    template: Template,
    components: {
      burndown: Burndown
    }
  });
});
