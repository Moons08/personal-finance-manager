from . import LargeResultsSetPagination, BaseViewSet

from finance_manager.models.portfolio import Portfolio
from finance_manager.models.asset import UserStock, UserRealty, UserCash
from rest_framework.response import Response

from finance_manager.serializers.portfolio_srzs import PortfolioSerializer
from finance_manager.serializers.asset_srzs import (
    UserStockSerializer,
    UserStockListSerializer,
    UserRealtySerializer,
    UserCashSerializer,
)


class UserStockViewSet(BaseViewSet):

    queryset = UserStock.objects.all()
    serializer_class = UserStockSerializer

    def list(self, request):
        # 목록 불러올때는 다른 시리얼라이저를 씀
        queryset = UserStock.objects.all()
        serializer = UserStockListSerializer(queryset, many=True)
        return Response(serializer.data)


class UserRealtyViewSet(BaseViewSet):

    queryset = UserRealty.objects.all()
    serializer_class = UserRealtySerializer


class UserCashViewSet(BaseViewSet):

    queryset = UserCash.objects.all()
    serializer_class = UserCashSerializer
