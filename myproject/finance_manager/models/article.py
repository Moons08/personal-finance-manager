from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight


class Article(models.Model):
    author = models.ForeignKey(
        "auth.User", related_name="articles", on_delete=models.CASCADE
    )
    subject = models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        return self.subject


class Comment(models.Model):
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article,
        related_name="comments",
        # null=False,
        # blank=True,
        on_delete=models.CASCADE,
    )
    content = models.TextField()

    def __str__(self):
        return self.content