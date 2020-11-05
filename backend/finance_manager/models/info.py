from django.db import models
from datetime import datetime


class StockInfo(models.Model):
    """
    주식 정보 - yfinance로 매일 정보 insert
    시장별 모델 개별 생성
    """

    ticker = models.CharField(max_length=10)
    price = models.FloatField()  # 종가
    reg_date: datetime.date = models.DateField(auto_created=True)

    def __str__(self):
        return f"{self.ticker}"

    class Meta:
        abstract = True


class USStockInfo(StockInfo):
    market = models.CharField(max_length=2, default="US")
    # pass


class KOStockInfo(StockInfo):
    market = models.CharField(max_length=2, default="KO")
    # pass


# class ExchangeRate(models.Model):
#     pass