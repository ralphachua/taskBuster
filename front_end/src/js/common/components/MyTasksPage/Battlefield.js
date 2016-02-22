define(['vue',
  'jquery',
  'text!./Battlefield.html',
  'animatesprite',
  './Monster'
], function (Vue, $, Template, AnimateSprite, Monster) {

  return Vue.extend({
    template: Template,
    data: function () {
      return {
        init: false,
        monsters: []
      };
    },
    props: {
      tasks: Object
    },
    watch: {
      tasks: function (val, oldVal) {
        var self = this;
        console.log('%cTASKS UPDATED', 'color:blue; font-size: 20px');
        console.log(val.ongoing);
        if (!self.init) {
          val.ongoing.forEach(function (t) {
            self.monsters.push(t);
          });
          self.init = true;
        }
      }
    },
    computed:  {
      isReady: function () {
        var flag = false;

        flag = !!this.monsters.length;

        return flag;
      }
    },

    components: {
      monster: Monster
    },
    events:{
      tasksLoaded: function (list) {
        console.log('Tasks loaded!');
        console.log(list);
      },
      taskDragged: function(data){
        console.log('Battlefield');
        var self = this;
        console.log("el:",data.el);
        console.log(data);
        console.log(data.res);
        console.log(data.res.status);

        switch(data.res.status) {
          case 'ONGOING' :
            //spawn monster
            self.monsters.push(data.res);

          break;
          case 'DONE':
          console.log('%cSOMEONE SHOULD DIE', 'color:red');
          self.$children.forEach(function (val, key) {
            console.log('%s: %s', val.taskData.id,data.res.id);
            console.log(val.taskData.id === data.res.id);
            if (val.taskData.id === data.res.id) {
              console.log(val);
              val.die();
              return;
            }
          });
          break;
        }

        // console.log("die called!");
        // animate('die');
      }
    },
    beforeCompile: function () {
      var self = this;
      self.$log();
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
