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
        url: config.API_HOST +'users/'+ userId+"/tasks" ,
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
        url: config.API_HOST + 'tasks/'+ payload.taskId,
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
          tasks: []
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
        getTasks(self,'user001', function updateTasks(err, response){
          var newresponse;
          console.group('@getTasks');
          console.log('err: ', err);
          console.log('response: ', response);

          //TODO: check if has err
          if (response && response.hasOwnProperty('data')) {
            newresponse = response.data;
            console.log(newresponse.data.todo);
            console.log("status: ",newresponse.status);

            Object.keys(newresponse.data).forEach(function (type) {
              newresponse.data[type].forEach(function (val) {
                self.tasks.push(val);
              });
            });

            console.log("data: ",self.tasks);
          }

          console.groupEnd();
        });
      },
      ready: function () {
        var self = this;
        var todoColumn = $('.mytasks-section .todo-column')[0];
        var ongoingColumn = $('.mytasks-section .ongoing-column')[0];
        var doneColumn = $('.mytasks-section .done-column')[0];
        var targetStatus = '';
        dragula([todoColumn, ongoingColumn, doneColumn], {
          accepts: function(el, target, source, sibling) {
            var currentStatus = el.__vue__.taskData.status;
            console.log('DRAGGING');
            console.dir(el);

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
              return true;
            }
            else if (currentStatus == 'ONGOING' && targetStatus == 'DONE') {
              return true;
            }

            return false;
          }
        }).on('drop', function (el) {
          console.dir(el);
          if (el.hasOwnProperty(('__vue__'))) {
            console.log(el);
            var currentStatus = el.__vue__.taskData.status;
            var taskData = el.__vue__.taskData;
            var payload  = {};
            payload.taskId = taskData.id;

            if (taskData.status === 'ONGOING') {
              payload.taskStatus = 'DONE';
            } else {
              if (taskData.status === 'TODO') {
                payload.taskStatus = 'ONGOING';
              }
            }

            console.log(el.__vue__);


            updateTask(self, payload, function(err, response) {
              console.group('MyTasksPage');
              console.log('updateTask');

              if (err) {
                console.log(err);
                return;
              }
              console.log(payload);
              console.log(response);
              console.dir(el);
              //event consumed by Battlefield.js
              el.__vue__.$dispatch('taskDragged', {
                el: el.__vue__,
                res: response.data.data[0]
              });

              if (currentStatus == 'TODO' && targetStatus == 'ONGOING') {
                el.__vue__.taskData.status = 'ONGOING';
              }
              else if (currentStatus == 'ONGOING' && targetStatus == 'DONE') {
                el.__vue__.taskData.status = 'DONE';
              }

            });
          }
        });


      }
    });
  });
