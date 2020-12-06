from . import LargeResultsSetPagination, BaseViewSet

from finance_manager.models.portfolio import Portfolio
from finance_manager.models.asset import UserStock, Realty
from rest_framework.response import Response

from finance_manager.serializers.portfolio_srzs import PortfolioSerializer
from finance_manager.serializers.asset_srzs import (
    UserStockSerializer,
    UserStockListSerializer,
    RealtySerializer,
)


class UserStockViewSet(BaseViewSet):

    queryset = UserStock.objects.all()
    serializer_class = UserStockSerializer

    def list(self, request):
        # 목록 불러올때는 다른 시리얼라이저를 씀
        queryset = UserStock.objects.all()
        serializer = UserStockListSerializer(queryset, many=True)
        return Response(serializer.data)


class RealtyViewSet(BaseViewSet):

    queryset = Realty.objects.all()
    serializer_class = RealtySerializer
