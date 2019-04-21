function cerrarSesion(){

    location.href="http://localhost:8080/index.html";
    //Debo preguntar, supuestamente con el expires debería de caducar la cookie y no mandarla
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:01 GMT";

}
