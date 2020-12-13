from django.db import models
from datetime import datetime


class ExchangeRate(models.Model):
    """
    화폐 대비 원화 환율(매일 종가 기준) / 통화별 레코드 한줄로 관리
     US: 1085.42
     JP: 104.11
     BTC: 20314592.75
    """

    market = models.CharField(max_length=5, primary_key=True)
    ex_rate = models.FloatField()  # 종가 기준
    reg_date: datetime.date = models.DateField(auto_created=True)

    def __str__(self):
        return f"{self.market}"


class StockInfo(models.Model):
    """
    주식 기본 정보
    """

    key = models.CharField(max_length=10, primary_key=True)  # USTSLA, KO005930
    market = models.ForeignKey(
        ExchangeRate,
        related_name="stockinfos",
        on_delete=models.CASCADE,
        to_field="market",
    )
    ticker = models.CharField(max_length=10)  # TSLA, 005930
    name = models.CharField(max_length=20)  # 테슬라, 삼성전자

    def __str__(self):
        return f"{self.market}: {self.name}"


class StockPrice(models.Model):
    """
    주식 가격(매일 종가 기준)
    """

    info = models.ForeignKey(
        StockInfo,
        related_name="prices",
        on_delete=models.CASCADE,
        to_field="key",
    )
    price = models.FloatField()  # 종가 기준
    reg_date: datetime.date = models.DateField(auto_created=True)

    def __str__(self):
        return f"{self.info}: {self.price}"
