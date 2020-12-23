from . import BaseViewSet
from finance_manager.models.info import StockInfo, StockPrice, ExchangeRate
from finance_manager.serializers.info_srzs import (
    StockInfoSerializer,
    StockPriceSerializer,
    ExchangeRateSerializer,
)


class ExchangeRateViewSet(BaseViewSet):

    queryset = ExchangeRate.objects.all()
    serializer_class = ExchangeRateSerializer


class StockInfoViewSet(BaseViewSet):

    queryset = StockInfo.objects.all()
    serializer_class = StockInfoSerializer


class StockPriceViewSet(BaseViewSet):

    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer
