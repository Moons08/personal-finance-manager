from rest_framework import serializers
from finance_manager.models.info import StockInfo, StockPrice, Market


class MarketSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = Market.objects.create(**validated_data)
        return stock

    class Meta:
        model = Market
        fields = "__all__"


class StockPriceSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = StockPrice.objects.create(**validated_data)
        return stock

    class Meta:
        model = StockPrice
        fields = "__all__"


class StockInfoSerializer(serializers.ModelSerializer):
    prices = StockPriceSerializer(many=True, read_only=True)
    market = MarketSerializer(read_only=True)

    class Meta:
        model = StockInfo
        fields = "__all__"
        # fields = ["key", "market", "ticker", "name", "prices"]

    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = StockInfo.objects.create(**validated_data)
        return stock

    def to_representation(self, obj):
        """flatten"""
        representation = super().to_representation(obj)
        prices = representation.pop("prices")
        market = representation.pop("market")
        if prices:
            prices = prices[-1]  # 복수개
            for key in ["price"]:
                representation[key] = prices[key]

        representation["exchange_rate"] = market["exchange_rate"]

        return representation
