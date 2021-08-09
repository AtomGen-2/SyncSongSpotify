from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('join', views.index),
    path('create', views.index),
    path('room/<str:roomCode>', views.index),
    path('sample/<str:sampleCode>', views.index),
]
