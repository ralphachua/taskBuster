define([
  'jquery',
  'vue',
  'vue-resource',
  'vue-router',
  'common/components/ProgressBar/progressBar',
  'pages'
],
function (
  $,
  Vue,
  Resource,
  Router,
  ProgressBar,
  Pages
  ) {
  Vue.use(Resource);
  Vue.use(Router);
  Vue.component('progress-bar', ProgressBar);

  var AppView;
  var grids;
  AppView = Vue.extend({
    data: function() {
      return {
        isSidebarOn: false
      };
    },
    methods: {
      toggleSidebar: function () {
        this.isSidebarOn = !this.isSidebarOn;
      }
    }
  });

  var router = new Router();
  router.map({
    '/': {
      component: Pages['my-tasks-page']
    },
    '/my-project': {
      component: Pages['project-details-page']
    },
    '/badge-capsule': {
      component: Pages['badge-capsule-page']
    },
    '/leaderboards': {
      component: Pages['leaderboard']
    }
  });

  router.start(AppView, '#App');

});
