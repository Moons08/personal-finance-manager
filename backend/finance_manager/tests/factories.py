import factory
import faker

from django.contrib.auth.models import User
from finance_manager.models.article import Article


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = 'test_username'


class ArticleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Article

    subject = factory.Faker('sentence')
