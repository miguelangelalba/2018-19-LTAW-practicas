# Práctica 2

En este repo se colocarán los ficheros de la práctica 2 de LTAW
Para ejecutar:
en la direccion: /mi_proyectoweb/
-python manage.py  runserver
(recuerda cada vez que modificas el modelo de DDBB tienes que hacer migraciones y aplicar migraciones)

shell

-python manage.py shell
-from mi_tienda.models import Product
-p1 = Product(name="fpga", stock=3, price=6.3)
p1.save()

-productos = Product.objects.all()
