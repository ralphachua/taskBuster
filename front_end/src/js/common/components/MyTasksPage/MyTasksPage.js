define([
    'vue',
    'text!./MyTasksPage.html',
    './Task',
    'dragula',
    './Battlefield'
  ],
  function(
    Vue,
    Template,
    Task,
    dragula,
    Battlefield
  ) {
    var getTasks = function(vueComponent, userId, done){
      var xhr = {
        url:'http://localhost:1337/users/' + userId+"/tasks" ,
        method:'GET'
      };

      console.log(xhr);

      vueComponent.$http(xhr).then(function onSuccess(response) {
      console.log("onSuccess");
      console.groupEnd();
      return done(response);
      }, function onError(response) {
      console.log("onError");
      console.groupEnd();
      return done(response);
    });

    };
    return Vue.extend({
      template: Template,
      data: function() {
        return {
          tasks:{}
        };
      },
      components: {
        task: Task,
        battlefield: Battlefield
      },
      compiled: function(){
        var self = this;
        console.log("compile");
        // comment if you're going to use mock data
        getTasks(this,'user001', function updateTasks(response){
          console.group("@updateTasks");
          var newresponse = JSON.parse(JSON.stringify(response.data));
          console.log("status: ",newresponse.status);
          self.tasks = newresponse.data;
          console.log("data: ",self.tasks);
          console.groupEnd();
        });
      },
      ready: function () {
        var todoColumn = $('.mytasks-section .todo-column')[0];
        var ongoingColumn = $('.mytasks-section .ongoing-column')[0];
        var doneColumn = $('.mytasks-section .done-column')[0];
        console.log(todoColumn);

        dragula([todoColumn, ongoingColumn, doneColumn], {
          accepts: function(el, target, source, sibling) {
            var currentStatus = el.__vue__.taskData.status;
            var targetStatus = '';
            if (target.className.indexOf('todo-column') > -1) {
              targetStatus = 'TODO';
            }
            else if (target.className.indexOf('ongoing-column') > -1) {
              targetStatus = 'ONGOING';
            }
            else if (target.className.indexOf('done-column') > -1) {
              targetStatus = 'DONE';
            }

            // Rules
            if (currentStatus == 'TODO' && targetStatus == 'ONGOING') {
              el.__vue__.taskData.status = 'ONGOING';
              return true;
            }
            else if (currentStatus == 'ONGOING' && targetStatus == 'DONE') {
              el.__vue__.taskData.status = 'DONE';
              return true;
            }

            return false;
          }
        }).on('drop', function (el) {
          console.dir(el);
          if (el.hasOwnProperty(('__vue__'))) {
            el.__vue__.$dispatch('taskDragged', el.__vue__);
          }
        });


      }
    });
  });
