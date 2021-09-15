from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from apps.core.models import Person
from .validators import person_register_validate_form_or_errors, username_in_use

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
        form_errors = person_register_validate_form_or_errors(data)
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

