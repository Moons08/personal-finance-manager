from django.db import models
from django.contrib.auth.models import User


class Asset(models.Model):
    """
    자산 기본 클래스
    """

    ticker = models.CharField(max_length=10)
    price = models.FloatField()
    shares = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject

    class Meta:
        abstract = True


class USStock(Asset):
    pass


class KOStock(Asset):
    pass


class Realty(Asset):
    pass
