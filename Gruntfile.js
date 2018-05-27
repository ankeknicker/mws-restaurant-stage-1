/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
              name: "small",
              width: 450,
              quality: 40,
              suffix: "1x"
            /*
            Change these:
            
            width: ,
            suffix: ,
            quality:
            */
          },{
              name: "middle",
              width: 600,
              quality: 70,
              suffix: "2x"
          }, {
            name: "big",
              width: 800,
              quality: 100,
              suffix: "2x"
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'images/'
        }]
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

      ts: {
          default: {
              files: {
                  'TSTemp': ['TS/**/*.ts', '!TS/.baseDir.ts']
              },
              options: {
                  target: 'es6',
                  moduleResolution: 'node',
                  types: 'node',
                  typeRoots: 'node_modules/@types'
              }
          }
      },
      babel: {
          options: {
              sourceMap: true
          },
          dist: {
              files: [{
                  expand: true,
                  cwd: "TSTemp",
                  src: "**/*.js",
                  dest: "TS",
                  ext: ".js"
              }]
          }
      },

      /* clear the typescript temp files, typescript baseDir, and images directory */
      clean: {
          tsTemp: ["TSTemp"],
          tsFile: ["TS/.baseDir.ts"],
          dev: {
              src: ['images'],
          },
      },
  });
  
  grunt.loadNpmTasks('grunt-responsive-images','grunt-contrib-clean','grunt-contrib-copy','grunt-mkdir','grunt-ts','grunt-babel');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'ts:default', 'babel', 'clean:tsTemp', 'clean:tsFile']);

};
