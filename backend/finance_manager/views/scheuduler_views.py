from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, viewsets, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from finance_manager.serializers.asset_srzs import (
    ExpectAssetSerializer,
)


class AssetScheduler:
    # TODO: 값 검증
    def __init__(
        self, present_value, monthly_input, interest, future_value=None, year=None
    ):
        self.pv = present_value
        self.fv = future_value
        self.a = monthly_input
        self.r = interest * 0.01 + 1
        self.n = year
        self.data = {}

    def calculate(self):
        """
        빈 파라미터를 채우는 연산 적용
        """
        if self.fv is None:
            self._calculate_fv()

        elif self.n is None:
            self._calculate_y()

    def _calculate_fv(self):
        """
        투입금, 이자율, 기간 -> 미래 가치 계산
        """
        pv = self.pv
        a = self.a
        r = self.r
        n = self.n
        fvs = {}

        for i in range(1, n + 1):
            fvs[i] = {}

            # 기대 자산
            fvs[i]["future_value"] = (
                round(pv * r + a)
                if i == 1  # 첫해 투입분 이자 x
                else round((pv * (r ** i)) + (a * (r ** i - 1) / (r - 1)))
            )

            # 누적 추가 투자액
            fvs[i]["cum_input"] = a * i

            # 누적 이자 = 기대 자산 - (현재 가치 + 누적 추가 투자액)
            fvs[i]["cum_interest"] = fvs[i]["future_value"] - (pv + fvs[i]["cum_input"])

        self.data["future_values"] = fvs
        # 마지막 값 바로 찾을 수 있도록 추가
        self.data["future_value"] = self.data["future_values"][n]["future_value"]

    def _calculate_y(self):
        """
        미래가치, 투입금, 이자율 -> 기간 계산
        """
        # import numpy as np

        pv = self.pv
        fv = self.fv
        a = self.a
        r = self.r

        i, temp_fv = 1, 0
        fvs = {}
        # direct
        # n = np.log(r) / np.log(1 - (1 - r) * fv / a)

        # TODO: 반복제거
        while fv > temp_fv:
            fvs[i] = {}

            # 기대 자산
            temp_fv = (
                round(pv * r + a)
                if i == 1  # 첫해 투입분 이자 x
                else round((pv * (r ** i)) + (a * (r ** i - 1) / (r - 1)))
            )
            fvs[i]["future_value"] = temp_fv
            fvs[i]["cum_input"] = a * i
            fvs[i]["cum_interest"] = fvs[i]["future_value"] - (pv + fvs[i]["cum_input"])
            i += 1

        self.data["future_values"] = fvs
        self.data["period"] = i - 1


@api_view(["POST", "GET"])
@csrf_exempt
def get_expect_asset(request):
    if request.method == "GET":
        serializer = ExpectAssetSerializer()
        return Response(serializer.data)
    else:

        data = request.data

        asset_scheduler = AssetScheduler(**data)
        asset_scheduler.calculate()

        data["expect"] = asset_scheduler.data

        return Response(data=data)