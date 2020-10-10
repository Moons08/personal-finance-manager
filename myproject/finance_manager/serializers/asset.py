from django.contrib.auth.models import User

from rest_framework import serializers
from finance_manager.models.asset import Asset, USStock, KOStock


class StockSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    # asset = serializers.ReadOnlyField(source="asset.id")

    class Meta:
        fields = ["id", "asset", "user", "ticker", "price", "shares"]


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
