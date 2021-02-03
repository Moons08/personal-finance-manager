from . import BaseViewSet
from django.shortcuts import get_object_or_404
from finance_manager.models.portfolio import Portfolio
from finance_manager.serializers.portfolio_srzs import PortfolioSerializer
from rest_framework.response import Response


class PortfolioViewSet(BaseViewSet):

    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    def get_queryset(self):
        """
        This view should return a list of all the portfolio
        for the currently authenticated user.
        * admin gets all user's portfolio.
        """
        user = self.request.user
        if user.is_superuser:
            return Portfolio.objects.all()
        else:
            return Portfolio.objects.filter(user=user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = PortfolioSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Portfolio.objects.all()
        portfolio = get_object_or_404(queryset, pk=pk)
        serializer = PortfolioSerializer(portfolio)
        return Response(serializer.data)