define([
  'jquery',
  'vue',
  'vue-resource',
  'text!test.html',
  'common/components/burndownchart/burndown'
],
function ($, Vue, Resource, test, burndown) {
  Vue.use(Resource);
  console.log(test);

  var app = new Vue({
    el: '#App',
    data: {
      global: {}
    },
    components: {
      burndown: burndown.burndownComponent
    }
  });

  app.$on('requestBurndown', function(args) {
    console.group('@main');
      console.log('requestBurndown');
      console.log(args);

      var xhr = {
        url: 'http://localhost:1337/loans/' + args.projectId + '/overview',
        method: 'GET'
      };

      this.$http(xhr).then(function onSuccess(response) {
        console.log("Success");
        console.log(response);
      }, function onError(response) {
        console.log("Error");
        console.log(response);
      });

    console.groupEnd();
  });
});
