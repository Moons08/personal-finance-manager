# from django.http import Http404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

from . import LargeResultsSetPagination, BaseViewSet

from finance_manager.models.portfolio import Portfolio
from finance_manager.models.asset import Stock, Realty

from finance_manager.serializers.portfolio_srzs import PortfolioSerializer
from finance_manager.serializers.asset_srzs import StockSerializer, RealtySerializer


class StockViewSet(BaseViewSet):

    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class RealtyViewSet(BaseViewSet):

    queryset = Realty.objects.all()
    serializer_class = RealtySerializer
