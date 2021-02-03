from test_plus import TestCase
from .factories import PortfolioFactory, UserFactory


class PortfolioTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory(username="user_name")

    def test_portfolio_get_detail(self):
        PortfolioFactory(id=1, user=self.user, name="test")
        response = self.get("/finance_manager/portfolio/1/")
        response_data = response.data

        self.assertEqual(200, response.status_code)
        self.assertEqual(1, response_data["id"])
        self.assertEqual("test", response_data["name"])

    def test_portfolio_get_list(self):
        user1 = self.make_user("u1")

        with self.login(username=user1.username, password="password"):
            response = self.get("/finance_manager/portfolio/")
            self.assertEqual(200, response.status_code)

            PortfolioFactory.create_batch(10, user=user1)
            response = self.get("/finance_manager/portfolio/")
            self.assertEqual(10, len(response.json()))