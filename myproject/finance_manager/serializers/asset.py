from django.contrib.auth.models import User

from rest_framework import serializers
from finance_manager.models.asset import Asset

# Serializers define the API representation.
class AssetSerializer(serializers.HyperlinkedModelSerializer):
    tracks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Asset
        fields = ["user", "ticker", "price", "shares"]


class UserSerializer(serializers.ModelSerializer):
    asset = serializers.PrimaryKeyRelatedField(many=True, queryset=Asset.objects.all())

    class Meta:
        model = User
        fields = ["id", "username", "asset"]
