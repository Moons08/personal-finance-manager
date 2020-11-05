from rest_framework import serializers
from finance_manager.models.asset import Stock, Realty
from finance_manager.models.portfolio import Portfolio

from .portfolio_srzs import PortfolioSerializer


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "port", "market", "ticker", "avg_price", "share"]

    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = Stock.objects.create(**validated_data)
        return stock


class RealtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = "__all__"

    def create(self, validated_data):
        user = validated_data.pop("user")
        realty = Realty.objects.create(**validated_data)
        return realty


class ExpectAssetSerializer(serializers.Serializer):
    """
    {
        "present_value": 5000,
        "future_value": 5500,
        "monthly_input": 150,
        "interest": 0.12,
        "year": null
    }
    {
        "present_value": 5000,
        "future_value": null,
        "monthly_input": 150,
        "interest": 0.12,
        "year": 3
    }
    """

    present_value = serializers.FloatField(initial=5000)
    future_value = serializers.FloatField()
    monthly_input = serializers.IntegerField(initial=100)
    interest = serializers.FloatField(initial=12)  # percent
    year = serializers.IntegerField(initial=3)