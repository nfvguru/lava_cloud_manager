from django.shortcuts import render, get_object_or_404
# import requests
from celery import current_app
from django.views import View

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
from .models import InstanceType
# from .tasks import adding_task
from .tasks import get_aws_instance_details


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
    # task = adding_task.delay(9,4)
    task = get_aws_instance_details.delay()
    context['task_id'] = task.id
    context['task_status'] = task.status
    if task.status == 'SUCCESS':
        context['task_results'] = task.get()
    context['instances'] = inst_types
    return render(request, 'instances/approot.html', context)

def listinst(request, inst_id):
    my_inst=get_object_or_404(InstanceType, pk=inst_id)
    return render(request, 'instances/instance.html', {'inst':my_inst})


class TaskView(View):
    def get(self, request, task_id):
        task = current_app.AsyncResult(task_id)
        response_data = {'task_status': task.status, 'task_id': task.id}

        if task.status == 'SUCCESS':
            response_data['results'] = task.get()
            print (response_data['results'])

        return JsonResponse(response_data)
