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
  Pages) {
  Vue.use(Resource);
  Vue.use(Router);
  Vue.component('progress-bar', ProgressBar);

  var AppView;
  var grids;
  AppView = new Vue({
    el: '#App',
    data: {
      isSidebarOn: false
    },
    methods: {
      toggleSidebar: function () {
        this.isSidebarOn = !this.isSidebarOn;
      }
    },
    components: Pages
  });


});
