from apps.core.models import Person, WeddingInvitation
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


def wedding_invitation_is_valid_or_errors(data, logged_person_id):
    errors = []
    if not "target_id" in data:
        errors.append("O 'target_id' do cônjuge é necessário")
    else:
        if data['target_id'] == logged_person_id:
            errors.append("Você não pode se casar consigo mesmo")
        elif Person.objects.get(id=logged_person_id).spouse is not None:
            errors.append("Você já encontra-se casado")
        else:
            try:
                
                requester = Person.objects.get(id=logged_person_id)
                receiver = Person.objects.get(id=data['target_id'])
                if wedding_invite_already_registered(requester, receiver):
                    errors.append("Pedido já registrado")
            except:
                errors.append("ID não encontrado no banco de dados")
    return errors

def wedding_invite_already_registered(logged_person, receiver_person):
    invitations = WeddingInvitation.objects.filter(requester=logged_person, receiver=receiver_person)
    if len(invitations) == 0:
        return False
    return True