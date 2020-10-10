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
    방식(거치, 적립, 복합)
    기간(연/월?)
    기대이율(수익률)

    2way
    목표액 입력 -> 추천 방식/기간/이율 산출
    방식/기간/이율 입력 -> 결과 산출
    해당 기간의 자본금 변화 시각화
    """

    way = serializers.ChoiceField(choices=[(1, "적립식"), (2, "거치식")])
    period = serializers.IntegerField()
    asset = serializers.IntegerField()
    interest = serializers.FloatField()