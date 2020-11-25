from django.urls import path, include
from django.conf.urls import url

from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.response import Response
from rest_framework.views import APIView

from .views import (
    article_views,
    asset_views,
    portfolio_views,
    info_views,
    scheuduler_views,
)

from util import schema_view

app_name = "fm"
router = DefaultRouter()
# # board
router.register(r"articles", article_views.ArticleViewSet)
router.register(r"comments", article_views.CommentViewSet)
# # assets
router.register(r"portfolio", portfolio_views.PortfolioViewSet)

router.register(r"stocks", asset_views.StockViewSet)
router.register(r"realties", asset_views.RealtyViewSet)

router.register(r"usstocks", info_views.USStockInfoViewSet)
router.register(r"kostocks", info_views.KOStockInfoViewSet)

# router.register("get_expect_asset", scheuduler_views.get_expect_asset)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
    path("expect_asset/", scheuduler_views.get_expect_asset),
    url(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
