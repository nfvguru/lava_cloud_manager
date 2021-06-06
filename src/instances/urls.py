from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('<int:inst_id>', views.listinst, name="listinst"),
]
