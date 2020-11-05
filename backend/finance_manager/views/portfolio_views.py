from . import BaseViewSet
from finance_manager.models.portfolio import Portfolio
from finance_manager.serializers.portfolio_srzs import PortfolioSerializer


class PortfolioViewSet(BaseViewSet):

    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
