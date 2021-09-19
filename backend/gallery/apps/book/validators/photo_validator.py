def photo_is_valid_or_errors(data):
    errors = []
    if not "url" in data:
        errors.append("A url da imagem é obrigatória")
    return errors