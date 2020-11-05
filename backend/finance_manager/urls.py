from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import (
    article_views,
    asset_views,
    portfolio_views,
    info_views,
    scheuduler_views,
)

app_name = "fm"
router = DefaultRouter()
# board
router.register(r"articles", article_views.ArticleViewSet)
router.register(r"comments", article_views.CommentViewSet)
# assets
router.register(r"portfolio", portfolio_views.PortfolioViewSet)

router.register(r"stocks", asset_views.StockViewSet)
router.register(r"realties", asset_views.RealtyViewSet)

router.register(r"usstocks", info_views.USStockInfoViewSet)
router.register(r"kostocks", info_views.KOStockInfoViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
    path("get_expect_asset/", scheuduler_views.get_expect_asset),
]
