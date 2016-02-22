define(['vue',
  'text!./LeaderBoardsPage.html',
  'common/global_config'
  ],function(Vue, Template, config){

    var getLeaderBoardProjects = function(vueComponent,done){
      var xhr = {
        url: config.API_HOST + "leaders/projects" ,
        method:'GET'
      };

      console.log(xhr);

      var mockdata = {
        status: 'success',
        data: [
        {
            projectName: 'Project Name 2', 
            tasksDone: 11,
            tasksTotal: 20,
            members: [{
                      userName: 'Fountain',
                      gender: 'mae',
                      avatarUrl: 'img/4564'
                    },
                  {
                    userName: 'Pen',
                    gender: 'female',
                    avatarUrl: 'img/5675'
                  }
            ]},
        {
            projectName: 'Project Name ', 
            tasksDone: 11,
            tasksTotal: 30,
            members: [{
                    userName: 'Fountain',
                    gender: 'male',
                    avatarUrl: 'img/4564'
                },
                {
                    userName: 'Pen',
                    gender: 'female',
                    avatarUrl: 'img/5675' 
                },
                {
                    userName: 'AJ',
                    gender: 'female',
                    avatarUrl: 'img/1235645'
                }
            ]
        }
    ]
};
      // return done(null, mockdata);
      vueComponent.$http(xhr).then(
        function onSuccess(response) {
          console.log("getLeaderBoardProjects.onSuccess");
          console.groupEnd();
          return done(null, response);
        },

        function onError(response) {
          console.log("getLeaderBoardProjects.onError");
          console.groupEnd();
          return done(response);
        }
      );
    };

    var getLeaderBoardUsers = function(vueComponent, done){
      var xhr = {
        url: config.API_HOST + "leaders/users" ,
        method:'GET'
      };

      console.log(xhr);

      var mockdata = {
        status: 'success',
        data: [{
            user_name: 'Big Beear',
            gender: 'male',
            avatarUrl: '/avatar/13123',
            activeBadge: {
                badgeUrl: 'img/353',
                badgeName: 'Sojourner'
            },
            level: {
                levelName: 'level 2',
                totalPoints: 55
            },
            badges: [{
                    badgeUrl: 'img/353',
                    badgeName: 'Sojourner'
                },
                {
                    badgeUrl: 'img/56789',
                    badgeName: 'Space Trainee'
                },
                {
                    badgeUrl: 'img/1234',
                    badgeName: 'Destroyer'
                }
            ]
        },
        {
            user_name: 'Big kl',
            gender: 'female',
            avatarUrl: '/avatar/13123',
            activeBadge: {
                badgeUrl: 'img/353',
                badgeName: 'Sojourner'
            },
            level: {
                levelName: 'level 2',
                totalPoints: 55
            },
            badges: [{
                    badgeUrl: 'img/353',
                    badgeName: 'Sojourner'
                },
                {
                    badgeUrl: 'img/56789',
                    badgeName: 'Space Trainee'
                },
                {
                    badgeUrl: 'img/1234',
                    badgeName: 'Destroyer'
                }
            ]
        }]
      };
    // return done(null, mockdata);
      vueComponent.$http(xhr).then(
        function onSuccess(response) {
          console.log("getLeaderBoardUsers.onSuccess");
          console.groupEnd();
          return done(null, response);
        },

        function onError(response) {
          console.log("getLeaderBoardUsers.onError");
          console.groupEnd();
          return done(response);
        }
      );
    };
  

  return Vue.extend({
    template: Template,

    compiled: function(){
    },

    data: function(){
      return {projects:[],
        users:[]};
    },

    compiled: function(){
      this.retrieveData();
    },

    methods:{
      retrieveData: function(){
        var self = this;
        getLeaderBoardProjects(this, function renderProjectLeaderBoard(err, response){
          console.group("@renderProLeaderBoard");
          console.log("resp.data: ",response.data);
          var newresponse = JSON.parse(JSON.stringify(response.data));
          self.projects = newresponse.data;
          console.log("self.projects: ",self.projects);
          console.groupEnd();
        });

        getLeaderBoardUsers(this, function renderUserLeaderBoard(err, response){
          console.group("@renderUserLeaderBoard");
          console.log("resp.data: ",response.data);
          var newresponse = JSON.parse(JSON.stringify(response.data));
          self.users = newresponse.data;
          console.log("self.users: ",self.users);
          console.groupEnd();
        });
      },
      showTaskBusters: function(){
        $('#leaderboards_projects').css("visibility", "hidden");
        $('#leaderboards_task').css("visibility", "visible");
      },
      showProjects: function(){
        $('#leaderboards_projects').css("visibility", "visible");
        $('#leaderboards_task').css("visibility", "hidden");
      }
    }
  });
});