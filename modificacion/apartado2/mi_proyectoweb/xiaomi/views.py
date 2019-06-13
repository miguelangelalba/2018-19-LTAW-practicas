# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product
from .models import datosCliente
#El punto es para
from xiaomi.forms import formularioPedido

# Create your views here.

def index (request):

    return render(request,'index.html',{'user':'Miguel Ángel'})
def a1(request):
    return render(request,'Xiami_A1.html')
def a2 (request):
    return render(request,'Xiaomi_A2.html')
def patinete (request):
    return render(request,'patinete.html')

def espadadeacerovalyrio (request):
    return render(request,'espadadeacerovalyrio.html')


def buscador (request):
    print ("entrto rn la función buscar")

    if request.method == 'POST':
        print("Entro en metodo post")
        valor = request.POST['producto']
        print ("Imprimo " + valor)# Ya funciona, quedaría hacer la parte de comparar con la DDBB
        productos = Product.objects.all()
        for producto in productos:
            if producto.name == valor:
                web = valor + ".html"
                return redirect(valor)

                #return render(request,web)
        return render(request,'buscador.html',{"alerta":"No se ha encontrado el producto que busca"})

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
            #si el formulario es valiado se aceptará el pedido y se guardará en
            #la DDBB
            #Product.objects.all().filter(name__contains=data['item'])[0].price
            data = form.cleaned_data
            print(data)
            pedido = datosCliente(nombre=data['nombre'],direccion_envio=data['direccion_envio'],email=data['email'],mensaje=data['mensaje'])
            pedido.save()
            #form.save()
            #print (form)
            print("Guardo el formulario")
            return redirect('main')
            print ("formulario guardado")
    else:
        form = formularioPedido()
    return render(request,'pedido.html',{"form":form})


def list(request):
    productos = Product.objects.all()
    pedidos = datosCliente.objects.all()

    html = "<p>Listado de articulos y clientes</p>"
    request_producto = []
    request_pedido = []

    for producto in productos:
        print(producto.name)
        #Debo corregir esta función no se exactamente que le ocurre
        if producto.stock > 0 :
            print(producto.name)
            request_producto.append(producto)
        print(producto.name)
    #Futura función para pedir pedidos
    #for pedido in pedidos:
        #Debo corregir esta función no se exactamente que le ocurre
    #    request_pedido.append(pedido)
        #html += '<p>'+ producto.name + ' ' + str(producto.price) + '<p>'
    return render(request,'list.html',{'item_list':request_producto})
