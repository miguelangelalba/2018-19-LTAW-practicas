function main(){
    //Cojemos las variables del DOm que sean necesarias
    var ver = document.getElementById('Buscar');
    var resultado = document.getElementById('resultado');
    var lettersToSearch = document.getElementById('buscarLetras').value;
    ver.onclick = ()=>{
        //Crear objeto para la pretición Ajax
        m = new XMLHttpRequest();
        //Configuración de la Petición
        console.log("Estas son las letras:" + lettersToSearch);
        m.open("GET","http://localhost:8080/search=" + lettersToSearch, true);

        //Qeuda a la espera para ejecutar esta función (es una promesa?)
        m.onreadystatechange=function(){
            //Si la petición ha sido enviada y recibida....
            if (m.readyState==4 && m.status==200){

                var o = JSON.parse(m.responseText)
                resultado.innerHTML = "";
                for (i=0; i < o.productos.length; i++) {
                    //REcuerda, productos es un objeto que contiene un aray, definido
                    //En el servidor
                    resultado.innerHTML += o.productos[i];
                    if (i<o.productos.length-1) {
                        resultado.innerHTML += ', ';
                    }
                }
            }
        }
        m.send();
    }
}
