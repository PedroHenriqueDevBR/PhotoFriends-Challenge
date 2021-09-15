# Backend


## Endpoints

1. Register user


/v1/user/register

```json
# Entrada
{
    "name": "", # Deve ter pelo mesno 3 caracteres
    "username": "", # Deve ter pelo mesno 5 caracteres
    "password": "", # Deve ter pelo mesno 8 caracteres
}

# Saída
201, {}
```

