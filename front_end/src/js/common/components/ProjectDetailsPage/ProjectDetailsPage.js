define(['vue',
        'text!./ProjectDetailsPage.html',
        'common/components/BurndownChart/burndownChart'
      ], function (Vue, Template, Burndown) {
  return  Vue.extend({
    template: Template,
    components: {
      burndown: Burndown
    },
    beforeCompile: function () {
      console.log('before compile');
      this.$log();
      //this.query = this.route.query;
    },
    compiled: function () {
      console.log('Should get data from query obj');
      //use the contents of this.$route.query as parameters for the API call
      console.log(this.$route.query);
      this.$log();
    }
  });
});
