# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django import forms


from django.db import models
#from django import forms
#REcuerda, después de crear los modelos de las DDBB tienes que hacer migracioes y migrar
class datosCliente(models.Model):
    #El widget forma el cuadrado de texto para poder escribir
    #required indica que el campo será neceario rellenarlo
    nombre = models.CharField(max_length=200)#forms.CharField(widget = forms.TextInput(),required =True)
    direccion_envio = models.CharField(max_length=200)#forms.CharField(widget = forms.TextInput(),required =True)
    email = models.CharField(max_length=200)#forms.EmailField(widget= forms.TextInput(),required = True)
    mensaje = models.CharField(max_length=200)#forms.CharField(widget = forms.Textarea(),required = True)

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.FloatField()
#Clase formualario
#class formulario(forms.form):
#    nombre = forms.CharField(max_length = 100)
#    mensaje = forms.CharField()
#    mail = forms.Emailfield()
