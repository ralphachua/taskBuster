module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dev: {
          options: {
            sourceMap: true,
            outputStyle: 'expanded'
          },
          files: {
            'dist/css/styles.css' : 'src/sass/styles.scss'
          }
        }
      },
      copy: {},
      clean: {}
    }
  );

  grunt.registerTask('default', []);

};
