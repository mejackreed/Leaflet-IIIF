module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.initConfig({
    connect: {
      uses_defaults: {}
    },
    watch: {
      
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
