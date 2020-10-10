from django.contrib.auth.models import User
from finance_manager.serializers.user import UserSerializer

from rest_framework import viewsets


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


# class UserList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)