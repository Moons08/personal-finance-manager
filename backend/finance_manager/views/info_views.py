from . import BaseViewSet
from finance_manager.models.info import USStockInfo, KOStockInfo
from finance_manager.serializers.info_srzs import (
    USStockInfoSerializer,
    KOStockInfoSerializer,
)


class USStockInfoViewSet(BaseViewSet):

    queryset = USStockInfo.objects.all()
    serializer_class = USStockInfoSerializer


class KOStockInfoViewSet(BaseViewSet):

    queryset = KOStockInfo.objects.all()
    serializer_class = KOStockInfoSerializer
