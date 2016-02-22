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


    console.log(config);
    var getProjects = function (vueComponent, userId, done) {
      var xhr = {
        url: config.API_HOST +'users/'+ userId+"/projects" ,
        method:'GET'
      };

      console.log(xhr);

      vueComponent.$http(xhr).then(
        function onSuccess(response) {
          console.log("getProjects.onSuccess");
          console.groupEnd();
          return done(null, response);
        },

        function onError(response) {
          console.log("getProjects.onError");
          console.groupEnd();
          return done(response);
        }
      );
    };

    var addTask = function (vueComponent, userId, done) {
    };

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
          tasks: {},
          modalVisible: false,
          addTasksModel: {
            name: '',
            desc: '',
            point: 0,
            project: ''
          }
        };
      },
      components: {
        task: Task,
        battlefield: Battlefield
      },
      methods: {
        addTask: function () {
          console.log('Add task trigger clicked');
          this.modalVisible = true;
        },
        modalClose: function () {
          this.modalVisible = false;
        },
        getUserInfo: function (callback) {
          var self = this;
          var xhr = {
            url: config.API_HOST +'users/'+ config.USER_INFO.ID ,
            method:'GET'
          };

          self.$http(xhr).then(
            function onSuccess(response) {
              console.log(response);
              return callback(null, response);
            },
            function onError (response) {
              console.log(response);
              return callback(response, null);
            }
          );
        }
      },
      compiled: function(){
        var self = this;
        this.getUserInfo(function (err, response) {
          console.log('USER INFO');
          console.log(response);
          var data;
          if (response) {
            data = response.data.data;
            config.USER_INFO.name = data.name;
            Object.assign(config.USER_INFO.activeBadge, data.activeBadge);
            Object.assign(config.USER_INFO.level, data.level);
            Object.assign(config.USER_INFO.task,  data.task);
            config.USER_INFO.totalPointsDone = data.totalPointsDone;
          }
        });

        getTasks(self, config.USER_INFO.ID, function updateTasks(err, response){
          var newresponse;
          //TODO: check if has err
          if (response && response.hasOwnProperty('data')) {
            newresponse = response.data;
            console.log(newresponse.data.todo);
            console.log("status: ",newresponse.status);

            self.tasks = newresponse.data;

            console.log("data: ",self.tasks);
            self.$dispatch('tasksLoaded', self.tasks.ongoing);
          }}
        );


        getProjects(self, config.USER_INFO.ID, function (err, response) {
          if (response) {
            console.log(response.data);

          }
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
            console.log(el);
            var currentStatus = el.__vue__.taskData.status;
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
              console.log(payload);
              console.log(response);
              console.dir(el);

              //event consumed by Battlefield.js
              el.__vue__.$dispatch('taskDragged', {
                el: el.__vue__,
                res: response.data.data[0]
              });


            });
          }
        });


      }
    });
  });
