define( ['jquery','vue'
], function ($, Vue, animateSprite) {
  console.log($);
  return Vue.extend({
    template: '<div class="monster"></div>',
    props: {
      taskData: Object
    },
    data: function () {
      return {
        element: null,
        isAlive: true,
        animate: null
      };
    },
    compiled: function () {
      var self = this;
      this.element  = this.$el;

      $(this.element).animateSprite({
        fps: 12,
        loop: true
      });

    },
    methods: {
      die: function () {
        var self = this;

        $(self.element).bind('webkitAnimationEnd', function () {
          console.log('%cDead','color:red');
          self.$dispatch('monsterDied', self);
        });

        $(self.element).addClass('dead');
      }
    }
  });

});
