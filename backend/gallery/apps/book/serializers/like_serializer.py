from rest_framework.serializers import ModelSerializer, SlugRelatedField
from apps.core.models import Comment

class LikeSerializer(ModelSerializer):
    person = SlugRelatedField(many=False, read_only=True, slug_field='name')

    class Meta:
        model = Comment
        fields = [
            'id',
            'person',
        ]
