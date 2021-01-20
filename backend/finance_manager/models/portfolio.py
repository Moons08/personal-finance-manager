from django.db import models


class Portfolio(models.Model):
    """
    유저 자산군 포트폴리오 (유저 -< 포폴)
    - Portfolio -< Stock, UserRealty
    """

    user = models.ForeignKey(
        "auth.User", related_name="portfolio", on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.user}'s {self.name}"
