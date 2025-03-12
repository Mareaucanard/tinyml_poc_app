# import viewsets
from rest_framework import viewsets

# import local data
from .serializers import RecapSerializer
from .models import RecapModel

# create a viewset


class RecapViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = RecapModel.objects.all()

    # specify serializer to be used
    serializer_class = RecapSerializer
