from apps.core.models import FriendInvitation
from django.contrib.auth.models import User

def friend_invitation_is_valid_or_errors(data, requester):
    errors = []
    if not "username" in data:
        errors.append("O 'username' do(a) amigo(a) é necessário")
    else:
        if data['username'] == requester.user.username:
            errors.append("Você não pode enviar o convite para sí mesmo")
        else:
            try:
                receiver = User.objects.get(username=data['username']).person
                if friend_invite_already_registered(requester, receiver):
                    errors.append("Pedido de amizade já registrado")
            except:
                errors.append("username não encontrado no banco de dados")
    return errors

def friend_invite_already_registered(logged_person, receiver_person):
    invitations = FriendInvitation.objects.filter(requester=logged_person, receiver=receiver_person)
    friends_found = logged_person.friends.filter(id=receiver_person.id)
    if len(invitations) > 0 or len(friends_found) > 0:
        return True
    return False