from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Asset(models.Model):
    """
    자산 기본 클래스
    """

    user = models.ForeignKey(
        "auth.User", related_name="assets", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)


class Stock(models.Model):
    ticker = models.CharField(max_length=10)
    price = models.FloatField()
    shares = models.FloatField()

    def __str__(self):
        return f"{self.ticker} {self.price*self.shares}"

    class Meta:
        abstract = True


# TODO: related_name 클래스명으로 자동지정 ex) f"class_name"
class USStock(Stock):
    asset = models.ForeignKey(Asset, related_name="usstock", on_delete=models.CASCADE)
    user = models.ForeignKey(
        "auth.User", related_name="usstock", on_delete=models.CASCADE
    )


class KOStock(Stock):
    asset = models.ForeignKey(Asset, related_name="kostock", on_delete=models.CASCADE)
    user = models.ForeignKey(
        "auth.User", related_name="kostock", on_delete=models.CASCADE
    )


# class Realty(Asset):
#     pass
