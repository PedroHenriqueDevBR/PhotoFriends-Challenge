from django.contrib.auth.models import User

def person_register_is_valid_or_errors(data):
    errors = []
    if not "name" in data:
        errors.append("Nome é obrigatório")
    else:
        if len(data["name"]) < 3:
            errors.append("Nome deve conter 3 caracteres")
    if not "username" in data:
        errors.append("Username é obrigatório")
    else:
        if len(data["username"]) < 5:
            errors.append("Username deve conter 5 caracteres")
    if not "password" in data:
        errors.append("Password é obrigatório")
    else:
        if len(data["password"]) < 8:
            errors.append("Password deve conter 8 caracteres")
    return errors


def username_in_use(username):
    return len(User.objects.filter(username=username)) > 0

