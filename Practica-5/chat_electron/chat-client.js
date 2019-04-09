//var socket = io();
const io = require('socket.io-client');
const socket = io('http://localhost:3000',{transport:['websocket']});

function sendMsg(e){
    var send = document.getElementById('send');
    var display = document.getElementById('display');
    var msg = document.getElementById("msg");
    console.log("esvento activado");
    console.log(msg.value);
    if(e.keyCode === 13){
        socket.emit('new_message', msg.value);
        msg.value = "";
        //-- Lo notificamos en la consola del navegador
        console.log("Mensaje emitido");
    }
}

function main() {
  console.log("Hola!!!!-------------");
  var send = document.getElementById('send');
  var display = document.getElementById('display');
  var msg = document.getElementById("msg");
  var numMsg = 0
  var msgs = "";

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value);
    msg.value = "";

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }
  //-- Cuando se reciba un mensaje del servidor se muestra
   //-- en el párrafo
   socket.on('new_message', msg => {
       numMsg = numMsg +1;
       if (numMsg > 20 ){
           msgs = ""
           numMsg = 0
       }
       msgs = msgs + "</br>" +msg
     display.innerHTML = msgs;
   });
}
