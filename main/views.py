from django.http import JsonResponse
from django.shortcuts import redirect, render


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
    print(currect)
    qs=examquestion(UniqCode=request.session['uniq'],qno=qnumber,question=q,optiona=a,optionb=b,optionc=c,optiond=d,answer=currect)

    qs.save()
    print(qs)
    qnum = examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    print(qnum)
    return JsonResponse({'qnums':qnum})

def defaultload(request):
    qnums=examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    return JsonResponse({'qnums':qnums})
    pass

def finishcreation(request):
    return render(request,'index.html')

def getquestions(request):
    quest=examquestion.objects.filter(UniqCode=request.session['uniq']).count()
    print(quest)
    return JsonResponse({'quest':quest})

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