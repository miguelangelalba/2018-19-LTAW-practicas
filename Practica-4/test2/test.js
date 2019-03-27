const express = require('express')
const app = express()
const http = require('http').Server(app);
var io = require('socket.io')(http);
var num_usuarios = 0;
//-- Puerto donde lanzar el servidor
const PORT = 3000
const respuestaServidor = "<p style =color:blue > Mensaje del servidor: ";

//-- Punto de entrada pricipal
app.get('/', function(req, res) {
  res.send('Probando express... ¡¡¡qué fácil!!!')
})
app.get('/index', function(req, res)  {
  res.sendfile(__dirname + '/index.html')
  console.log("Acceso a /woala")
})
//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicitado");
});
//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  num_usuarios = num_usuarios +1;
  respuesta = '<p style ="color:blue">Mensaje del servidor: Bienvenido al chat</p>'
  socket.emit('new_message',respuesta); // emit an event to the socket
  respuesta = respuestaServidor + "Nuevo Usuario conectado </P>"
  io.emit('new_message', respuesta);


  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
  console.log('--> Usuario Desconectado');
  num_usuarios = num_usuarios -1;
});
//-- Detectar si se ha recibido un mensaje del cliente
socket.on('new_message', msg => {

  //-- Notificarlo en la consola del servidor
  if (msg == '/help'){
    respuesta = '<br> Esta es la lista de comandos que puedes ejcutar: </br>' +
        '<ul>'+
        '<li>/help</li>'+
        '<li>/list</li>'+
        '<li>/hello</li>'+
        '<li>/date</li>'+
        '</ul>'
    socket.emit('new_message',respuesta); // emit an event to the socket
    console.log('ha llegado help!!!!');

}else if(msg == '/date'){
    var d = new Date();
    respuesta = respuestaServidor + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() +"</p>";
    socket.emit('new_message',respuesta); // emit an event to the socket
    console.log('ha llegado help!!!!');

}else if(msg == '/list'){
    respuesta = respuestaServidor + "num_usuarios: " + num_usuarios + "</p>";
    socket.emit('new_message',respuesta); // emit an event to the socket
    console.log('Ha solicitado lista');

}else if(msg == '/hello') {
    respuesta = respuestaServidor + "Hello" + "</p>";
    console.log('Saludos');

}else {

    console.log("Mensaje recibido: " + msg)
    //-- Emitir un mensaje a todos los clientes conectados
    io.emit('new_message', msg);
    }
});
});
