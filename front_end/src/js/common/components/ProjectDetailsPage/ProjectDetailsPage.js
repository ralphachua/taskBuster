define(['vue',
        'text!./ProjectDetailsPage.html',
        'common/components/BurndownChart/burndownChart'
      ], function (Vue, Template, Burndown) {


  var getTeamMembers = function(vueComponent, projectid, done){
    console.group('@getTeamMembers');
    var xhr = {
          url: 'http://localhost:1337/projects/' + projectid + '/members' ,
          method: 'GET'
    };

    console.log(xhr);

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
      return {
        projectData:{},
        team:[]
      };
    },
    beforeCompile: function () {
      console.log('before compile');
      this.$log();
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
        self.projectData = newresponse.data;
        console.log("data: ",self.projectData);
        console.groupEnd();
      });

      getTeamMembers(this, this.$route.query.projectId, function renderTeam(response){
        console.group("@renderTeamDetails");
        var newresponse = JSON.parse(JSON.stringify(response.data));
        console.log("status: ",newresponse.status);
        self.team = newresponse.data;
        console.log("data: ",self.team);
        console.groupEnd();
      });
    }
  });
});
