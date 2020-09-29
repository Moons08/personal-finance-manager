from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from finance_manager.models.asset import Asset
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


def asset_read(request, asset_id):
    """
    자산 출력
    """
    # TODO: generic - table view
    asset = get_object_or_404(Asset, pk=asset_id)
    serialized_obj = serializers.serialize(
        "json",
        [asset],
    )
    return HttpResponse(serialized_obj)


def asset_modify(request, asset_id):
    """
    자산 수정
    """
    asset = get_object_or_404(Asset, pk=asset_id)

    if request.method == "POST":
        form = AssetForm(request.POST, instance=asset)
        if form.is_valid():
            asset = form.save(commit=False)
            asset.save()
            return redirect("/")
    else:
        form = AssetForm(instance=asset)
    context = {"form": form}
    return render(request, "finance_manager/asset_form.html", context)


def asset_delete(request, asset_id):
    """
    자산 삭제
    """
    asset = get_object_or_404(Asset, pk=asset_id)
    asset.delete()
    return redirect("/")
