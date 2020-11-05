from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions, viewsets, serializers


class LargeResultsSetPagination(PageNumberPagination):
    """
    불러올 페이지 수 설정
    """

    page_size = 3
    page_query_param = "page_size"
    max_page_size = 100


class BaseViewSet(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = LargeResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)