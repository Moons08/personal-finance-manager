from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# class Article(models.Model):
#     author = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#     )
class Asset(models.Model):
    """
    자산 기본 클래스
    """

    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)
    price = models.FloatField()
    shares = models.FloatField()

    def __str__(self):
        return self.ticker

    # class Meta:
    #     abstract = True


# class USStock(Asset):
#     pass


# class KOStock(Asset):
#     pass


# class Realty(Asset):
#     pass
