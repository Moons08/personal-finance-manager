from rest_framework import serializers
from finance_manager.models.portfolio import Portfolio

from .asset_srzs import UserStockListSerializer, RealtySerializer


class PortfolioSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_stocks = UserStockListSerializer(many=True, read_only=True)
    realties = RealtySerializer(many=True, read_only=True)

    def get_total_asset(self, parameter_list):
        """
        docstring
        """
        pass

    class Meta:
        model = Portfolio
        fields = [
            "id",
            "user",
            "name",
            "user_stocks",
            "realties",
        ]
        ordering = ["id"]
        # extra_kwargs = {"url": {"view_name": "fm:stocks-detail"}}
