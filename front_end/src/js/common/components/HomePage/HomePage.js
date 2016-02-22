define(['vue','jquery','starscroll','text!./HomePage.html', 'common/global_config', 'common/guid'],
function (Vue, $, starscroll, Template, config, guid) {
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
      signIn: function(){
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
