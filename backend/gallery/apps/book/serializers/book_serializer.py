from apps.book.serializers.photo_serializer import PhotoSerializer
from rest_framework.serializers import ModelSerializer, SlugRelatedField
from apps.core.models import Book

class BookSerializerCreator(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookSerializer(ModelSerializer):
    creator = SlugRelatedField(many=False, read_only=True, slug_field='name')
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'description',
            'cover_image',
            'created_at',
            'creator',
            'photos',
        ]

class BookFriendSerializer(ModelSerializer):
    creator = SlugRelatedField(many=False, read_only=True, slug_field='name')

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'description',
            'cover_image',
            'created_at',
            'creator',
        ]