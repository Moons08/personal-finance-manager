from django.contrib.auth.models import User

from rest_framework import serializers
from finance_manager.models.asset import Asset, USStock, KOStock


class StockSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    # asset = serializers.ReadOnlyField(source="asset.id")

    class Meta:
        fields = ["id", "asset", "user", "ticker", "price", "shares"]
        ordering = ["ticker"]


class USStockSerializer(StockSerializer):
    class Meta(StockSerializer.Meta):
        model = USStock


class KOStockSerializer(StockSerializer):
    class Meta(StockSerializer.Meta):
        model = KOStock


class AssetSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    usstock = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name="usstock-detail"
    )
    kostock = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name="kostock-detail"
    )

    class Meta:
        model = Asset
        fields = ["id", "user", "name", "usstock", "kostock"]
        ordering = ["id"]


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