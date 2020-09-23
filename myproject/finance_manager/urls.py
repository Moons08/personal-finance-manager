from django.urls import path

from . import views

app_name = "finance_manager"
urlpatterns = [
    path("", views.home),
    path("login/", views.login, name="login"),
]