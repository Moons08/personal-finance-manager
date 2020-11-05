from django.db import models
from finance_manager.models.portfolio import Portfolio
from django.utils.timezone import now


created_date = models.DateTimeField(default=now, editable=False)


class Stock(models.Model):
    """
    자산: 주식
    TODO: info 연계 - 시장별 환율계산 필요
    """

    UNITED_STATES = "US"
    KOREA = "KO"
    JAPAN = "JP"
    MARKET = [
        (UNITED_STATES, "UnitedStates"),
        (KOREA, "Korea"),
        (JAPAN, "Japan"),
    ]

    port = models.ForeignKey(
        Portfolio,
        related_name="stocks",
        on_delete=models.CASCADE,
    )

    # 시장 - 중국은 뭐지? zh?
    market = models.CharField(max_length=2, choices=MARKET, default=UNITED_STATES)
    # 종목명
    ticker = models.CharField(max_length=10)
    # 평단가
    avg_price = models.FloatField()
    # 주식수
    share = models.FloatField()

    def __str__(self):
        return f"{self.market}, {self.ticker}, {self.avg_price}"


class Realty(models.Model):
    """
    자산: 부동산
    TODO: 매입, 매도 가액과 시기로 세금계산 서비스? # 호갱노노는 재산세 서비스 도입
    """

    LAND = "토지"
    APT = "공동"
    HOUSE = "단독"
    REALTY_TYPE = [
        (LAND, "토지"),
        (APT, "공동주택"),
        (HOUSE, "단독주택"),
    ]
    port = models.ForeignKey(
        Portfolio,
        related_name="realties",
        on_delete=models.CASCADE,
    )
    # 시장
    realty_type = models.CharField(max_length=2, choices=REALTY_TYPE, default=APT)
    # 매입가액, 시기
    buy_price = models.IntegerField()  # 만원 단위
    buy_date = models.DateField(default=now, blank=True)
    # (예상)매도가액, 시기 (미래 가능해야함)
    sell_price = models.FloatField(null=True)
    sell_date = models.DateField(default=now)
    # 자산상세설명 (주소, 층호 등 사용자 메모용)
    memo = models.TextField(null=True)

    def __str__(self):
        return f"{self.realty_type}, {self.buy_price}"
