from . import BaseViewSet
from finance_manager.models.info import StockInfo, StockPrice, Market
from finance_manager.serializers.info_srzs import (
    StockInfoSerializer,
    StockPriceSerializer,
    MarketSerializer,
)


class MarketViewSet(BaseViewSet):

    queryset = Market.objects.all()
    serializer_class = MarketSerializer


class StockInfoViewSet(BaseViewSet):

    queryset = StockInfo.objects.all()
    serializer_class = StockInfoSerializer


class StockPriceViewSet(BaseViewSet):

    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer
