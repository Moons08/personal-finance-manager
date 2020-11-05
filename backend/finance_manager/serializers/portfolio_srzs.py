from rest_framework import serializers
from finance_manager.models.portfolio import Portfolio


class PortfolioSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    stocks = serializers.StringRelatedField(many=True)
    realties = serializers.StringRelatedField(many=True)

    class Meta:
        model = Portfolio
        fields = [
            "id",
            "user",
            "name",
            "stocks",
            "realties",
        ]
        ordering = ["id"]
        # extra_kwargs = {"url": {"view_name": "fm:stocks-detail"}}
