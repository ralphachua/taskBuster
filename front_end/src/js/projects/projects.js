define(['vue', 'jquery','text!./projects.html'],function(Vue, Jquery, Template){
  return Vue.extend({
    template: Template,
    props: {
      projectsData: {
        type: Object,
        required: false,
        twoWay: true
      }
    },
    methods: {
      getProjects: function(){
        console.group('Get Projects');
          console.log('get projects');
          var args = {
            userId: "mockuserid"
          };
          this.$dispatch('getProjects', args);
          console.log("dispatched: ", args);
        console.groupEnd();
      },

      newProject: function(){
        console.group('New Project');
          console.log('new project');
          var args = {
            userId: "mockuserid"
          };
          this.$dispatch('newProject', args);
          console.log("dispatched: ", args);
        console.groupEnd();
      }
    }
  });
});