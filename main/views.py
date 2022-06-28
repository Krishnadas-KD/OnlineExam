from django.http import JsonResponse
from django.shortcuts import redirect, render
import re
from django.core import serializers
from .models import *


def index(request):
    return render(request,'inde.html')


def addexam(request):
    examname = request.POST.get('examname')
    print(examname)
    examdesc = request.POST.get('examdesc')
    examdate = request.POST.get('examdate')
    exam = examdetails(examname=examname, examdesc=examdesc, examdate=examdate,UniqCode=examcode())
    exam.save()
    request.session['uniq'] = exam.UniqCode
    return render(request,'examcreating.html')

def addqexam(request):
    q=request.POST.get('q')
    a=request.POST.get('a')
    b=request.POST.get('b')
    c=request.POST.get('c')
    d=request.POST.get('d')
    currect=request.POST.get('currect')
    qnumber=request.POST.get('qnumber')
    qnum = examquestion.objects.filter(UniqCode=request.session['uniq']).count()+1
    qno=qnumber
    print(qnumber)
    if examquestion.objects.filter(UniqCode=request.session['uniq'],qno=qno).exists():
        examquestion.objects.filter(UniqCode=request.session['uniq'],qno=qno).update(optiona=a,optionb=b,optionc=c,optiond=d,answer=currect)
    else:
        qs=examquestion(UniqCode=request.session['uniq'],qno="Q"+str(qnum),question=q,optiona=a,optionb=b,optionc=c,optiond=d,answer=currect)
        qs.save()
    qnum = examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    
    print(qnum)
    return JsonResponse({'qnums':qnum})


def editexam(request):
    qid=request.POST.get('qid')
    print(qid)
    print(request.session['uniq'])
    qs=examquestion.objects.get(UniqCode=request.session['uniq'],qno=qid)
    qnum = examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    print(qnum)

    return JsonResponse({'qno':qs.qno,'question':qs.question,'optiona':qs.optiona,'optionb':qs.optionb,'optionc':qs.optionc,'optiond':qs.optiond,'answer':qs.answer,'qnum':qnum})


def defaultload(request):
    qnums=examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    return JsonResponse({'qnums':qnums})
    pass

def finishcreation(request):
    qc=examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    examdetails.objects.filter(UniqCode=request.session['uniq']).update(totalq=qc)
    return render(request,'index.html')

def getquestions(request):
    q=request.POST.get('qid')
    num=0
    for c in q:
        if c.isdigit():
            num = num + c
    num=num+1        
    q="Q"+num
    qs=examquestion.objects.get(UniqCode=request.session['uniq'],qno=q)
    print(q)
    return JsonResponse({'qno':qs.qno,'question':qs.question,'optiona':qs.optiona,'optionb':qs.optionb,'optionc':qs.optionc,'optiond':qs.optiond,'answer':qs.answer})

def examcode():
    n=10
    while True:
        code=''.join(secrets.choice(string.ascii_letters) for x in range(n))
        if examdetails.objects.filter(UniqCode=code).count() == 0:
            return code
""""

def exam(request):
    qnum = exqmquations.objects.all()
    print(qnum)
    return render(request,'examcreating.html',{'qnums':qnum})


"""