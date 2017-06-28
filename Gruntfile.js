module.exports = function (grunt) {
    var tsconfigFile = './tsconfig.json';
    var tsconfigData = grunt.file.readJSON(tsconfigFile);

    grunt.initConfig({
        ts: {
            default: {
                tsconfig: tsconfigFile
            }
        },
        watch: {
            files: [ tsconfigData.include, "tsconfig.json" ],
            tasks: ['ts']
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['ts']);
}
