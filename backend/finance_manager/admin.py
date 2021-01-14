from django.contrib import admin

from .models.article import Article, Comment
from .models.asset import UserStock, UserRealty, UserCash
from .models.info import ExchangeRate, StockInfo, StockPrice
from .models.portfolio import Portfolio


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    # list_dislay: List 를 정의해 보여질 필드를 정할 수 있음


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    model = Comment


@admin.register(UserStock)
class UserStockAdmin(admin.ModelAdmin):
    model = UserStock


@admin.register(UserRealty)
class UserRealtyAdmin(admin.ModelAdmin):
    model = UserRealty


@admin.register(UserCash)
class UserCashAdmin(admin.ModelAdmin):
    model = UserCash


@admin.register(ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    model = ExchangeRate


@admin.register(StockPrice)
class StockPriceAdmin(admin.ModelAdmin):
    model = StockPrice


@admin.register(StockInfo)
class StockInfoAdmin(admin.ModelAdmin):
    model = StockInfo


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    model = Portfolio
