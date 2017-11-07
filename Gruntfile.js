module.exports = function(grunt) {
    // 작업을 위한 설정
    grunt.initConfig({
        connect: {
          server: {
            options: {
              port: 8000,
              hostname: '*',
              onCreateServer: function(server, connect, options) {
                var io = require('socket.io').listen(server);
                io.sockets.on('connection', function(socket) {
                  // do something with socket
                });
              }
            }
          }
        }
      });
  
    // "uglify" 작업을 위한 플러그인 등록
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-serve');
  
    // 기본 작업에 'uglify' 등록
    grunt.registerTask('default', ['serve']);
  };