from apps.core.models import Person, WeddingInvitation
from apps.account.serializers.person_serializers import PersonSerializer, UserSerializer
from rest_framework.serializers import ModelSerializer


class FriendSerializer(ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Person
        fields = ['id', 'image', 'name', 'user']


class FriendInviteSerializer(ModelSerializer):
    requester = PersonSerializer(many=False, read_only=True)

    class Meta:
        model = WeddingInvitation
        fields = ['id', 'requester']