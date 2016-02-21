define(['vue',
  'jquery',
  'text!./MyProjectsPage.html'
  ],function(Vue, Jquery, Template ){

  var getProjects = function(vueComponent, xhr, done) {
    console.group('@getProjects');
    console.log(xhr);

    // var mockresponse = {
    //     status: 'success',
    //     data: [{
    //         projectId: '56c8daf3f846f71e4451eec8',
    //         projectName: 'Project Name 1',
    //         due_date: ''
    //     },
    //     {
    //         projectId: '56c8daf3f846f71e4451eec8',
    //         projectName: 'Project Name 2',
    //         due_date: '2016-02-17T08:33:23.257Z'
    //     },
    //     {
    //         projectId: '56c8daf3f846f71e4451eec8',
    //         projectName: 'Project Name 3',
    //         due_date: '2016-02-17T08:33:23.257Z'
    //     }]
    // };

    // return done(mockresponse);
    vueComponent.$http(xhr).then(function onSuccess(response) {
      console.log("onSuccess");
      console.groupEnd();
      return done(response);
    }, function onError(response) {
      console.log("onError");
      console.groupEnd();
      return done(response);
    });
  };

  var getProjectDetails = function(vueComponent, projectid, done){
    console.group('@getProjectDetails');
    var xhr = {
          url: 'http://localhost:1337/projects/' + projectid ,
          method: 'GET'
    };

    console.log(xhr);

    // var mockresponse = {
    //   status: 'success',
    //   data: {
    //     projectName: 'Project Name 2',
    //     tasksTodo: 5,
    //     tasksOngoing: 1,
    //     tasksDone: 2,
    //     dueDate: '2016-02-17T08:33:23.257Z'
    //   }
    // };

    // return done(mockresponse);
    vueComponent.$http(xhr).then(function onSuccess(response) {
      console.log("onSuccess");
      console.groupEnd();
      return done(response);
    }, function onError(response) {
      console.log("onError");
      console.groupEnd();
      return done(response);
    });
  };

  return Vue.extend({
    template: Template,

    compiled: function(){
      this.getProjects();
    },

    data: function(){
      return {projects:[]};
    },

    methods: {
      getProjects: function() {
        console.group('@getProjects');
        console.log('getProjects');

        var userId = "user001";
        var xhr = {
          url: 'http://localhost:1337/users/' + userId + '/projects',
          method: 'GET'
        };

        var self = this;
        getProjects(this, xhr, function setProjects(response) {
          var newresponse = JSON.parse(JSON.stringify(response.data));
          self.projects = newresponse.data;
          console.log("projects:: ",self.projects);
        });

        console.groupEnd();
      },

      viewProject: function(project){
        console.log(project);
        this.$dispatch('project-details', project);
        console.log(project);
        this.$router.go({name: 'project-details', query: project});
      }
    }
  });
});
