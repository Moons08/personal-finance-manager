from django.shortcuts import render
from django.http import HttpResponse


def login(request):
    pass


def home(request):
    # return HttpResponse("Finance manager Home")
    # return render(request, 'templates/base.html', context)
    return render(request, "finance_manager/home.html")
