var http = require('http');
var dt = require('./myfirstmodule');
var url = require('url');
var fs = require('fs');
var PORT =8080;
const mime = { // Estandar para indicar el tipo de contenido
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4',
   '.js'  : 'application/javascript',
   '.json': 'application/json'
};
const DataBases = {
    "items":["xiaomi_A1","xiaomi_A2","patinete"]
}

function createReqForm(){

    let content = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="pruebastyle.css">
                <script src=formularioCompra.js></script>
                <title>Formulario de compra</title>
            </head>
            <body>
                <h1>Facturación de compra</h1>
                Gracias por la compra,presione Aceptar para finalizar compra y cerrar sesión.
                `
    return content

}
function createEndForm(){
    let content = `<input type="submit" id ="aceptar" onclick="cerrarSesion()" value="Aceptar"/>
     </form>
     `
     return content
}
function createForm(valoresCookie){
    //Esta función retornará un formulario con el nombre del usuario y los
    //productos que seleccionó
    let user = valoresCookie[0];
    let carro = [];
    for( i = 1 ; i <= valoresCookie.length -1; i++){
        carro.push(valoresCookie[i]);

    }
    console.log(user);
    //console.log(intems);

    let content =
    `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" type="text/css" href="pruebastyle.css">
            <title>Formulario de compra</title>
        </head>
        <body>
            <h1>Formulario de compra</h1>

            <form method="POST">
                Nombre: <input type="text" name="Nombre" value=`+valoresCookie[0] +`></br>
                Apellidos: <input type="text" name="Apellidos"/></br>
                Correo electrónico:  <input type="text" name="Correo"/></br>
                Metodo de Pago : <select name="Metodo de pago">
                    <option value="paypal">paypal</option>
                    <option value="Tarjeta de credito" selected>Tarjeta de credito</option>
                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                </select>
              <br/>
              <input type="submit" value="Enviar"/>
              <p>Productos del carro:</p>
              `+ carro +`

            </form>


        </body>
    </html>`
    return content;
}
function reedCookie(cookie){
    console.log("Leo cookie:");
    console.log(cookie);
    var separoDatos = cookie.split(";");
    let valoresCookie = [];
    console.log(separoDatos);
    for (var i =0 ; i <=separoDatos.length -1; i++){
        var parametro = separoDatos[i];
        //nombre=miguel
        var claveValor = parametro.split("=");
        //[nombre,miguel]
        valoresCookie.push(claveValor[1]);
    }
    console.log("Resultado valores cookie:");
    console.log(valoresCookie);
    return valoresCookie;


}
function findItem(letters){
    var foundIt =  [];
    console.log("Imprime letras a buscar: "+letters);
    console.log("Esti es lo que contiene la DDBB:" + DataBases.items);
    for (i=0; i< DataBases.items.length; i++){
        if (DataBases.items[i].includes(letters)){
            foundIt.push(DataBases.items[i]);
        }
    }
    return foundIt;
}
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

function getIp(){
    //Esta función la creo para saber la dirección ip de la máquina,
    //ya que al redireccionar a los clientes no encontrarían la web con localhost
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
ip = getIp()
console.log("Ip:" + ip);


http.createServer(function (req, res) {
    var objetourl = url.parse(req.url, true); // El modulo url te permite sacar los campos de la url
    console.log(objetourl.pathname);
    let cookie = req.headers.cookie;
    var filename = "." + objetourl.pathname;
    user = userNamecookie(req);
    console.log(user);
    console.log(filename);
    console.log(cookie);
    console.log("imprimo: " + req.url + "="+ "/?Nombre" + user );
    console.log("Direccion ip: " + req.headers['host']);

    if (!cookie & (req.url =="/index.html" )) {
       console.log("No te conozco, mandame una galleta");
       res.writeHead(301,{"Location": "http://localhost:8080/login_index.html" });
       //res.writeHead(301,{"Location": "http://" + ip +":"+PORT + '/login_index.html' });
       //res.writeHead(301,{"Location": "http://" + req.headers['host'] + '/login_index.html' });
       res.end();

   }else if(req.url == "/?Nombre=" + user ) {
       console.log("Hola:" + user );
       console.log("Te mando tu galleta, con ella podrás hacer compras");
       res.setHeader('Set-Cookie', 'user='+user);
       res.writeHead(301,{"Location": "http://localhost:8080/index.html" });
       //res.writeHead(301,{"Location": "http://" + ip +":"+ PORT + '/index.html' }); // descomentado esta línea y coemntando la anterior podrían entrar otros usuarios de la res
       //res.writeHead(301,{"Location": "http://" + req.headers['host'] + '/index.html' });
       res.end();
//De esta manera identificamos la petición AJax ya que debe contener /search en la url

   }else if(req.url.includes("/search")){
       // Aquí separo con el split las letras qeu quiero buscar
       search = req.url.split("=");
       letters = search[1];
       console.log("Esto es lo que contiene search:" + search);
       console.log("Letras que buscas:" + letters);
       console.log("Estas buscando cosas");
       productosEncontrados = findItem(letters);
       console.log("Productos encnotrados:" + productosEncontrados);
       console.log(JSON.stringify({productos: productosEncontrados}));
       //Sobreescribo la variable productosEncontrados para devolverla al cliente
       //En formato JSON
       productosEncontrados =JSON.stringify({productos: productosEncontrados})
       //Hay que indicar que es un objeto JSON
       res.setHeader('Content-Type', 'application/json')
       res.write(productosEncontrados);
       res.end();
       return
   }else if(req.url == "/formularioCompra.html"){
       if (req.method === 'POST'){
            req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();
            reqForm = createReqForm();
            reqForm += `<p>`+ data +`</p>`
            reqForm += createEndForm();
            //-- Añadir los datos a la respuesta


            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            res.statusCode = 200;
            res.write(reqForm);
            res.end();
         });

       }else{

           console.log("Entro para hacer mis cosas de formulario");
           res.writeHead(200, {'Content-Type': 'mimearchivo'});
           //Modificar esta parte del código, tengo quehacer otra función para que lea la cookie
           var valoresCookie = reedCookie(cookie);
           res.write(createForm(valoresCookie));
           res.end();
           return
       }
   }else{
       console.log("Entro en el else");
       console.log("Esta es la cookie:" + cookie);
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
