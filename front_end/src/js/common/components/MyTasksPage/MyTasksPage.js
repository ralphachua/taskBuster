define([
    'vue',
    'vue-resource',
    'text!./MyTasksPage.html',
    './Task',
    'dragula'
  ],
  function(Vue, Resource, Template, Task, dragula) {
    Vue.use(Resource);

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
          // tasks: {
          //     todo: [{
          //       taskId: 'a1bvc3',
          //       taskName: 'Battlefields UI',
          //       taskDescription: 'Create assets for the battlefield screen',
          //       taskPoints: 3
          //     }, {
          //       taskId: 'a1bvjk',
          //       taskName: 'Create Tasks API',
          //       taskDescription: 'Expose a task API',
          //       taskPoints: 3
          //     }],
          //     ongoing: [],
          //     done: [{
          //       taskId: 'ybhv213s',
          //       taskName: 'Create Login API',
          //       taskDescription: 'Expose a login API',
          //       taskPoints: 1
          //     }]
          //   }
        };
      },
      components: {
        task: Task
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

        dragula([todoColumn, ongoingColumn, doneColumn]).on('drag', function (el) {
          console.dir(el);
          if (el.hasOwnProperty(('__vue__'))) {
            el.__vue__.$dispatch('taskDragged', el.__vue__);
          }
        });


      }
    });
  });
