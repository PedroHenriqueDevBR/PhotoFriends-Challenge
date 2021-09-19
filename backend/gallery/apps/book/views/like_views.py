from apps.book.validators.like_validator import like_is_valid_or_errors
from apps.book.serializers.like_serializer import LikeSerializer
from apps.book.validators.comment_validator import comment_is_valid_or_errors
from typing import Dict
from apps.book.serializers.comment_serializer import CommentSerializer, CommentSerializerCreate
from apps.book.serializers.photo_serializer import PhotoSerializer
from apps.core.models import Book, Comment, Like, Photo
from apps.book.validators.book_validator import book_is_valid_or_errors
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..serializers.book_serializer import BookSerializer, BookSerializerCreator

class LikeCreateAndList(APIView):
    name = 'like-create-and-list'
    permission_classes = [IsAuthenticated]

    # Seleciona todos os comentários de acordo com o ID da foto
    def get(self, request, pk):
        try:
            photo = Photo.objects.get(pk=pk)
            assert((request.user.person == photo.book.creator) or (request.user.person in photo.book.creator.friends.all()))
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        likes = photo.received_likes.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Adiciona um comentário de acordo com o ID da foto
    def post(self, request, pk):
        try:
            photo = Photo.objects.get(pk=pk)
            assert((request.user.person == photo.book.creator) or (request.user.person in photo.book.creator.friends.all()))
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        errors = like_is_valid_or_errors(photo, request.user.person)
        if len(errors) > 0:
            return Response({"errors": errors}, status=status.HTTP_406_NOT_ACCEPTABLE)


        like = Like(person=request.user.person, photo=photo)
        like.save()
        serializer = LikeSerializer(like, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
