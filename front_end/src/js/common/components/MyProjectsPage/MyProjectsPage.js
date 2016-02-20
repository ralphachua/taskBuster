define(['vue',
  'jquery',
  'vue-resource',
  'text!./MyProjectsPage.html'
  ],function(Vue, Jquery, Resource, Template ){

  Vue.use(Resource);

  var getProjects = function(vueComponent, xhr, done) {
    console.group('@getProjects');
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

    return done(mockresponse);
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

  var getProjectDetails = function(vueComponent, projectid, done){
    console.group('@getProjectDetails');
    var xhr = {
          url: 'http://localhost:1337/projects/' + projectid ,
          method: 'GET'
    };

    console.log(xhr);

    var mockresponse = {
      status: 'success',
      data: {
        projectName: 'Project Name 2',
        tasksTodo: 5,
        tasksOngoing: 1,
        tasksDone: 2,
        dueDate: '2016-02-17T08:33:23.257Z'
      }
    };

    return done(mockresponse);
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
    // components: {
    //   'project-item' : ProjectItem
    // },

    compiled: function(){
      this.getProjects();
    },

    data: function(){
      return {projects:[]};
    },

    ready: function(){
      console.log(this.projects);
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

        var self = this;
        getProjects(this, xhr, function setProjects(response) {
          console.log("Response:: ",response);
          self.projects = response.data;
        });

        console.groupEnd();
      },

      viewProject: function(project){
        this.$dispatch('project-details', project);
      }
    }
  });
});