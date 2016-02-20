module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {

      },
      copy: {},
      clean: {}
    }
  );

  grunt.registerTask('default', []);

};
