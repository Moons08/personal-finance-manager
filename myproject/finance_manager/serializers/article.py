from django.contrib.auth.models import User
from finance_manager.models.article import Article, Comment
from rest_framework import serializers


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")
    # article = serializers.HyperlinkedRelatedField(
    #     many=False,
    #     read_only=True,
    #     view_name="article-detail",
    # )
    # article = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "article", "content"]


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")
    # comments = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name="comment-detail",
    # )
    comments = CommentSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Article
        fields = ["id", "author", "subject", "content", "comments"]
