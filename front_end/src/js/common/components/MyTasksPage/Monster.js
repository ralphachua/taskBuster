define( ['jquery','vue',
    'common/guid'
], function ($, Vue, guid) {
  console.log(guid);
  return Vue.extend({
    template: '<div id="m_{{guid}}" class="monster"></div>',
    props: {
      taskData: Object
    },
    data: function () {
      return {
        guid: guid(),
        element: null,
        isAlive: true,
        animate: null
      };
    },
    compiled: function () {
      var self = this;
      this.element  = this.$el;
      console.dir(this.element);
      $(this.element.id).animateSprite({
        fps: 12,
        loop: true
      });

    },
    methods: {
      die: function () {
        var self = this;
        var id = '#'.concat(self.element.id);
        console.log('%cBRB Dying', 'color:red');

        console.log($(id));

        $(id).bind('webkitAnimationEnd', function () {
          console.log('%cDead','color:red');
          $(id).css('display', 'none');
          self.$dispatch('monsterDied', self);
        });

        $(id).addClass('dead');
      }
    }
  });

});
