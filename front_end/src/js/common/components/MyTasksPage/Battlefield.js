define(['vue',
  'jquery',
  'text!./Battlefield.html',
  'animatesprite',
  './Monster'
], function (Vue, $, Template, AnimateSprite, Monster) {

  // var animate = function(action){
  //   $(".monster").animateSprite({
  //     fps: 12,
  //     animations: {
  //         die: [0, 1, 2, 3, 4, 5]
  //     },
  //     loop: false,
  //     complete: function(){
  //     }
  //   });
  // };

  return Vue.extend({
    template: Template,
    data: function () {
      return {
        monsters: []
      };
    },
    props: {
      tasks: Array
    },
    computed:  {
      isReady: function () {
        var flag = false;

        console.log(this.tasks);

        this.tasks.forEach(function (task) {
          if (task.status === 'ONGOING') {
            flag = true;
            return;
          }
        });

        return flag;
      }
    },

    components: {
      monster: Monster
    },
    events:{
      taskDragged: function(data){
        console.log('Battlefield');
        var self = this;
        console.log("el:",data.el);
        console.log(data);
        console.log(data.res);
        console.log(data.res.status);

        switch(data.res.status) {
          case 'DONE':
          self.$children.forEach(function (val, key) {
            if (val.taskData.projectId === data.res.projectId) {
              console.log(val);
              val.die();
            }
          });
          break;
        }

        // console.log("die called!");
        // animate('die');
      }
    },
    ready: function () {
      var self = this;

      console.log(self.tasks);
      self.$log('tasks');

    },
    compiled: function () {
      this.$log('tasks');

    }
  });
});
