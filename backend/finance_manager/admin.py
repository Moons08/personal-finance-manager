from django.contrib import admin

from .models.article import Article, Comment
from .models.asset import Stock, Realty
from .models.info import USStockInfo, KOStockInfo
from .models.portfolio import Portfolio


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    model = Article
    # list_dislay: List 를 정의해 보여질 필드를 정할 수 있음


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    model = Comment


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    model = Stock


@admin.register(Realty)
class RealtyAdmin(admin.ModelAdmin):
    model = Realty


@admin.register(USStockInfo)
class USStockInfoAdmin(admin.ModelAdmin):
    model = USStockInfo


@admin.register(KOStockInfo)
class KOStockInfoAdmin(admin.ModelAdmin):
    model = KOStockInfo


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    model = Portfolio
