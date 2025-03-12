# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import RecapModel


# Create a model serializer
class RecapSerializer(serializers.HyperlinkedModelSerializer):
    # specify model and fields
    class Meta:
        model = RecapModel
        fields = ("title", "body", "timestamp")
