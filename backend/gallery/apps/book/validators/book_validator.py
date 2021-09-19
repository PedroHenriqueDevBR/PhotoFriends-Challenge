def book_is_valid_or_errors(data):
    errors = []
    if not "title" in data:
        errors.append("O título é obrigatório")
    if not "description" in data:
        errors.append("A descrição é obrigatória")
    return errors