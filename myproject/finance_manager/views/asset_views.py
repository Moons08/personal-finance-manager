# from django.shortcuts import render, redirect, get_object_or_404, get_list_or_404
# from django.http import HttpResponse, JsonResponse
# from django.core import serializers
# from ..forms import AssetForm
# from django.contrib.auth.decorators import login_required

from rest_framework import permissions, viewsets

from finance_manager.models.asset import Asset, USStock, KOStock
from finance_manager.serializers.asset import (
    USStockSerializer,
    KOStockSerializer,
    AssetSerializer,
    ExpectAssetSerializer,
)
from . import LargeResultsSetPagination

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
import json


@api_view(["POST", "GET"])
@csrf_exempt
def get_expect_asset(request):
    """
    {
        "way": "적립식",
        "period": 20,
        "asset": 2000,
        "interest": 1.12
    }
    """
    if request.method == "GET":
        serializer = ExpectAssetSerializer()
        return Response(serializer.data)
    else:

        data = request.data
        a = data["asset"]
        r = data["interest"]
        n = data["period"]

        if data["way"] == "적립식":
            for i in range(1, n + 1):
                data[f"{i}y_expect"] = (
                    int(a * r) if i == 1 else int(a * (r ** i - 1) / (r - 1))
                )
        else:
            for i in range(1, n + 1):
                data[f"{i}y_expect"] = int(a * (r ** i))

        return Response(data=data)


class BaseViewSet(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = LargeResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class USStockViewSet(BaseViewSet):

    queryset = USStock.objects.all()
    serializer_class = USStockSerializer


class KOStockViewSet(BaseViewSet):

    queryset = KOStock.objects.all()
    serializer_class = KOStockSerializer


class AssetViewSet(BaseViewSet):

    queryset = Asset.objects.all()
    serializer_class = AssetSerializer


# @login_required(login_url="common:login")
# def asset_create(request):
#     """
#     자산 등록
#     """
#     if request.method == "POST":
#         form = AssetForm(request.POST)
#         if form.is_valid():
#             asset = form.save(commit=False)
#             asset.user = request.user
#             asset.save()
#             return redirect("/")
#     else:
#         form = AssetForm()

#     context = {"form": form}

#     return render(request, "finance_manager/asset_form.html", context)


# @login_required(login_url="common:login")
# def asset_read(request):
#     """
#     자산 출력
#     """
#     # TODO: generic - table view
#     asset = Asset.objects.filter(user=request.user)
#     asset = get_list_or_404(asset)
#     # serialized_obj = serializers.serialize(
#     #     "json",
#     #     [asset],
#     # )
#     return HttpResponse(asset)


# @login_required(login_url="common:login")
# def asset_modify(request, asset_id):
#     """
#     자산 수정
#     """
#     asset = get_object_or_404(Asset, pk=asset_id)

#     if request.method == "POST":
#         form = AssetForm(request.POST, instance=asset)
#         if form.is_valid():
#             asset = form.save(commit=False)
#             asset.save()
#             return redirect("/")
#     else:
#         form = AssetForm(instance=asset)
#     context = {"form": form}
#     return render(request, "finance_manager/asset_form.html", context)


# @login_required(login_url="common:login")
# def asset_delete(request, asset_id):
#     """
#     자산 삭제
#     """
#     asset = get_object_or_404(Asset, pk=asset_id)
#     asset.delete()
#     return redirect("/")
