from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    article_views,
    asset_views,
    portfolio_views,
    info_views,
    scheuduler_views,
)

app_name = "fm"
router = DefaultRouter()
# # board
router.register(r"articles", article_views.ArticleViewSet)
router.register(r"comments", article_views.CommentViewSet)
# # assets
router.register(r"portfolio", portfolio_views.PortfolioViewSet)

router.register(r"userstocks", asset_views.UserStockViewSet)
router.register(r"userrealties", asset_views.UserRealtyViewSet)
router.register(r"usercash", asset_views.UserCashViewSet)

router.register(r"stockinfo", info_views.StockInfoViewSet)
router.register(r"stockprice", info_views.StockPriceViewSet)
router.register(r"market", info_views.MarketViewSet)

# router.register("get_expect_asset", scheuduler_views.get_expect_asset)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
    path("expect_asset/", scheuduler_views.get_expect_asset),
]
