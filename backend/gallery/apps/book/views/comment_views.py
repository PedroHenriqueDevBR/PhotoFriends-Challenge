from apps.book.validators.comment_validator import comment_is_valid_or_errors
from apps.book.serializers.comment_serializer import CommentSerializer, CommentSerializerCreate
from apps.core.models import Comment, Photo
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class CommentCreateAndList(APIView):
    name = 'comment-create-and-list'
    permission_classes = [IsAuthenticated]

    # Recebe o id da foto e retorna todos os comentários
    def get(self, request, pk):
        try:
            photo = Photo.objects.get(pk=pk)
            assert((request.user.person == photo.book.creator) or (request.user.person in photo.book.creator.friends.all()))
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        comments = photo.received_comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Recebe o id da foto e adicionar o comentário (Caso seja amigo do dono ou o dono da foto)
    def post(self, request, pk):
        try:
            photo = Photo.objects.get(pk=pk)
            assert((request.user.person == photo.book.creator) or (request.user.person in photo.book.creator.friends.all()))
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = request.data
        errors = comment_is_valid_or_errors(data)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        data["person"] = request.user.person.id
        data["photo"] = photo.id
        serializer = CommentSerializerCreate(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentEdit(APIView):
    name = 'comment-edit'
    permission_classes = [IsAuthenticated]

    # Recebe o id do comentário atualiza o mesmo (Somente o dono do comentário)
    def put(self, request, pk):
        try:
            comment = Comment.objects.get(pk=pk)
            assert(request.user.person == comment.person)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)            
        data = request.data
        errors = comment_is_valid_or_errors(data)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)
        data["person"] = request.user.person.id
        data["photo"] = comment.photo.id
        serializer = CommentSerializerCreate(comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # Recebe o id do comentário deleta (Caso seja amigo do dono ou o dono da foto)
    def delete(self, request, pk):
        try:
            comment = Comment.objects.get(pk=pk)
            assert(request.user.person == comment.person)
            assert(
                (request.user.person == comment.person) or 
                (request.user.person == comment.photo.book.creator)
            )
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    