from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    #url(r'^admin/', include(admin.site.urls),
    url(r'^main/',views.index),
    url(r'^list/',views.list)

]
