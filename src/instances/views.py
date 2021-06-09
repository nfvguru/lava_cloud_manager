from django.shortcuts import render, get_object_or_404
import requests

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
from .models import InstanceType
from .tasks import adding_task



def index(request):
    # response = requests.get('http://127.0.0.1:9000/instance')
    # myval = response.json()
    # return HttpResponse("Welcome to Lava Cloud Manager")
    # return JsonResponse(myval)
    inst_types = InstanceType.objects
    return render(request, 'index.html')

def approot(request):
    context={}
    inst_types = InstanceType.objects
    task = adding_task.delay(9,4)
    context['task_id'] = task.id
    context['task_status'] = task.status
    if task.status == 'SUCCESS':
        context['task_results'] = task.get()
    context['instances'] = inst_types
    return render(request, 'instances/approot.html', context)

def listinst(request, inst_id):
    my_inst=get_object_or_404(InstanceType, pk=inst_id)
    return render(request, 'instances/instance.html', {'inst':my_inst})
