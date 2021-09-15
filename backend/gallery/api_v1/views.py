from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from core.models import Person


class IndexView(APIView):
    name = "index-view"

    def get(self, request):
        return Response(status=status.HTTP_200_OK)


class PersonRegisterView(APIView):
    name = "person-register-view"

    def person_register_validate_form_or_errors(self, data):
        errors = []
        if not "name" in data:
            errors.append("Name is required")
        else:
            if len(data["name"]) < 3:
                errors.append("Name must be at least 3 characters")
        if not "username" in data:
            errors.append("Username is required")
        else:
            if len(data["username"]) < 5:
                errors.append("Username must be at least 5 characters")
            if len(User.objects.filter(username=data["username"])) > 0:
                errors.append("Username already exists")
        if not "password" in data:
            errors.append("Password is required")
        else:
            if len(data["password"]) < 8:
                errors.append("Password must be at least 8 characters")
        return errors

    def post(self, request):
        data = request.data
        form_errors = self.person_register_validate_form_or_errors(data)
        if len(form_errors) > 0:
            return Response(
                {"errors": form_errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )

        self.create_user(data)
        return Response(status=status.HTTP_201_CREATED)

    def create_user(self, user_data):
        user = User.objects.create_user(
            username=user_data["username"],
            first_name=user_data["name"],
            password=user_data["password"],
        )
        Person.objects.create(user=user)
