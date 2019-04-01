from django import forms
from .models import datosCliente

class formularioPedido(forms.ModelForm):
    #El widget forma el cuadrado de texto para poder escribir
    #required indica que el campo sera neceario rellenarlo
    class Meta:
        model = datosCliente
        fields = ['nombre','direccion_envio','email','mensaje']
        labels = {
            'nombre': 'Nombre',
            'direccion_envio': 'Direccion de envio',
            'email':'Email',
            'mensaje':"Mensaje"

        }
        widgets = {
            'nombre':forms.TextInput(),
            'direccion_envio':forms.TextInput(),
            'email':forms.TextInput(),
            'mensaje':forms.Textarea(),
        }
             #nombre = forms.CharField(widget = forms.TextInput(),required =True)
        #direccion_envio = forms.CharField(widget = forms.TextInput(),required =True)
        #email = forms.EmailField(widget= forms.TextInput(),required = True)
        #mensaje = forms.CharField(widget = forms.Textarea(),required = True)
