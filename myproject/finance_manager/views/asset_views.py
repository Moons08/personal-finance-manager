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
)
from . import LargeResultsSetPagination


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
