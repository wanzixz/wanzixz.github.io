module.exports = function(grunt) {
  
    // Project configuration.
    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      transport:{
        grt:{
          files:{
            '.build':['./dd/main.js','./dd/drag.js','./dd/size.js','./dd/rang.js']
          }
        }
      },
      concat:{
        grt:{
          files:{
            'dist/main.js':['.build/dd/main.js','.build/dd/drag.js','.build/dd/size.js','.build/dd/rang.js']
          }
        }
      },
      uglify:{
        grt:{
          files:{
            'dist/main.min.js':['dist/main.js']
          }
        }
      }



    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  
    // Default task(s).
    grunt.registerTask('default', ['transport','concat','uglify']);
  
  };