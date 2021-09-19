def like_is_valid_or_errors(photo, logged_person):
    errors = []
    likes_count = len(photo.received_likes.filter(photo=photo, person=logged_person))
    if likes_count > 0:
        errors.append("O like já foi registrado")
    return errors