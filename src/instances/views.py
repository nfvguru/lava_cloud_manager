from django.shortcuts import render
import requests

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse


def index(request):
    response = requests.get('http://127.0.0.1:9000/instance')
    myval = response.json()
    #return HttpResponse("Welcome to Lava Cloud Manager")
    return JsonResponse(myval)
