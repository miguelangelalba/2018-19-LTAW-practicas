from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render

def mi_funcion(request):
    html = "Hola esto es una prueba"

    return HttpResponse(html)

def mi_producto(request,param):
    numero = int(param)
    html = "Acceso al producto: %i" %numero
    return HttpResponse(html)

PLANTILLA = """
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Saludo</title>
    </head>
    <body>
        <p>Bienvenido a mi tienda, {{user}}</p>

    </body>
</html>
"""

def saludo(request):
    fp = open('/home/alumnos/maalbab/Documentos/cuarto/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/web/index.html')
    t = Template(fp.read())
    fp.close()
    c = Context({'user':'Epic Saxo guy'})

    html = t.render(c)
    return HttpResponse(html)

def index (request):

    return render(request,'index.html',{'user':'Miguel Angel'})
