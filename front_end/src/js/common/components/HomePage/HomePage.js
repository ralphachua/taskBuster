define(['vue','jquery','starscroll','text!./HomePage.html', 'common/global_config', 'common/guid'],
function (Vue, $, starscroll, Template, config, guid) {

  var singin = function(vueComponent, model,done){
    model.user_id = guid();
    var xhr = {
      url: config.API_HOST +'/users',
      mode: 'POST',
      data: model
    };

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

  return Vue.extend({
    template: Template,
    data: function () {
      return {
        modalVisible: false,
        model: {
          given_name: '',
          gender: '',
          user_id: ''
        }
      };
    },
    methods:{
      signUp: function(){
        var self  = this;
        singin(this, this.model,function dologin(){
          console.log("dosign");
          self.$router.go({name: 'mytasks',});
        })
      },
      showModal: function () {
        this.modalVisible = true;
      },
      hideModal : function () {
        this.modalVisible = false;
      }
    },
    ready: function() {
      console.log("doing starscroll");
      $('#starfield').html('').starscroll(16,3,50,5,4,[96,255,255],true,true,'16-bit');
    }
  });

});
