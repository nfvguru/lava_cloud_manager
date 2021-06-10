from celery import shared_task
import requests

@shared_task
def adding_task(x, y):
    return x + y

@shared_task
def get_aws_instance_details():
    response = requests.get('http://127.0.0.1:9000/instance?op=1')
    return response.json()
