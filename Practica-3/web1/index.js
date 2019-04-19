function addCarrito(id){
    var cookie = document.cookie;
    document.cookie = "carro=" +id
    console.log(id);
    console.log(document.cookie);
}
function main(){
    console.log(document.cookie);
}
