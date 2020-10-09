from django.contrib.auth.models import User
from finance_manager.models.article import Article
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

    class Meta:
        model = User
        fields = ["id", "username", "articles", "comments"]
