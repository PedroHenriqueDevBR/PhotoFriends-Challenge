from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from apps.core.models import Person, FriendInvitation, WeddingInvitation
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'username']


class PersonSerializer(ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Person
        fields = ['id', 'image', 'name', 'user']


