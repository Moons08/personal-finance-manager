from test_plus import TestCase
from .factories import ArticleFactory, UserFactory


class ArticleTestCase(TestCase):
    def setUp(self):
        self.author = UserFactory(username='author_name')
        self.user = UserFactory(username='client_name')

    def test_article_get_list(self):
        response = self.get('/finance_manager/articles/')
        self.assertEqual(200, response.status_code)

        ArticleFactory.create_batch(10, author=self.author)
        response = self.get('/finance_manager/articles/')
        self.assertEqual(10, response.json().get('count'))

    def test_article_get_detail(self):
        ArticleFactory(id=1, author=self.author)
        response = self.get('/finance_manager/articles/1/')
        response_data = response.data
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, response_data['id'])
        self.assertEqual('author_name', response_data['author'])

