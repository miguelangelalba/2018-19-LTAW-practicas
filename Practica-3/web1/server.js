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
function userNamecookie(req){

    if(req.url.indexOf("?") > 0 ){
        var url_data = req.url.split("?"); //Con esto separo los parámetros
        var separo_parametros = url_data[1].split("&");
        //aquí tenemos este formato[nombre=miguel,data=lo que sea]
        for (var i = separo_parametros.length -1; i >= 0; i--){
            var parametro = separo_parametros[i];
            //nombre=miguel
            var clave_valor = parametro.split("=");
            //[nombre,miguel]
            var usuario =clave_valor[1];
            console.log(usuario + "Pilla");
            return usuario;
        }
    }

    return "No hay usuario";

}

function get_ip(){
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ip = "";
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;
    //forEach es un bucle que recorre los elementos de un array
        ifaces[ifname].forEach(function(element){
            if ('IPv4' !== element.family || element.internal !== false) {
         // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
        ip = element.address
        });
    });
     return ip;
   }



console.log("Arrancando servidor..." + PORT);
ip = get_ip()
console.log("Ip:" + ip);


http.createServer(function (req, res) {
    var objetourl = url.parse(req.url, true); // El modulo url te permite sacar los campos de la url
    console.log(objetourl.pathname);
    var cookie = req.headers.cookie;
    var filename = "." + objetourl.pathname;
    user = userNamecookie(req);
    console.log(user);
    console.log(filename);
    console.log(cookie);
    console.log("imprimo: " + req.url + "="+ "/?Nombre" + user );
    console.log("Direccion ip: " + req.headers['host']);

    if (!cookie & (req.url =="/index.html" )) {
       console.log("No te conozco mandame una galleta");
       res.writeHead(301,{"Location": "http://" + ip +":"+PORT + '/login_index.html' });
       //res.writeHead(301,{"Location": "http://" + req.headers['host'] + '/login_index.html' });
       res.end();

   }else if(req.url == "/?Nombre=" + user ) {
       console.log("Hola:" + user );
       console.log("Te mando tu cookie, con ella podrás hacer compras");
       res.setHeader('Set-Cookie', 'user='+user);
       res.writeHead(301,{"Location": "http://" + ip +":"+ PORT + '/index.html' });
       //res.writeHead(301,{"Location": "http://" + req.headers['host'] + '/index.html' });
       res.end();
   }else{
       console.log("Entro en el else");
       console.log("Esta es la cookie:" + cookie);;
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
