from django.test import SimpleTestCase
from django.core.cache import cache


class ArticleTestCase(SimpleTestCase):
    def tearDown(self) -> None:
        cache.clear()

    def test_cache(self):
        # set cache
        cache.set('key1', 'value1', 60)
        cache.set('key2', 'value2', 60)
        # test get cache
        self.assertEqual(cache.get('key1'), 'value1')
        self.assertEqual(cache.get('key2'), 'value2')
        # test get_or_set
        self.assertIsNone(cache.get('key3'))
        self.assertEqual(cache.get_or_set('key3', 'value3'), 'value3')
        # test delete cache
        cache.delete('key1')
        self.assertIsNone(cache.get('key1'))
