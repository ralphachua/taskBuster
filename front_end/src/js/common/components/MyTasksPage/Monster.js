define( ['jquery','vue',
    'common/guid'
], function ($, Vue, guid) {
  console.log(guid);
  return Vue.extend({
    template: '<div id="m_{{guid}}" class="monster" data-state={{isAlive.toString()}}></div>',
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
      console.log(self);
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
        var avatar = $('#BattlefieldAvatar');
        console.log('%cBRB Dying', 'color:red');
        console.log(self);
        console.log($(id));

        $(id).bind('webkitAnimationEnd', function () {
          console.log('%cDead','color:red');
          $(id).css('display', 'none');
          self.$dispatch('monsterDied', self);
          avatar.removeClass('firing');
        });



        console.log('Adding class to %s', self.element.id);
        self.isAlive = false;
        avatar.addClass('firing');
      }
    }
  });

});
