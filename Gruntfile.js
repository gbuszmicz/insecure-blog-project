module.exports = function(grunt) {

  grunt.initConfig({
    db_config: grunt.file.readJSON('env/production.json'), // Load db

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
        src: ['backups/dump.sql']
      }
    },
    
    mysqldump: {
      local: {
        host: '<%= db_config.mysql.host %>',
        user: '<%= db_config.mysql.user %>',
        pass: '<%= db_config.mysql.password %>',
        port: '<%= db_config.mysql.port %>',
        dest: 'backups/',
        databases: [
          '<%= db_config.mysql.database %>'
        ]
      }
    }
  })

  // Restore backup
  grunt.loadNpmTasks('grunt-mysql-runfile');
  grunt.registerTask('db_restore', ['mysqlrunfile:populateDb']);
  
  // Create backup. Requires mysqldump
  grunt.loadNpmTasks('grunt-mysqldump');
  grunt.registerTask('db_backup', ['mysqldump:local']);
};