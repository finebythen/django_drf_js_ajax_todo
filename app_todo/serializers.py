from rest_framework.serializers import ModelSerializer
from .models import Task


class TaskSerializerGET(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TaskSerializerPOST(ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'description',
        ]
