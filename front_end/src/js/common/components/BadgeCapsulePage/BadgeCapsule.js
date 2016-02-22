define(['vue', 'text!./BadgeCapsule.html', 
        'common/global_config'], function (Vue, Template, config) {

    var getBadges = function(vueComponent,done){
      var xhr = {
        url:config.API_HOST + "leaders/users",
        method: "GET"
      };

        var mockdata={"status": "success",
    "data": [
        {
            badgeId: 'qwe098',
            badgeName: 'Space Trainee',
            badgeUrl: '/badge/qwe098',
            requiredPoints: 0,
            id: '56c8d9b8680017199100c3c4'
        },
        {
            badgeId: 'asd765',
            badgeName: 'Space Trainee',
            badgeUrl: '/badge/asd765',
            requiredPoints: 20,
            id: '56c8d9b8680017199100c3c5'
        },
        {
            badgeId: 'zxc123',
            badgeName: 'Soujourner',
            badgeUrl: '/badge/zxc123',
            requiredPoints: 40,
            id: '56c8d9b8680017199100c3c6'
        }
    ]};
    return done(null,mockdata);
      //   vueComponent.$http(xhr).then(function onSuccess(response) {
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

      data: function(){
        return {badges:[]}},

      compiled: function(){
        this.retrieveBadges();
      },
      methods:{
        retrieveBadges: function(){
            var self = this;
            getBadges(this, function renderBadges(err, response){
              console.group("@retrieveBadges");
              console.log("response: ",response.data);
              self.badges = response.data;
              console.log("self.badges: ",self.badges);
              console.groupEnd();
            });
        }
      } 
    });
});
