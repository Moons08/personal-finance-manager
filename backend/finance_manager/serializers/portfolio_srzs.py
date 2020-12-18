from rest_framework import serializers
from finance_manager.models.portfolio import Portfolio

from .asset_srzs import (
    UserStockListSerializer,
    UserRealtySerializer,
    UserCashSerializer,
)


class PortfolioSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_stocks = UserStockListSerializer(many=True, read_only=True)
    user_realties = UserRealtySerializer(many=True, read_only=True)
    user_cashs = UserCashSerializer(many=True, read_only=True)

    def to_representation(self, obj):
        """
        총 자산 금액 계산
        """

        def _get_total(rep, asset, obj="present_value", to=None):
            """
            related asset의 총합 return 값에 추가
            return: rep += ["{asset}_tot_{to}"]
            """
            to = obj if to is None else to

            _assets = rep[asset]
            rep[f"{asset}_tot_{to}"] = 0
            for _asset in _assets:
                rep[f"{asset}_tot_{to}"] += _asset[obj]
            return rep

        rep = super().to_representation(obj)
        rep = _get_total(rep, "user_stocks", to="pv")
        rep = _get_total(rep, "user_stocks", obj="profit")
        rep = _get_total(rep, "user_realties", to="pv")
        rep = _get_total(rep, "user_realties", obj="profit")
        rep["tot_pv"] = rep["user_stocks_tot_pv"] + rep["user_realties_tot_pv"]
        rep["tot_profit"] = (
            rep["user_stocks_tot_profit"] + rep["user_realties_tot_profit"]
        )

        return rep

    class Meta:
        model = Portfolio
        fields = [
            "id",
            "user",
            "name",
            "user_stocks",
            "user_realties",
            "user_cashs",
        ]
        ordering = ["id"]
