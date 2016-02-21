define([
    'vue',
    'text!./MyTasksPage.html',
    './Task',
    'dragula',
    './Battlefield',
    'common/global_config'
  ],
  function(
    Vue,
    Template,
    Task,
    dragula,
    Battlefield,
    config
  ) {
    var getTasks = function(vueComponent, userId, done){
      var xhr = {
        url: config.API_HOST + userId+"/tasks" ,
        method:'GET'
      };

      console.log(xhr);

      vueComponent.$http(xhr).then(
        function onSuccess(response) {
          console.log("getTasks.onSuccess");
          console.groupEnd();
          return done(null, response);
        },

        function onError(response) {
          console.log("getTasks.onError");
          console.groupEnd();
          return done(response);
        }
      );

    };

    var updateTask = function(vueComponent, payload, done) {
      console.group("@MyTasksPage");
      console.log("updateTask");
      console.log("payload");
      console.log(payload);
      var xhr = {
        url: config.API_HOST + payload.taskId,
        method:'PUT',
        data: payload
      };

      console.log("xhr");
      console.log(xhr);

      vueComponent.$http(xhr).then(
        function onSuccess(response) {
          console.log('updateTask.onSuccess');
          return done(null, response);
        },

        function onError(response) {
          console.log('updateTask.onError');
          return done(response);
        }
      );

      console.groupEnd();
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
        getTasks(this,'user001', function updateTasks(err, response){
          console.group('@getTasks');
          console.log('err: ', err);
          console.log('response: ', response);

          //TODO: check if has err

          var newresponse = JSON.parse(JSON.stringify(response.data));

          console.log("status: ",newresponse.status);
          self.tasks = newresponse.data;
          console.log("data: ",self.tasks);
          console.groupEnd();
        });
      },
      ready: function () {
        var self = this;
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
            var taskData = el.__vue__.taskData;
            var payload = {
              taskId: taskData.id,
              taskStatus: taskData.status
            };

            updateTask(self, payload, function(err, response) {
              console.group('MyTasksPage');
              console.log('updateTask');

              if (err) {
                console.log(err);
                return;
              }

              console.log(response);
              el.__vue__.$dispatch('taskDragged', el.__vue__);
            });
          }
        });


      }
    });
  });
