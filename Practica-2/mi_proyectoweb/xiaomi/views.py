# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from xiaomi.models import Product
#El punto es para
from .forms import hacer_pedido

# Create your views here.

def index (request):

    return render(request,'index.html',{'user':'Miguel Ángel'})
def pedido(request):
    return render(request,'pedido.html',{"form":hacer_pedido})

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
