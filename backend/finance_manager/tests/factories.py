import datetime
import factory
import faker
import factory.fuzzy

from django.contrib.auth.models import User
from finance_manager.models.article import Article
from finance_manager.models.asset import UserStock
from finance_manager.models.portfolio import Portfolio
from finance_manager.models.info import StockInfo, StockPrice, Market

# fake = faker.Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = "test_username"


class ArticleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Article

    subject = factory.Faker("sentence")


class MarketFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Market

    market = factory.fuzzy.FuzzyChoice(("US", "KO", "JP"))

    exchange_date = "2020-10-10"
    exchange_rate = 200.0


class StockInfoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = StockInfo

    market = factory.SubFactory(MarketFactory)
    key = factory.fuzzy.FuzzyText(length=10)
