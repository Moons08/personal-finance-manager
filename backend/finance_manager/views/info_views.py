from . import BaseViewSet
from finance_manager.models.info import StockInfo, StockPrice
from finance_manager.serializers.info_srzs import (
    StockInfoSerializer,
    StockPriceSerializer,
)


class StockInfoViewSet(BaseViewSet):

    queryset = StockInfo.objects.all()
    serializer_class = StockInfoSerializer


class StockPriceViewSet(BaseViewSet):

    queryset = StockPrice.objects.all()
    serializer_class = StockPriceSerializer
