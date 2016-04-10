/**
 * Created by Ankush on 4/10/2016.
 */

module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify:{
            options: {
                //insert at top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/*.js']
                }
            }
        },
        jshint:{
            // define the files to lint
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask("default",['jshint', 'uglify']);
};