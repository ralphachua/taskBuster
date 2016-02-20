define([
  'common/components/MyTasksPage/MyTasksPage',
  'common/components/ProjectDetailsPage/ProjectDetailsPage',
  'common/components/MyProjectsPage/MyProjectsPage'
], function (MyTasks, ProjectDetails, MyProjects) {
  return {
    'my-tasks-page' : MyTasks,
    'project-details-page' : ProjectDetails,
    'my-projects-page': MyProjects
  };
});