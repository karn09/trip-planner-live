var http = require('http');
var db = require('./db');

var server = http.createServer(require('./app'));

db.connect()
  .then(function(conn){
    console.log(conn.name);
    var port = process.env.PORT || 3000;
    server.listen(port, function(){
      console.log(`listening on ${port}`);
    });
  });


