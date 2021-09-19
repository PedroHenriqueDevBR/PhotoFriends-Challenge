from rest_framework.serializers import ModelSerializer, SlugRelatedField
from apps.core.models import Comment

class CommentSerializer(ModelSerializer):
    person = SlugRelatedField(many=False, read_only=True, slug_field='name')

    class Meta:
        model = Comment
        fields = [
            'id',
            'person',
            'content',
            'created_at',
        ]

class CommentSerializerCreate(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'id',
            'person',
            'photo',
            'content',
        ]

    