define([
  'jquery',
  'vue',
  'vue-resource',
  'vue-router',
  'common/components/ProgressBar/progressBar',
  'pages',
  'common/global_config',
  'auth0'
],
function (
  $,
  Vue,
  Resource,
  Router,
  ProgressBar,
  Pages,
  global,
  Auth0
  ) {

  Vue.use(Resource);
  Vue.use(Router);
  Vue.component('progress-bar', ProgressBar);

  console.log(Auth0);

  var AppView;

  AppView = Vue.extend({
    data: function() {
      return {
        userData: global.USER_INFO,
        isSidebarOn: false
      };
    },
    methods: {
      toggleSidebar: function () {
        this.isSidebarOn = !this.isSidebarOn;
      }
    },
    events: {
      'project-details': function (project) {
      console.log("dispatch project-details: ",project);
      },
      'taskDragged': function (el) {
      console.log("taskDragged");
      this.$broadcast('taskDragged',el);
      }
  }
  });

  var router = new Router();
  router.map({
    '/': {
      component: Pages['my-tasks-page']
    },
    '/my-projects' : {
      component: Pages['my-projects-page']
    },
    '/project-details' : {
      name: 'project-details',
      component: Pages['project-details-page']
    },
    '/badge-capsule': {
      component: Pages['badge-capsule-page']
    },
    '/leaderboards': {
      //component: Pages['leaderboards']
    }
  });

  router.start(AppView, '#App');

});
