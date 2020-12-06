from rest_framework import serializers
from finance_manager.models.info import StockInfo, StockPrice


class StockPriceSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = StockPrice.objects.create(**validated_data)
        return stock

    class Meta:
        model = StockPrice
        fields = "__all__"
        # fields = ["ticker", "price", "reg_date"]


class StockInfoSerializer(serializers.ModelSerializer):
    prices = StockPriceSerializer(many=True, read_only=True)

    class Meta:
        model = StockInfo
        # fields = "__all__"
        fields = ["key", "market", "ticker", "name", "prices"]

    def create(self, validated_data):
        user = validated_data.pop("user")
        # prices = validated_data.pop("prices")
        stock = StockInfo.objects.create(**validated_data)
        return stock

    def to_representation(self, obj):
        """flatten"""
        representation = super().to_representation(obj)
        prices = representation.pop("prices")
        if prices:
            prices = prices[-1]  # 복수개
            for key in ["close"]:
                representation[key] = prices[key]

        return representation
