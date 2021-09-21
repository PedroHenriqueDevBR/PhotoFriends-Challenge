<h1 align="center">Desafio - Galeria de amigos</h1>

<p align="center">
Aplicação desenvolvida como desafio para a seleção de desenvolvedor na Defensoria Pública do Piauí.
</p>

<p align="center">
<img alt="Developer" src="https://img.shields.io/badge/Developer-PedroHenriqueDevBR-green">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/pedrohenriquedevbr/carteira-de-vacinacao-animal">
<img alt="Front-emd" src="https://img.shields.io/badge/Frontend-Flutter-blue">
<img alt="Back-end" src="https://img.shields.io/badge/Backend-Django-green">
</p>

<br>

# :memo: Visão Geral

 * <strong><a href="#description">Descrição completa do sistema</a></strong>
 * <strong><a href="#tecnologias">Tecnologias utilizadas</a></strong>
 * <strong><a href="#modelagem">Modelagem da aplicação</a></strong>
    * <strong><a href="#modelagem-classes">Modelagem das classes</a></strong>
    * <strong><a href="#modelagem-mapa-aplicacao">Mapa da aplicação</a></strong>
 * <strong><a href="#requisitos">Pré-requisitos</a></strong>
 * <strong><a href="#instalacao">Instalação</a></strong>
 * <strong><a href="#funcionalidades">Funcionalidades</a></strong>
 * <strong><a href="#screenshots">Screenshots</a></strong>

<br>
<h1 id="description">:speech_balloon: Descrição</h1>

**Galeria de Amigos**

Você recebeu um pedido de um amigo para criar uma galeria para seu casamento onde seus amigos poderão fazer upload de suas fotos e ele terá uma galeria unificada com todas as fotos de amigos.
Ele deseja aprovar as fotos antes de ficarem visíveis para todos. Ele e sua esposa devem ser os únicos capazes de aprovar novas fotos.
Os usuários devem ser capazes de curtir fotos e adicionar comentários às fotos.
Por favor, crie um site que atenda às suas necessidades. Você deve usar python no back-end, com qualquer framework de sua escolha, bem como para o front-end.

**Detalhes da solução**

* A resolução deve ser uma aplicação web responsiva.
* Deve-se fornecer todas as informações necessárias para testar a aplicação.
* A aplicação precisa rodar.
* O código precisa ser hospedado em seu repositório de código preferido.
* Você precisa hospedar a aplicação em um servidor de sua escolha e nos fornecer um link para acessar e usar o aplicativo.
* Você deve fornecer evidências suficientes de que sua solução está completa, indicando, no mínimo, que ela funciona corretamente em relação aos requisitos.


<br>
<h1 id="tecnologias">:rocket: Tecnologias utilizadas</h1>

* <img alt="Dart" src="https://img.shields.io/badge/-TypeScript-blue"> - Linguagem de programação utilizada no desenvolvimento Front-end.
* <img alt="Flutter" src="https://img.shields.io/badge/-Angular-blue"> - Framework utilizado no desenvolvimento da aplicação web.
* <img alt="Python" src="https://img.shields.io/badge/-Python-green"> - Linguagem de programação utilizada no desenvolvimento Back-end.
* <img alt="Python" src="https://img.shields.io/badge/-Django-green"> - Framework utilizado no desenvolvimento da REST API.
* <img alt="DRF" src="https://img.shields.io/badge/-DRF-red"> - Toolkit utilizado junto do Django para facilitar a criação da REST API.

<br>
<h1 id="modelagem">:bulb: Modelagem da aplicação</h1>

Esta seção irá mostrar como a aplicação foi modelada para que pudesse atender todas as necessidades propostas da descrição do desafio.

A modelagem foi criada antes de iniciar o desenvolvimento da aplicação, com o objetivo de guiar o desenvolvimento e evitar erros que pudessem atrapalhar o andamento do desenvolvimento.

<br>
<h2 id="modelagem-classes">Modelagem do banco de dados</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/desafio-galeria-fullstack/main/docs/models/database.png" />

<br>
<h2 id="modelagem-mapa-aplicacao">Pŕototipo da aplicação</h2>

<img width="100%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/prototype/prototype.png" />

<br>
<h1 id="requisitos">:warning: Pré-requisitos</h1>

O desenvolvimento dessa aplicação utiliza como base as seguintes tecnologias e versões apresentadas abaixo.

1. Angular CLI: 12.2.5
2. Node: 14.17.6
3. Package Manager: npm 6.14.15
4. Python 3.6
5. Django 3.2.6
6. git version 2.17.1

<br>
<h1 id="instalacao">:information_source: Instalação</h1>

