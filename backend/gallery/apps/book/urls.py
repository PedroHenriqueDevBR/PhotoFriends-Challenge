from .views.book_views import *
from .views.photo_views import *
from django.urls import path

urlpatterns = [
    path('', BookCreateAndList.as_view(), name=BookCreateAndList.name),
    path('<int:pk>/photos', BookAddAndListImages.as_view(), name=BookAddAndListImages.name),
    path('<int:pk>/photos/pending', BookPendingImage.as_view(), name=BookPendingImage.name),
    path('<int:pk>/photos/<int:photo_pk>', BookRequestImage.as_view(), name=BookRequestImage.name),
    
    path('friend/<int:pk>/books', FriendBooks.as_view(), name=FriendBooks.name),
    path('friend/<int:pk>/books/<int:book_pk>', FriendImageBook.as_view(), name=FriendImageBook.name),
]
