from test_plus import TestCase


class ArticleTestCase(TestCase):
    def test_get(self):
        res = self.get('/finance_manager/articles/')
        self.assertEqual(200, res.status_code)
