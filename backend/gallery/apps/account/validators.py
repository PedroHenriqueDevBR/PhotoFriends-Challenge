from django.contrib.auth.models import User

def person_register_validate_form_or_errors(data):
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


