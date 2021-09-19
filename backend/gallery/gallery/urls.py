from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from apps.account import urls as account_urls
from apps.book import urls as book_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include(account_urls)),
    path('book/', include(book_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
