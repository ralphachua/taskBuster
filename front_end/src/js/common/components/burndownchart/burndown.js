define(['vue', 'jquery', 'text!./burndown.html'], function (Vue, jquery, Template) {
  var burndown = Vue.extend({
    template: Template,
    props: {
      title: {
        type: String,
        required: false
      },
      data: {
        type: Object,
        required: false,
        twoWay: true
      }
    },
    methods: {
      requestBurndown: function() {
        console.group('@burndown');
          console.log('requestBurndown');
          var args = {
            projectId: "123-2016-1-000000001"
          };
          this.$dispatch('requestBurndown', args);
          console.log("dispatched: ", args);
        console.groupEnd();
      }
    },
    compiled: function() {

    }
  });

  return {
    burndownComponent: burndown
  };
});
