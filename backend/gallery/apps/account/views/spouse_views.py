from apps.account.validators.spouse_validators import wedding_invitation_is_valid_or_errors
from apps.account.serializers.spouse_seralizer import SpouseInviteSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from apps.core.models import Person, WeddingInvitation

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
            try:
                invitation.accept()
            except:
                invitation.reject()
                return Response({"errors": {'O(A) solicitante se tornou cônjuge de outra pessoa'}}, status=status.HTTP_406_NOT_ACCEPTABLE)
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