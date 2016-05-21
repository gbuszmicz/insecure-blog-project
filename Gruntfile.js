module.exports = function(grunt) {

  grunt.initConfig({
    db_config: grunt.file.readJSON('configs/db.json'), // Load db info
    mysqlrunfile: {
      options: {
        connection: {
          host: '<%= db_config.mysql.host %>',
          user: '<%= db_config.mysql.user %>',
          password: '<%= db_config.mysql.password %>',
          database: '<%= db_config.mysql.database %>',
          multipleStatements: true
        }
      },
      populateDb: {
        src: ['configs/dump.sql']
      }
    }
  })

  grunt.loadNpmTasks('grunt-mysql-runfile');
  grunt.registerTask('default', ['mysqlrunfile:populateDb']);
  
};