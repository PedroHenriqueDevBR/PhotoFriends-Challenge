from apps.account.serializers.person_serializers import PersonSerializer
from apps.account.validators.friend_validators import friend_invitation_is_valid_or_errors
from apps.account.serializers.friend_seralizer import FriendInviteSerializer, FriendSerializer
from apps.account.validators.person_validators import person_register_is_valid_or_errors, username_in_use
from apps.account.validators.spouse_validators import wedding_invitation_is_valid_or_errors
from apps.account.serializers.spouse_seralizer import SpouseInviteSerializer
from django.dispatch.dispatcher import receiver
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from apps.core.models import FriendInvitation, Person, WeddingInvitation
from .serializers import *

class PersonDataView(APIView):
    name = 'person-data-view'
    permission_classes = [IsAuthenticated]

    def get(self, request):
        image = request.user.person.image
        if image == '':
            image = None
        return Response(
            {
                'name': request.user.first_name,
                'username': request.user.username,
                'image': image,
            },
            status=status.HTTP_200_OK,
        )

class PersonRegisterView(APIView):
    name = "person-register-view"

    def create_user(self, user_data):
        user = User.objects.create_user(
            username=user_data["username"],
            first_name=user_data["name"],
            password=user_data["password"],
        )
        Person.objects.create(user=user)

    def post(self, request):
        data = request.data
        form_errors = person_register_is_valid_or_errors(data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        if (username_in_use(data["username"])):
            return Response(
                {"errors": form_errors}, status=status.HTTP_409_CONFLICT
            )
        self.create_user(data)
        return Response(status=status.HTTP_201_CREATED)


class SpouseReceivedAndCreateInvites(APIView):
    name = 'spouse_received_invite_create'
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_spouse = request.user.person.spouse
        received_wedding_invitation = request.user.person.received_wedding.all()
        if current_spouse is not None:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = SpouseInviteSerializer(received_wedding_invitation, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        form_errors = wedding_invitation_is_valid_or_errors(data, request.user.person.id)
        if len(form_errors) > 0:
            return Response({"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

        receiver = Person.objects.get(id=data['target_id'])
        invite = WeddingInvitation(requester=request.user.person, receiver=receiver)
        invite.save()
        return Response(status=status.HTTP_201_CREATED)

class SpouseCreatedInviteList(APIView):
    name = 'spouse_created_invite_list'

    def get(self, request):
        current_spouse = request.user.person.spouse
        received_wedding_invitation = request.user.person.created_wedding.all()
        if current_spouse is not None:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = SpouseInviteSerializer(received_wedding_invitation, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SpouseInviteResponse(APIView):
    name = 'spouse_invite_response'
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            invitation = WeddingInvitation.objects.get(pk=pk)
            if (invitation.receiver != request.user.person):
                return Response(status=status.HTTP_404_NOT_FOUND)
            invitation.accept()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            invitation = WeddingInvitation.objects.get(pk=pk)
            if (invitation.receiver != request.user.person):
                return Response(status=status.HTTP_404_NOT_FOUND)
            invitation.reject()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FriendCreateAndList(APIView):
    name = 'friend_list_create'
    permission_classes = [IsAuthenticated]

    def get(self, request):
        person = request.user.person
        friends_response = person.friends.all()
        serializer = FriendSerializer(friends_response, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        data = request.data
        form_errors = friend_invitation_is_valid_or_errors(data, request.user.person.id)
        if len(form_errors) > 0:
            return Response({"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        receiver = Person.objects.get(id=data['target_id'])
        invite = FriendInvitation(requester=request.user.person, receiver=receiver)
        invite.save()
        return Response(status=status.HTTP_201_CREATED)

class FriendInviteList(APIView):
    name = 'friend_invite_list_create'
    permission_classes = [IsAuthenticated]

    def get(self, request):
        person = request.user.person
        data = person.received_invitations.all()
        serializer = FriendInviteSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FriendInviteResponse(APIView):
    name = 'friend_invite_response'
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            invite = FriendInvitation.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        person = request.user.person
        if invite.receiver != person:
            return Response(status=status.HTTP_403_FORBIDDEN)
        invite.accept()
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            invite = FriendInvitation.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        person = request.user.person
        if invite.receiver != person:
            return Response(status=status.HTTP_403_FORBIDDEN)
        invite.reject()
        return Response(status=status.HTTP_200_OK)