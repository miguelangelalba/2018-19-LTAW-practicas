var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');
const PORT = 8080;
const mime = { // Estandar para indicar el tipo de contenido
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4',
   '.js'  : 'application/javascript'
};


console.log("Arrancando servidor..." + PORT);

http.createServer(function (req, res) {
    var objetourl = url.parse(req.url, true); // El modulo url te permite sacar los campos de la url
    console.log(objetourl.pathname);
    var cookie = req.headers.cookie;
    var filename = "." + objetourl.pathname;

    //console.log("Cookie: " + cookie)
    //    fs.readFile(filename, function(err, data) {
    //    if (err) {
    //      res.writeHead(404, {'Content-Type': 'text/html'});
    //      res.end("404 Not Found");
    //        }
    console.log(filename);
    console.log(cookie);

    if (!cookie & (req.url =="/index.html" )) {
       console.log("No te conozco mandame una galleta");
       res.writeHead(301,{"Location": "http://" + req.headers['host'] + '/login_index.html' });
        res.end();

    }else{
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("404 Not Found");
            }else{
                const vec = filename.split('.');
                const extension=vec[vec.length-1];
                const mimearchivo = mime[extension];
                res.writeHead(200, {'Content-Type': 'mimearchivo'});
                res.write(data);
                res.end();
                console.log("Peticion atendida");
            }
        });
    }
}).listen(PORT);
