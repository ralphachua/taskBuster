define(['vue',
        'vue-resource',
        'text!./ProjectDetailsPage.html',
        'common/components/BurndownChart/burndownChart'
      ], function (Vue, Resource, Template, Burndown) {
  
  Vue.use(Resource);

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

  return  Vue.extend({
    template: Template,
    components: {
      burndown: Burndown
    },
    data: function(){
      return {projectData:{}};
    },
    beforeCompile: function () {
      console.log('before compile');
      this.$log();
      //this.query = this.route.query;
    },
    compiled: function () {
      console.log('Should get data from query obj');
      //use the contents of this.$route.query as parameters for the API call
      var self = this;
      console.log(this.$route.query);
      this.$log();

      getProjectDetails(this, this.$route.query.projectId,function renderProjectDetails(response){
        console.group("@renderProjectDetails");
        var newresponse = JSON.parse(JSON.stringify(response.data));
        console.log("status: ",newresponse.status);
        self.projectData = newresponse.data;//JSON.parse(JSON.stringify(newresponse.data));
        console.log("data: ",self.projectData);
        console.groupEnd();
      })
    }
  });
});
