define([
  'jquery',
  'vue',
  'vue-resource',
  'common/components/ProgressBar/progressBar',
  'pages'
],
function ($, Vue, Resource, ProgressBar, Pages) {
  Vue.use(Resource);
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
    components: Pages,
    compiled: function () {

    }
  });

});
