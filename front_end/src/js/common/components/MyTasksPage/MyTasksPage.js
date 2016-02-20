define([
    'vue',
    'text!./MyTasksPage.html',
    './Task',
    'dragula'
  ],
  function(Vue, Template, Task, dragula) {
    return Vue.extend({
      template: Template,
      data: function() {
        return {
          tasks: {
              todo: [{
                taskId: 'a1bvc3',
                taskName: 'Battlefields UI',
                taskDescription: 'Create assets for the battlefield screen',
                taskPoints: 3
              }, {
                taskId: 'a1bvjk',
                taskName: 'Create Tasks API',
                taskDescription: 'Expose a task API',
                taskPoints: 3
              }],
              ongoing: [],
              done: [{
                taskId: 'ybhv213s',
                taskName: 'Create Login API',
                taskDescription: 'Expose a login API',
                taskPoints: 1
              }]
            }
        };
      },
      components: {
        task: Task
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
