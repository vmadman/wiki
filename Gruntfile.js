var createIndex = function (grunt, taskname) {
    'use strict';
    var conf = grunt.config('index')[taskname],
        tmpl = grunt.file.read(conf.template);

    // register the task name in global scope so we can access it in the .tmpl file
    grunt.config.set('currentTask', {name: taskname});

    grunt.file.write(conf.dest, grunt.template.process(tmpl));
    grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.template + '\'');
};
/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    // Project configuration.

    grunt.initConfig({
    // Metadata.
        pkg: {
            name: 'markdown-wiki',
            version: '0.0.1'
        },

        ownJsFiles: [
          'js/marked.js',
          'js/init.js',
          'js/logging.js',
          'js/stage.js',
          'js/main.js',
          'js/util.js',
          'js/modules.js',
          'js/basic_skeleton.js',
          'js/bootstrap.js',
          'js/gimmicker.js',

          // gimmicks
          'js/gimmicks/alerts.js',
          'js/gimmicks/colorbox.js',
          'js/gimmicks/carousel.js',
          'js/gimmicks/disqus.js',
          'js/gimmicks/facebooklike.js',
          'js/gimmicks/forkmeongithub.js',
          'js/gimmicks/gist.js',
          'js/gimmicks/googlemaps.js',
          'js/gimmicks/highlight.js',
          'js/gimmicks/iframe.js',
          'js/gimmicks/math.js',
          'js/gimmicks/themechooser.js',
          'js/gimmicks/twitter.js',
          'js/gimmicks/youtube_embed.js',
          'js/gimmicks/yuml.js'
        ],
        cssFiles: [
          'css/wiki.css',
          'tmp/colorbox.css',
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/prism/themes/prism.css'
        ],
        // the jquery colorbox requires a special set of images, you can
        // swap the theme directory here to get the ones you want.
        imgFiles: [
          'bower_components/jquery-colorbox/example1/images'
        ],
        // the jquery-colorbox has a default path of "./images" for all of its
        // image assets. This isn't always desired, so the stylesheet will get
        // a replacement string here that lets you declare an intended path.
        imgReplace: {
          pattern: 'url(images/',
          replacement: 'url(/blog/images/colorbox/'
        },
        // used to replace image paths in the compiled stylesheet to
        // suit your site's directory structure
        "string-replace" : {
          dist: {
            files: [
              {
                src: [ 'bower_components/jquery-colorbox/example1/colorbox.css' ],
                dest: 'tmp/colorbox.css'
              }
            ],
            options: {
              replacements: [ '<%= imgReplace %>' ]
            }
          }
        },
        // REMEMBER:
        // * ORDER OF FILES IS IMPORTANT
        // * ALWAYS ADD EACH FILE TO BOTH minified/unminified SECTIONS!
        jsFiles: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					'bower_components/prism/prism.js',
					'bower_components/jquery-colorbox/jquery.colorbox.js'
        ],
        concat: {
          options: {
            //banner: '<%= banner %>',
            stripBanners: true
          },
          dev: {
            src: '<%= ownJsFiles %>',
            dest: 'tmp/wiki.js'
          },
          bundle: {
            src: [ '<%= ownJsFiles %>', '<%= jsFiles %>' ],
            dest: 'tmp/bundle.js'
          }
        },
        // minify the sources if desired.
        uglify: {
          options: {
            // banner: '<%= banner %>'
          },
          dist: {
            src: '<%= concat.dev.dest %>',
            dest: 'dist/wiki.min.js'
          }
        },
        index: {
          release: {
            template: 'template.html',
            dest: 'tmp/release/index.html'
          }
        },
        /* make it use .jshintrc */
        jshint: {
          options: {
            curly: false,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: false,
            boss: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true,
              marked: true,
              google: true,
              hljs: true,
              /* leaflet.js*/
              L: true,
              console: true
            }
          },
          gruntfile: {
            src: 'Gruntfile.js'
          },
          js: {
            src: ['js/*.js', 'js/**/*.js', '!js/marked.js']
          }
        },
        lib_test: {
          src: ['lib/**/*.js', 'test/**/*.js']
        },
        copy: {
          prepare: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [ '<%= jsFiles %>' ],
                dest: 'tmp/release/scripts/'
              },
              {
                src: 'tmp/wiki.js',
                dest: 'tmp/release/scripts/wiki.js'
              },
              {
                src: 'tmp/wiki.css',
                dest: 'tmp/release/css/wiki.css'
              },
              {
                expand: true,
                flatten: true,
                src: ['<%= cssFiles %>' ],
                dest: 'tmp/release/css/'
              },
              {
                expand: true,
                cwd: '<%= imgFiles[0] %>',
                src: [ '*' ],
                dest: 'tmp/release/images/colorbox/'
              }
            ]
          },
          release: {
            files: [
              {
                expand: true,
                flatten: false,
                cwd: 'tmp/release/',
                src: [ '*', '**', "*.html" ],
                dest: 'dist'
              }
            ]
          }
        },
        rename: {
          main: {
            files: [
              {
                src: [ 'tmp/release/scripts/jquery.colorbox.js'],
                dest: 'tmp/release/scripts/colorbox.js'
              }
            ]
          }
        },
        clean: {
          tmp: [ 'tmp' ]
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-reload');

    grunt.registerTask('index', 'Generate index.html and move all scripts', function() {
        createIndex(grunt, 'release');
    });
    grunt.registerTask('release', [
		   'jshint',
		   'string-replace',
		   'concat',
		   'copy:prepare',
		   'rename:main',
		   'copy:release',
		   'index',
		   'clean:tmp'
    ]);

    // Default task
    grunt.registerTask('default', [ 'release' ] );
};
