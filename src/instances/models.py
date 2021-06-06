from django.db import models

# Create your models here.

class InstanceType(models.Model):
    type = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='images/')
    summary = models.CharField(max_length=100)


    def __str__(self):
        return self.summary
