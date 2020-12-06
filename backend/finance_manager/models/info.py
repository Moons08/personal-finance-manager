from django.db import models
from datetime import datetime


class StockInfo(models.Model):
    """s"""

    key = models.CharField(max_length=30, primary_key=True)  # USTSLA, KO005930
    market = models.CharField(max_length=2)  # US, KO
    ticker = models.CharField(max_length=100)  # TSLA, 005930
    name = models.CharField(max_length=100)  # 테슬라, 삼성전자

    def __str__(self):
        return f"{self.market}: {self.name}"


class StockPrice(models.Model):
    """
    TODO: 환율 처리
    """

    info = models.ForeignKey(
        StockInfo,
        related_name="prices",
        on_delete=models.CASCADE,
        to_field="key",
    )
    open = models.FloatField()  # 시가
    close = models.FloatField()  # 종가
    high = models.FloatField()  # 고가
    low = models.FloatField()  # 저가
    reg_date: datetime.date = models.DateField(auto_created=True)

    def __str__(self):
        return f"{self.close}"


# class ExchangeRate(models.Model):
#     pass