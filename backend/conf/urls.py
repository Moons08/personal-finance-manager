from django.contrib import admin
from django.urls import path, include

# from rest_framework.routers import DefaultRouter
# from finance_manager.views import user_views, article_views

# # Create a router and register our viewsets with it.
# router = DefaultRouter()
# router.register(r"articles", article_views.ArticleViewSet)
# router.register(r"users", user_views.UserViewSet)

urlpatterns = [
    path(r"common/", include("common.urls")),
    path(r"finance_manager/", include("finance_manager.urls")),
    # admin
    path("api-auth/", include("rest_framework.urls")),
    path("admin/", admin.site.urls),
]

# urlpatterns = format_suffix_patterns(urlpatterns)