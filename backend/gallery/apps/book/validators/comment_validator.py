def comment_is_valid_or_errors(data):
    errors = []
    if not "content" in data:
        errors.append("O conteúdo é obrigatório")
    return errors