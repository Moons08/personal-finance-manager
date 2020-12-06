from rest_framework import serializers
from finance_manager.models.asset import UserStock, Realty
from .info_srzs import StockInfoSerializer


class UserStockListSerializer(serializers.ModelSerializer):
    stock = StockInfoSerializer()
    purchased_value = serializers.SerializerMethodField("get_purchased_value")

    def get_purchased_value(self, obj):
        # 매입 기준 자산 계산
        # TODO: to_representation으로 편입?
        return obj.share * obj.avg_price

    def to_representation(self, obj):
        """Move fields from StockInfo to UserStock representation."""
        rep = super().to_representation(obj)
        info = rep.pop("stock")
        for key in ["name", "close"]:
            rep[key] = info[key]

        # calculated value
        rep["present_value"] = rep["share"] * rep["close"]
        rep["profit"] = rep["share"] * (rep["avg_price"] - rep["close"])

        return rep

    class Meta:
        # TODO: 표시 순서 정렬?
        model = UserStock
        fields = [
            "id",
            "port",
            "avg_price",  # 매입가
            "share",  # 잔고수량
            "purchased_value",  # 매입금액
            "stock",
        ]


class UserStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStock
        fields = [
            "id",
            "port",
            "avg_price",  # 매입가
            "share",  # 잔고수량
            "stock",
        ]

    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = UserStock.objects.create(**validated_data)
        return stock


# def to_internal_value(self, data):
#     """Move fields related to profile to their own profile dictionary."""
#     userstock_internal = {}
#     for key in StockInfoSerializer.Meta.fields:
#         if key in data:
#             userstock_internal[key] = data.pop(key)

#     internal = super().to_internal_value(data)
#     internal["stock"] = userstock_internal
#     return internal


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