```bash
# Baixe o projeto no seu computador
git clone https://github.com/PedroHenriqueDevBR/PhotoFriends-Challenge.git
cd PhotoFriends-Challenge/

# Crie uma máquina virtual para o back-end
cd backend/gallery/
virtualenv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt

# Rode o servidor localmente
python manage.py migrate
python manage.py runserver

# Mude para o diretório da aplicação frontend
cd ../../frontend/gallery-frontend/

# Rode a aplicação no seu computador com os comandos
npm install
npm run start
```

<br>
<h1 id="funcionalidades">:heavy_check_mark: Funcionalidades</h1>

## Funcionalidades

 * Registro de usuário
 * Autenticação de usuário
 * Enviar convide para cônjuge
 * Apresentar os pedidos de cônjuges recebidos
 * Aceitar ou rejeitar convite de cônjuge
 * Convidar amigo com base no username
 * Apresentar os pedidos de amizades recebidos
 * Aceitar ou recusar pedido de amizade
 * Apresentar os meus amigos
 * Criar Book
 * Listar os meus Books (books do(a) cônjuge inclusos)
 * Adicionar imagens ao Book
 * Listar todos os Books dos meus amigos
 * Acessar perfil de um amigo
 * Acessar Book de um amigo
 * Adicionar Imagem no Book do amigo
 * Aceitar ou recusar imagem adicionada por um amigo (criador(ar) ou cônjuge)
 * Comentar a foto de um amigo
 * Listar todos os comentários de uma imagem
 * Remover o comentário (se feito por mim ou pelo dono da foto)
 * Curtir a foto de um amigo
 * Apresentar a quantidade de curtidas recebidas


## Backend (Finalizadas)

 - [X] Registro de usuário
 - [X] Autenticação de usuário
 - [X] Enviar convide para cônjuge
 - [X] Apresentar os pedidos de cônjuges recebidos
 - [X] Aceitar ou rejeitar convite de cônjuge
 - [X] Convidar amigo com base no username
 - [X] Apresentar os pedidos de amizades recebidos
 - [X] Aceitar ou recusar pedido de amizade
 - [X] Apresentar os meus amigos
 - [X] Criar Book
 - [X] Listar os meus Books (books do(a) cônjuge inclusos)
 - [X] Adicionar imagens ao Book
 - [X] Listar todos os Books dos meus amigos
 - [X] Acessar perfil de um amigo
 - [X] Acessar Book de um amigo
 - [X] Adicionar Imagem no Book do amigo
 - [X] Aceitar ou recusar imagem adicionada por um amigo (criador(ar) ou cônjuge)
 - [X] Comentar a foto de um amigo
 - [X] Listar todos os comentários de uma imagem
 - [X] Remover o comentário (se feito por mim ou pelo dono da foto)
 - [X] Curtir a foto de um amigo
 - [X] Apresentar a quantidade de curtidas recebidas
 - [X] Deploy da aplicação backend


## Frontend (Finalizadas)

 - [X] Registro de usuário
 - [X] Autenticação de usuário
 - [X] Enviar convide para cônjuge
 - [X] Apresentar os pedidos de cônjuges recebidos
 - [X] Aceitar ou rejeitar convite de cônjuge
 - [X] Convidar amigo com base no username
 - [X] Apresentar os pedidos de amizades recebidos
 - [X] Aceitar ou recusar pedido de amizade
 - [X] Apresentar os meus amigos
 - [X] Criar Book
 - [X] Listar os meus Books (books do(a) cônjuge inclusos)
 - [X] Adicionar imagens ao Book
 - [X] Listar todos os Books dos meus amigos
 - [X] Acessar perfil de um amigo
 - [X] Acessar Book de um amigo
 - [X] Adicionar Imagem no Book do amigo
 - [X] Aceitar ou recusar imagem adicionada por um amigo (criador(ar) ou cônjuge)
 - [X] Comentar a foto de um amigo
 - [X] Listar todos os comentários de uma imagem
 - [X] Remover o comentário (se feito por mim ou pelo dono da foto)
 - [X] Curtir a foto de um amigo
 - [X] Apresentar a quantidade de curtidas recebidas
 - [X] Deploy da aplicação frontend

<br>
<h2 id="screenshots">:heavy_check_mark: Funcionalidades</h2>


<h3>Login e Cadastro</h3>

<p>
<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/login.png" />

<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/register.png" />
</p>

<h3>Menu</h3>

<p>
<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/menu.png" />
</p>

<h3>Timeline</h3>

<p>
<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/timeline.png" />

<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/timeline-book-selected.png" />

<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/timeline-image-detail.png" />

<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/timeline-book-comment.png" />
</p>

<h3>Minhas galerias</h3>

<p>
<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/books.png" />

<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/books-edit.png" />
</p>

<h3>Lista de amigos</h3>

<p>
<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/friends.png" />

<img width="49%" src="https://raw.githubusercontent.com/PedroHenriqueDevBR/PhotoFriends-Challenge/main/docs/screenshots/friends-request.png" />
</p>