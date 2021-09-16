from django.dispatch.dispatcher import receiver
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from apps.core.models import Person
from .validators import *
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


class SpouseInvite(APIView):
    name = 'spouse-invite'
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

class SpouseInviteList(APIView):
    name = 'spouse_invite_list'

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