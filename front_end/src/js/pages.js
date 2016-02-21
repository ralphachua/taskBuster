/**
  REGISTER PAGES TO BE USED HERE
*/
define([
  'common/components/MyTasksPage/MyTasksPage',
  'common/components/ProjectDetailsPage/ProjectDetailsPage',
  'common/components/BadgeCapsulePage/BadgeCapsule',
  'common/components/MyProjectsPage/MyProjectsPage',
  'common/components/LeaderboardsPage/LeaderboardsPage'
], function (
    MyTasks,
    ProjectDetails,
    BadgeCapsule,
    MyProjects,
    Leaderboards
  ) {
  return {
    'my-tasks-page' : MyTasks,
    'project-details-page' : ProjectDetails,
    'badge-capsule-page' : BadgeCapsule,
    'my-projects-page' : MyProjects,
    'leaderboards': Leaderboards
  };
});
