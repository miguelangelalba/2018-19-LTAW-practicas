var http = require('http');
var dt = require('./myfirstmodule');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end('Hello World!');
  console.log("Peticion atendida")
}).listen(8080);
