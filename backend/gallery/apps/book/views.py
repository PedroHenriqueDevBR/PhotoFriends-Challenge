from rest_framework.serializers import Serializer
from apps.book.serializers.photo_serializer import PhotoSerializer
from apps.core.models import Book, Person, Photo
from apps.book.validators.book_validator import book_is_valid_or_errors
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers.book_serializer import BookSerializer, BookSerializerCreator

class BookCreateAndList(APIView):
    name = 'book-create-and-list'
    permission_classes = [IsAuthenticated]

    # Selecionar todas os meus books e do conjuge
    def get(self, request):
        books = request.user.person.books.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # TODO: Deve retornar a lista de books do(a) cômjuge tembém

    # Criar novo book
    def post(self, request):
        errors = book_is_valid_or_errors(request.data)
        if len(errors) > 0:
            return Response(
                {"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE
            )
        
        request.data['creator'] = request.user.person.id
        serializer = BookSerializerCreator(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookAddAndListImages(APIView):
    name = 'book-add-image'
    permission_classes = [IsAuthenticated]

    # Lista todas as imagens de um book específico (Apenas do dono ou conjuge)
    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            assert len(request.user.person.books.filter(pk=pk)) > 0 or len(request.user.person.spouse.books.filter(pk=pk)) > 0
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        photos = book.photos.all()
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Adiciona uma imagem a um book específico
    def post(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            assert(
                book.creator.id == request.user.person.id or 
                book.creator.spouse == request.user.person or 
                book.creator in request.user.person.friends.all()
            )
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        accepted = book.creator == request.user.person or book.creator.spouse == request.user.person
        request.data['book'] = book.id
        request.data['acepted'] = accepted
        serializer = PhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


class BookPendingImage(APIView):
    name = 'book-pending-images'
    permission_classes = [IsAuthenticated]

    # Seleciona todos os books pendentes de autorização
    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            assert len(request.user.person.books.filter(pk=pk)) > 0 or len(request.user.person.spouse.books.filter(pk=pk)) > 0
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        photos = book.photos.filter(acepted=False)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookRequestImage(APIView):
    name = 'book-request-image'
    permission_classes = [IsAuthenticated]

    # Confirma a exibição de uma imagem
    def put(self, request, pk, photo_pk):
        try:
            book = Book.objects.get(pk=pk)
            photo = Photo.objects.get(pk=photo_pk)
            assert(photo.book == book)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            assert len(request.user.person.books.filter(pk=pk)) > 0 or len(request.user.person.spouse.books.filter(pk=pk)) > 0
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        photo.acepted = True
        photo.save()
        return Response(status=status.HTTP_200_OK)

    # Esconde uma imagem 
    def delete(self, request, pk, photo_pk):
        try:
            book = Book.objects.get(pk=pk)
            photo = Photo.objects.get(pk=photo_pk)
            assert(photo.book == book)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            assert len(request.user.person.books.filter(pk=pk)) > 0 or len(request.user.person.spouse.books.filter(pk=pk)) > 0
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        photo.acepted = False
        photo.save()
        return Response(status=status.HTTP_200_OK)


class FriendBooks(APIView):
    name = 'friend-books'
    permission_classes = [IsAuthenticated]

    # Lista todos os books de um amigo
    def get(self, request, pk):
        try:
            friend = Person.objects.get(pk=pk)
            assert(request.user.person in friend.friends.all())
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        books = friend.books.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FriendImageBook(APIView):
    name = 'friend-image-book'
    permission_classes = [IsAuthenticated]

    # Seleciona todas as fotos de um book selecionado
    def get(self, request, pk, book_pk):
        try:
            friend = Person.objects.get(pk=pk)
            book = Book.objects.get(pk=book_pk)
            assert(request.user.person in friend.friends.all())
            assert(book.creator == friend)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        photos = book.photos.all()
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
