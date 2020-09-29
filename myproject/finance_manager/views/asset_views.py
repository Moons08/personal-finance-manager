from django.shortcuts import render, redirect
from django.http import HttpResponse

from ..forms import AssetForm


def asset_create(request):
    """
    자산 등록
    """
    if request.method == "POST":
        form = AssetForm(request.POST)
        if form.is_valid():
            asset = form.save(commit=False)
            asset.save()
            return redirect("/")
    else:
        form = AssetForm()

    context = {"form": form}

    return render(request, "finance_manager/asset_form.html", context)


def asset_modify(request):
    pass


def asset_delete(request):
    pass