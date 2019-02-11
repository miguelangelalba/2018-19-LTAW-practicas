var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');
const mime = { // Estandar para indicar el tipo de contenido
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

console.log("Arrancando servidor...");

http.createServer(function (req, res) {
    var objetourl = url.parse(req.url, true); // El modulo url te permite sacar los campos de la url
    console.log(objetourl.pathname);
    var filename = "." + objetourl.pathname;
    fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    const vec = filename.split('.');
    const extension=vec[vec.length-1];
    const mimearchivo = mime[extension];
    res.writeHead(200, {'Content-Type': 'mimearchivo'});
    res.write(data);
    return res.end();
    console.log("Peticion atendida")

  });
}).listen(8080);
