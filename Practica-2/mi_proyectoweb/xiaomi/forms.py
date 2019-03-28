from django import forms

class hacer_pedido(forms.Form):
    #El widget forma el cuadrado de texto para poder escribir
    #required es que el campo será neceario crearlo
    nombre = forms.CharField(widget = forms.TextInput(),required =True)
    direccion_envio = forms.CharField(widget = forms.TextInput(),required =True)
    email = forms.EmailField(widget= forms.TextInput(),required = True)
    mensaje = forms.CharField(widget = forms.Textarea(),required = True)
