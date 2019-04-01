# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product
#El punto es para
from xiaomi.forms import formularioPedido

# Create your views here.

def index (request):

    return render(request,'index.html',{'user':'Miguel Ángel'})

def buscador (request):
    print ("entrto rn la función buscar")

    if request.method == 'POST':
        print("Entro en metodo post")
        valor = request.POST['producto']
        print ("Imprimo " + valor)# Ya funciona, quedaría hacer la parte de comparar con la DDBB
    return render(request,'buscador.html')

def pedido(request):
    #Esta función va aencargarse tanto de mostar el formulario como de
    #guardar los datos. Por ello tendremos un if que comprobará el tipo de petición,
    #Post o get(El tema es qeu al enviar el formulario vuelve a eta vista)
    print ("entrto rn la función pedido")
    if request.method == 'POST':
        form = formularioPedido(request.POST)
        print("Entro en metodo post")
        if form.is_valid():
            #si el formulario es valiado se haceptará el pedido y se guardará en
            #la DDBB

            form.save()
            print("Guardo el formulario")
            return redirect('main')
            print ("formulario guardado")
    else:
        form = formularioPedido()
    return render(request,'pedido.html',{"form":form})


def list(request):
    productos = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    request_producto = []

    for producto in productos:
        print(producto.name)
        #Debo corregir esta función no se exactamente que le ocurre
        if producto.stock > 0 :
            print(producto.name)
            request_producto.append(producto)
        print(producto.name)
        #html += '<p>'+ producto.name + ' ' + str(producto.price) + '<p>'
    return render(request,'list.html',{'item_list':request_producto})
