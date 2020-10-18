from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import article_views, asset_views

# app_name = "fm"
router = DefaultRouter()
# router.register(r"users", user_views.UserViewSet)
# board
router.register(r"articles", article_views.ArticleViewSet)
router.register(r"comments", article_views.CommentViewSet)
# assets
router.register(r"assets", asset_views.AssetViewSet)
router.register(r"usstocks", asset_views.USStockViewSet)
router.register(r"kostocks", asset_views.KOStockViewSet)
# router.register(r"test", asset_views.get_expect_asset)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
    path("get_expect_asset/", asset_views.get_expect_asset),
]
