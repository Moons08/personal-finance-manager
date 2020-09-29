from django.shortcuts import render
from django.http import HttpResponse
from ..models.asset import Asset


def home(request):
    asset_list = Asset.objects.all()
    context = {"asset_list": asset_list}

    return render(request, "finance_manager/home.html", context)
