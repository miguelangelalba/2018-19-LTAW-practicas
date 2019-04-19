var contador = 0;
function buscar(e){
    var ver = document.getElementById('Buscar');
    var resultado = document.getElementById('resultado')
    var lettersToSearch = document.getElementById('buscarLetras').value;
    console.log("estoy en la función");
    console.log(e.keyCode);
    if (e.keyCode === 46){
        console.log(contador);
        contador -= contador;
    }else{
        console.log(contador);
        contador = contador +1;
    }
    if (contador >2){
        m = new XMLHttpRequest();
        //Configuración de la Petición
        console.log("Estas son las letras:" + lettersToSearch);
        m.open("GET","http://localhost:8080/search=" + lettersToSearch, true);

        //Qeuda a la espera para ejecutar esta función (es una promesa?)
        m.onreadystatechange=function(){
            //Si la petición ha sido enviada y recibida....
            if (m.readyState==4 && m.status==200){

                var o = JSON.parse(m.responseText)
                console.log("Esto es lo que escupe: " +o);
                $("#buscarLetras").autocomplete({source:o.productos});
                resultado.innerHTML = "";
                for (i=0; i < o.productos.length; i++) {
                    //REcuerda, productos es un objeto que contiene un aray, definido
                    //En el servidor
                    resultado.innerHTML += o.productos[i];
                    if (i<o.productos.length-1) {
                        resultado.innerHTML += ', ';
                        console.log("Este es el resultado: " +resultado);
                    }
                }
            }
        }
        m.send();
    }
}

function main(){
    //Cojemos las variables del DOm que sean necesarias
    var ver = document.getElementById('Buscar');
    var resultado = document.getElementById('resultado');
    ver.onclick = ()=>{
        var lettersToSearch = document.getElementById('buscarLetras').value;
        location.href="http://localhost:8080/" + lettersToSearch +".html"
    }
}
