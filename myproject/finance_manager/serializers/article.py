# from django.contrib.auth.models import User
from finance_manager.models.article import Article, Comment
from rest_framework import serializers


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Comment
        fields = ["id", "author", "article", "content"]


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")
    comments = CommentSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Article
        fields = ["id", "author", "subject", "content", "comments"]
