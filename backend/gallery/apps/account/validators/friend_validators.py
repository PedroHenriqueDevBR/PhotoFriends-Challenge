from apps.core.models import FriendInvitation, Person, WeddingInvitation

def friend_invitation_is_valid_or_errors(data, logged_person_id):
    errors = []
    if not "target_id" in data:
        errors.append("O 'target_id' do(a) amigo(a) é necessário")
    else:
        if data['target_id'] == logged_person_id:
            errors.append("Você não pode enviar o convite para sí mesmo")
        else:
            try:
                requester = Person.objects.get(id=logged_person_id)
                receiver = Person.objects.get(id=data['target_id'])
                if friend_invite_already_registered(requester, receiver):
                    errors.append("Pedido de amizade já registrado")
            except:
                errors.append("ID não encontrado no banco de dados")
    return errors

def friend_invite_already_registered(logged_person, receiver_person):
    invitations = FriendInvitation.objects.filter(requester=logged_person, receiver=receiver_person)
    if len(invitations) == 0:
        return False
    return True