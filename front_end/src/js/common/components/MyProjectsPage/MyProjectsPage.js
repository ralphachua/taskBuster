define(['vue',
  'jquery',
  'vue-resource',
  'text!./MyProjectsPage.html',
  'common/components/ProjectItem/ProjectItem'
  ],function(Vue, Jquery, Resource, Template, ProjectItem){

  Vue.use(Resource);

  var getProjects = function(vueComponent, xhr, done) {
    console.group('@getProjects');
    console.log(vueComponent);
    console.log(xhr);
    var mockresponse = {
    status: 'success',
    data: [{
        projectId: 'hja12',
        projectName: 'Project Name 1',
        due_date: ''
    },
    {
        projectId: 'hja123',
        projectName: 'Project Name 2',
        due_date: '2016-02-17T08:33:23.257Z'
    },
    {
        projectId: 'hja1234',
        projectName: 'Project Name 3',
        due_date: '2016-02-17T08:33:23.257Z'
    }]
};
    return done(response);
    // vueComponent.$http(xhr).then(function onSuccess(response) {
    //   console.log("onSuccess");
    //   console.groupEnd();
    //   return done(response);
    // }, function onError(response) {
    //   console.log("onError");
    //   console.groupEnd();
    //   return done(response);
    // });
  };

  return Vue.extend({
    template: Template,
    props: {
      projectsData: {
        type: Object,
        required: false,
        twoWay: true
      }
    },
    components: {
      'project-item' : ProjectItem
    },

    ready: function(){
      this.getProjects;
    },

    data:{
      projects: []
    },

    methods: {
      getProjects: function() {
        console.group('@getProjects');
        console.log('getProjects');

        var userId = "userid";
        var xhr = {
          // url: 'http://localhost:1337/users/' + userId + '/projects',
          // method: 'GET'
        };

        getProjects(this, xhr, function setProjects(response) {
         console.log(response);
         this.projects = response.data;
        });

        console.groupEnd();
      }
    }
  });
});