/**
  REGISTER PAGES TO BE USED HERE
*/
define([
  'common/components/MyTasksPage/MyTasksPage',
  'common/components/ProjectDetailsPage/ProjectDetailsPage'
], function (MyTasks, ProjectDetails) {
  return {
    'my-tasks-page' : MyTasks,
    'project-details-page' : ProjectDetails
  };
});
