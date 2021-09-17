from .views import *
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', PersonDataView.as_view(), name=PersonDataView.name),
    path('register', PersonRegisterView.as_view(), name=PersonRegisterView.name),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('spouse/', SpouseReceivedAndCreateInvites.as_view(), name=SpouseReceivedAndCreateInvites.name),
    path('spouse/invitations/created', SpouseCreatedInviteList.as_view(), name=SpouseCreatedInviteList.name),
    path('spouse/response/<int:pk>', SpouseInviteResponse.as_view(), name=SpouseInviteResponse.name),
    
    path('friend/', FriendCreateAndList.as_view(), name=FriendCreateAndList.name),
    path('friend/invitations/received', FriendInviteList.as_view(), name=FriendInviteList.name),
    path('friend/invitations/<int:pk>', FriendInviteResponse.as_view(), name=FriendInviteResponse.name),
]
