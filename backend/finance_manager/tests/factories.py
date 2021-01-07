import datetime
import factory
import faker
import factory.fuzzy

from django.contrib.auth.models import User
from finance_manager.models.article import Article
from finance_manager.models.asset import UserStock
from finance_manager.models.portfolio import Portfolio
from finance_manager.models.info import StockInfo, StockPrice, ExchangeRate

# fake = faker.Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = "test_username"


class ArticleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Article

    subject = factory.Faker("sentence")


class ExchangeRateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ExchangeRate

    market = factory.fuzzy.FuzzyChoice(("US", "KO", "JP"))
    reg_date = "2020-10-10"
    ex_rate = 200.0


class StockInfoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = StockInfo

    market = factory.SubFactory(ExchangeRateFactory)
    key = factory.fuzzy.FuzzyText(length=10)
