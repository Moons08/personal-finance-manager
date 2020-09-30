from django.urls import path

from .views import base_views, asset_views

app_name = "finance_manager"
urlpatterns = [
    # base_views.py
    path("", base_views.home, name="home"),
    # asset_views.py
    path("asset/create/", asset_views.asset_create, name="asset_create"),
    path("asset/read/", asset_views.asset_read, name="asset_read"),
    path("asset/modify/<int:asset_id>/", asset_views.asset_modify, name="asset_modify"),
    path("asset/delete/<int:asset_id>/", asset_views.asset_delete, name="asset_delete"),
]