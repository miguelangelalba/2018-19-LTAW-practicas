var numCarro= 0;
function addCarrito(id){
    var cookie = document.cookie;
    document.cookie ="carro"+numCarro+"=" + id ;
    console.log(id);
    console.log(document.cookie);
    numCarro += 1;
}
function main(){
    console.log(document.cookie);
}
