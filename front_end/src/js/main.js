define([
  'jquery',
  'vue',
  'vue-resource',
  'text!test.html',
  'common/components/ProgressBar/progressBar',
  'common/components/burndownchart/burndown',
  'projects/projects',
  'projects/projectsData',
  'projects/projectentry'
],
function ($, Vue, Resource, test, ProgressBar, burndown, projectscomponent, ProjectData, projectEntry) {
  Vue.use(Resource);
  console.log(test);

  Vue.component('progress-bar', ProgressBar);
  Vue.component('project-entry', projectEntry);

  var projectData = ProjectData;

  var app = new Vue({
    el: '#App',
    data: {
      global: {
        projectsData: projectData
      }
    },
    components: {
      burndown: burndown.burndownComponent,
      projects: projectscomponent
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

  app.$on('getProjects', function(args) {
    console.group('@Get Projects');
      console.log('getProjects');
      console.log(args);

      var req = {
        url: 'http://localhost:1337/users/' + args.userId + '/projects',
        method: 'GET'
      };

      this.$http(req).then(function onSuccess(response) {
        console.log("Success");
        console.log(response.data);
      }, function onError(response) {
        console.log("Error");
        console.log(response);
      });

    console.groupEnd();
  });


});
