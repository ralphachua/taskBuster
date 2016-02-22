define(['vue','jquery','starscroll','text!./HomePage.html'], function (Vue, $, starscroll, Template) { 
  return Vue.extend({
    template: Template,
    compiled: function(){

    },
    ready: function() {
      console.log("doing starscroll");
      $('#starfield').starscroll(16,3,50,5,4,[96,255,255],true,true,'16-bit');
    }
  });

});
