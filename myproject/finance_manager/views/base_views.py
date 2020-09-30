from django.shortcuts import render
from django.http import HttpResponse
from ..models.asset import Asset
from django.contrib.auth.decorators import login_required


@login_required(login_url="common:login")
def home(request):
    asset_list = Asset.objects.filter(user=request.user)
    context = {"asset_list": asset_list}

    return render(request, "finance_manager/home.html", context)
