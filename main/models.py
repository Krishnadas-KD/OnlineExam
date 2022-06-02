from django.db import models
import secrets
import string
# Create your models here.




class examdetails(models.Model):
    UniqCode=models.CharField(max_length=10)
    examname=models.CharField(max_length=50)
    examdesc=models.CharField(max_length=200)
    examdate=models.DateTimeField(max_length=200)
    totalq=models.IntegerField(default=0)
    finish=models.BooleanField(default=False)


class examquestion(models.Model):
    UniqCode=models.CharField(max_length=10)
    qno=models.CharField(max_length=10)
    question=models.CharField(max_length=200)
    optiona=models.CharField(max_length=200)
    optionb=models.CharField(max_length=200)
    optionc=models.CharField(max_length=200)
    optiond=models.CharField(max_length=200)
    answer=models.CharField(max_length=200)