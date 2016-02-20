/**
  REGISTER PAGES TO BE USED HERE
*/
define([
  'common/components/MyTasksPage/MyTasksPage',
  'common/components/ProjectDetailsPage/ProjectDetailsPage',
  'common/components/BadgeCapsulePage/BadgeCapsule'
], function (
    MyTasks,
    ProjectDetails,
    BadgeCapsule
  ) {
  return {
    'my-tasks-page' : MyTasks,
    'project-details-page' : ProjectDetails,
    'badge-capsule-page' : BadgeCapsule,
    'leaderboard': '<p>This is Leaderboard, yeah!</p>'

  };
});
