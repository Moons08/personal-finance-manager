from rest_framework import serializers
from finance_manager.models.info import StockInfo, StockPrice, ExchangeRate


class ExchangeRateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = ExchangeRate.objects.create(**validated_data)
        return stock

    class Meta:
        model = ExchangeRate
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
    # market = ExchangeRateSerializer(read_only=True)

    class Meta:
        model = StockInfo
        fields = "__all__"
        # fields = ["key", "market", "ticker", "name", "prices"]

    def create(self, validated_data):
        user = validated_data.pop("user")
        stock = StockInfo.objects.create(**validated_data)
        return stock

        return representation

    def to_representation(self, obj):
        """flatten"""
        representation = super().to_representation(obj)
        prices = representation.pop("prices")
        market = representation.pop("market")
        if prices:
            prices = prices[-1]  # 복수개
            for key in ["price"]:
                representation[key] = prices[key]

        # representation["ex_rate"] = market["ex_rate"]

        return representation


class StockInfoSerializerRP(serializers.ModelSerializer):
    prices = StockPriceSerializer(many=True, read_only=True)
    market = ExchangeRateSerializer(read_only=True)

    class Meta:
        model = StockInfo
        fields = "__all__"
        # fields = ["key", "market", "ticker", "name", "prices"]

    def to_representation(self, obj):
        """flatten"""
        representation = super().to_representation(obj)
        prices = representation.pop("prices")
        market = representation.pop("market")
        if prices:
            prices = prices[-1]  # 복수개
            for key in ["price"]:
                representation[key] = prices[key]

        representation["ex_rate"] = market["ex_rate"]

        return representation
