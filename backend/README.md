# Backend


## Endpoints

1. Register user (/v1/user/register)

```json
# Entrada
{
    "name": "", # Deve ter pelo mesno 3 caracteres
    "username": "", # Deve ter pelo mesno 5 caracteres
    "password": "", # Deve ter pelo mesno 8 caracteres
}

# Saída
Status: 201
{}
```

2. Login with JWT (/v1/token/)

```json
# Entrada
{
	"username": "pedro",
	"password": "senha123"
}

# Saída
Status: 200
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
}
```