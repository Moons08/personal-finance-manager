from rest_framework import serializers
from finance_manager.models.asset import UserStock, UserRealty, UserCash

from .info_srzs import StockInfoSerializer, ExchangeRateSerializer


class UserStockListSerializer(serializers.ModelSerializer):
    stock = StockInfoSerializer()
    # purchased_value = serializers.SerializerMethodField("get_purchased_value")

    # def get_purchased_value(self, obj):
    #     # 매입 기준 자산 계산
    #     # TODO: to_representation으로 편입?
    #     return obj.share * obj.avg_price

    def to_representation(self, obj):
        """Move fields from StockInfo to UserStock representation."""
        rep = super().to_representation(obj)
        info = rep.pop("stock")
        for key in ["name", "price", "ex_rate"]:
            rep[key] = info[key]

        # calculated value
        rep["purchased_value"] = rep["share"] * rep["avg_price"] * rep["ex_rate"]
        rep["present_value"] = rep["share"] * rep["price"] * rep["ex_rate"]
        rep["profit"] = (
            rep["share"] * (rep["price"] - rep["avg_price"]) * rep["ex_rate"]
        )

        return rep

    class Meta:
        # TODO: 표시 순서 정렬?
        model = UserStock
        fields = [
            "id",
            "port",
            "avg_price",  # 매입가
            "share",  # 잔고수량
            # "purchased_value",  # 매입금액
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


class UserRealtySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRealty
        fields = "__all__"

    def create(self, validated_data):
        user = validated_data.pop("user")
        userRealty = UserRealty.objects.create(**validated_data)
        return userRealty

    def to_representation(self, obj):
        """Move fields from StockInfo to UserStock representation."""
        rep = super().to_representation(obj)

        # calculated value
        rep["present_value"] = rep["sell_price"]
        rep["profit"] = rep["sell_price"] - rep["buy_price"]

        return rep


class UserCashSerializer(serializers.ModelSerializer):
    currency = ExchangeRateSerializer(read_only=True)

    def create(self, validated_data):
        user = validated_data.pop("user")
        userCash = UserCash.objects.create(**validated_data)
        return userCash

    def to_representation(self, obj):
        # 중복되는데.. 함수화 가능할지?
        rep = super().to_representation(obj)
        market = rep.pop("currency")
        rep["currency"] = market["market"]
        rep["balance_won"] = rep["balance"] * market["ex_rate"]
        return rep

    class Meta:
        model = UserCash
        fields = ["id", "port", "currency", "balance"]


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