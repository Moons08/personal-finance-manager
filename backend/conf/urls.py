from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

from util import schema_view

urlpatterns = [
    path(r"", include("common.urls")),
    path(r"finance_manager/", include("finance_manager.urls")),
    # admin
    # path("api-auth/", include("rest_framework.urls")),
    path("admin/", admin.site.urls),
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]

# urlpatterns = format_suffix_patterns(urlpatterns)