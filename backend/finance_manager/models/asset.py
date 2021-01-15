from django.db import models
from finance_manager.models.portfolio import Portfolio
from finance_manager.models.info import StockInfo
from finance_manager.models.info import ExchangeRate
from django.utils.timezone import now


class UserStock(models.Model):
    """
    유저자산: 주식
    """

    # portfolio
    port = models.ForeignKey(
        Portfolio,
        related_name="user_stocks",
        on_delete=models.CASCADE,
    )
    # 종목정보
    stock = models.ForeignKey(
        StockInfo,
        related_name="user_stocks",
        on_delete=models.CASCADE,
        to_field="key",
    )
    # 평단가
    avg_price = models.FloatField()
    # 주식수
    share = models.FloatField()

    def __str__(self):
        return f"{self.port}, {self.stock}, {self.avg_price}"


class UserRealty(models.Model):
    """
    유저자산: 부동산
    """

    LAND = "토지"
    APT = "공동"
    HOUSE = "단독"
    realty_type = [
        (LAND, "토지"),
        (APT, "공동주택"),
        (HOUSE, "단독주택"),
    ]
    port = models.ForeignKey(
        Portfolio,
        related_name="user_realties",
        on_delete=models.CASCADE,
    )
    realty_type = models.CharField(
        max_length=2,
        choices=realty_type,
        default=APT,
    )
    # 매입가액, 시기
    buy_price = models.IntegerField()  # 만원 단위
    buy_date = models.DateField(default=now, blank=True)
    # (예상)매도가액, 시기 (미래 가능해야함)
    sell_price = models.FloatField()
    sell_date = models.DateField(default=now, blank=True)
    # 자산상세설명 (주소, 층호 등 사용자 메모용)
    memo = models.TextField(null=True)

    def __str__(self):
        return f"{self.realty_type}, {self.buy_price}"


class UserCash(models.Model):
    """
    유저자산: 현금성 자산
    """

    port = models.ForeignKey(
        Portfolio,
        related_name="user_cashs",  # 복수가 안되는 명사여도 복수로 쓰는게 관행?
        on_delete=models.CASCADE,
    )
    currency = models.ForeignKey(
        ExchangeRate,
        related_name="user_cashs",
        on_delete=models.CASCADE,
        to_field="market",
    )
    balance = models.FloatField()

    def __str__(self):
        return f"{self.port}, {self.currency}, {self.balance}"
