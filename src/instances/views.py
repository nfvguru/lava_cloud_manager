from django.shortcuts import render, get_object_or_404
import requests

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
from .models import InstanceType



def index(request):
    # response = requests.get('http://127.0.0.1:9000/instance')
    # myval = response.json()
    # return HttpResponse("Welcome to Lava Cloud Manager")
    # return JsonResponse(myval)
    inst_types = InstanceType.objects
    return render(request, 'index.html')

def approot(request):
    inst_types = InstanceType.objects
    return render(request, 'instances/approot.html', {'my_insts':inst_types})

def listinst(request, inst_id):
    my_inst=get_object_or_404(InstanceType, pk=inst_id)
    return render(request, 'instances/instance.html', {'inst':my_inst})
