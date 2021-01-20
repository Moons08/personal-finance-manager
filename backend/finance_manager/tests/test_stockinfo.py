from test_plus import TestCase
from .factories import StockInfoFactory, MarketFactory


class StockInfoTestCase(TestCase):
    def setUp(self):
        self.market = MarketFactory()

    def test_stockinfo_get_list(self):
        response = self.get("/finance_manager/stockinfo/")
        self.assertEqual(200, response.status_code)

        StockInfoFactory.create_batch(10, market=self.market)
        response = self.get("/finance_manager/stockinfo/")
        self.assertEqual(10, response.json().get("count"))

    def test_stockinfo_get_detail(self):
        StockInfoFactory(key="USTSLA", ticker="TSLA", market=self.market)
        response = self.get("/finance_manager/stockinfo/USTSLA/")
        response_data = response.data
        self.assertEqual(200, response.status_code)
        self.assertEqual("USTSLA", response_data["key"])
        self.assertEqual("TSLA", response_data["ticker"])
