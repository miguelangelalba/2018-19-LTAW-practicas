from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    #url(r'^admin/', include(admin.site.urls),
    url(r'^main/',views.index, name = 'main'),
    url(r'^list/',views.list),
    url(r'^pedido/',views.pedido),
    url(r'^buscador/',views.buscador),
    url(r'^Xiami_A1/',views.a1, name = 'Xiami_A1'),
    url(r'^Xiaomi_A2/',views.a2, name = 'Xiaomi_A2'),
    url(r'^patinete/',views.patinete, name = 'Patinete')
]
