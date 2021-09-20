from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.core.models import Photo

class PhotoSerializer(ModelSerializer):
    
    class Meta:
        model = Photo
        fields = [
            'id',
            'url',
            'acepted',
            'book',
        ]
