from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    articles = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="article-detail",
    )
    comments = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="comment-detail",
    )

    assets = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="asset-detail",
    )
    # usstock = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name="usstock-detail",
    # )
    # kostock = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name="kostock-detail",
    # )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "assets",
            "articles",
            "comments",
            # "usstock",
            # "kostock",
        ]
        ordering = ["id"]
