define(['vue',
  'jquery',
  'text!./Battlefield.html',
  'animatesprite'
], function (Vue, $, Template, AnimateSprite) {
  
  var animate = function(action){
    $(".monster").animateSprite({
      fps: 12,
      animations: {
          die: [0, 1, 2, 3, 4, 5]
      },
      loop: false,
      complete: function(){
      }
    });
  };

  return Vue.extend({
    template: Template,
    events:{
      'taskDragged': function(el){
        console.log("el:",el);
        console.log("die called!");
        animate('die');
      }
    }
  });
});
