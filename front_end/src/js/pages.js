/**
  REGISTER PAGES TO BE USED HERE
*/
define([
  'common/components/MyTasksPage/MyTasksPage',
  'common/components/ProjectDetailsPage/ProjectDetailsPage',
  'common/components/BadgeCapsulePage/BadgeCapsule',
  'common/components/MyProjectsPage/MyProjectsPage',
  'common/components/LeaderboardsPage/LeaderboardsPage',
  'common/components/HomePage/HomePage'
], function (
    MyTasks,
    ProjectDetails,
    BadgeCapsule,
    MyProjects,
    Leaderboards,
    HomePage
  ) {
  return {
    'my-tasks-page' : MyTasks,
    'project-details-page' : ProjectDetails,
    'badge-capsule-page' : BadgeCapsule,
    'my-projects-page' : MyProjects,
    'leaderboards': Leaderboards,
    'homepage' : HomePage
  };
});
