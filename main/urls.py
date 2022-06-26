from .views import *
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', index),
    path('addexam', addexam),
    path('addqs', addqexam , name='getexam'),
    path('editeqs', editexam , name='prepreview'),
    path('defaultload', defaultload),
    path('finishcreation', finishcreation),
    path('getquestions', getquestions),
]
