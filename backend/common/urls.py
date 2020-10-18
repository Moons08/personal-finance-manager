from django.urls import path, include

from rest_framework.routers import DefaultRouter
from dj_rest_auth.registration.views import (
    SocialAccountListView,
    SocialAccountDisconnectView,
)

from common.views import user
from common.views import social_connect as sc

# app_name = "common"
router = DefaultRouter()
router.register(r"users", user.UserViewSet)

urlpatterns = [
    # custom user info
    path("user_info/", include(router.urls)),
    # auth
    path("", include("dj_rest_auth.urls")),
    path("registration/", include("dj_rest_auth.registration.urls")),
    # social
    path("facebook/", sc.FacebookLogin.as_view(), name="fb_login"),
    path("twitter/", sc.TwitterLogin.as_view(), name="twitter_login"),
    path("facebook/connect/", sc.FacebookConnect.as_view(), name="fb_connect"),
    path("twitter/connect/", sc.TwitterConnect.as_view(), name="twitter_connect"),
    path(
        "socialaccounts/", SocialAccountListView.as_view(), name="social_account_list"
    ),
    path(
        "socialaccounts/<int:pk>/disconnect/",
        SocialAccountDisconnectView.as_view(),
        name="social_account_disconnect",
    ),
]
