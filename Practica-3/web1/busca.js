function main(){
    var ver = document.getElementById('Buscar');
    var resultado = document.getElementById('resultado');
    ver.onclick = ()=>{
        m = new XMLHttpRequest();
        m.open("GET","http://localhost:8080/myquery", true);
        m.onreadystatechange=function(){
            if (m.readyState==4 && m.status==200){
                var o = JSON.parse(m.responseText)
                resultado.innerHTML = "";
                for (i=0; i < o.productos.length; i++) {
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
