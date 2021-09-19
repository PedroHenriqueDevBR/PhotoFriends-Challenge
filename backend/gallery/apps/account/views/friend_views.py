from apps.account.validators.friend_validators import friend_invitation_is_valid_or_errors
from apps.account.serializers.friend_seralizer import FriendInviteSerializer, FriendSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from apps.core.models import FriendInvitation

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
        form_errors = friend_invitation_is_valid_or_errors(data, request.user.person)
        if len(form_errors) > 0:
            return Response({"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        receiver = User.objects.get(username=data['username']).person
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