module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      processhtml: {
        dev: {
          options: {
            process: true,
            recursive: true
          },
          files: {
            'dist/index.html' : 'src/html/index.html'
          }
        }
      },
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
      copy: {
        dev: {
          files: [
            {
              expand: true,
              src: ['src/js/*'],
              dest: 'dist/js',
              flatten: true
            }

          ]
        }
      },
      clean: {
        dev: {
          src: ['dist/*']
        }
      }
    }
  );

  grunt.registerTask('default', ['sass:dev', 'copy:dev', 'processhtml:dev']);

};
