define([
    'vue',
    'text!./MyTasksPage.html',
    'gridster'
  ],
  function(Vue, Template, Gridster) {
    return Vue.extend({
      template: Template,
      data: function() {
        return {
          tasks: {
            status: 'success',
            data: {
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
          }
        };
      }
    });
  });
