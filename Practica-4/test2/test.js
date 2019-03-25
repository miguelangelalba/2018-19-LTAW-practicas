const express = require('express')
const app = express()
const http = require('http').Server(app);
var io = require('socket.io')(http);

//-- Puerto donde lanzar el servidor
const PORT = 3000

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
  console.log("Fichero js solicitado")
});
//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
  console.log('--> Usuario Desconectado');
});
//-- Detectar si se ha recibido un mensaje del cliente
socket.on('new_message', msg => {

  //-- Notificarlo en la consola del servidor
  if (msg == '/help'){
    respuesta = 'cada minuto de mi vida es un infierno'
    socket.emit('new_message',respuesta); // emit an event to the socket
    console.log('ha llegado help!!!!');

    }else{

    console.log("Mensaje recibido: " + msg)
    //-- Emitir un mensaje a todos los clientes conectados
    io.emit('new_message', msg);
    }
});

});
