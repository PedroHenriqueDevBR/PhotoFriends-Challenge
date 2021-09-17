from apps.core.models import Person, WeddingInvitation
from apps.account.serializers.person_serializers import PersonSerializer, UserSerializer
from rest_framework.serializers import ModelSerializer, SlugRelatedField


class FriendSerializer(ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    spouse = SlugRelatedField(many=False, read_only=True, slug_field='name')
    class Meta:
        model = Person
        fields = ['id', 'image', 'name', 'spouse', 'user']


class FriendInviteSerializer(ModelSerializer):
    requester = PersonSerializer(many=False, read_only=True)

    class Meta:
        model = WeddingInvitation
        fields = ['id', 'requester']