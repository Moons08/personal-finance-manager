from django.db import models


class Article(models.Model):
    author = models.ForeignKey(
        "auth.User", related_name="articles", on_delete=models.CASCADE
    )
    subject = models.CharField(max_length=200)
    content = models.TextField()

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.subject


class Comment(models.Model):
    author = models.ForeignKey(
        "auth.User", related_name="comments", on_delete=models.CASCADE
    )
    article = models.ForeignKey(
        Article,
        related_name="comments",
        on_delete=models.CASCADE,
    )
    content = models.TextField()

    def __str__(self):
        return self.content