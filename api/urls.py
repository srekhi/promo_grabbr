from django.urls import include
from django.urls import path

from api.auth.google import GoogleLogin


urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('auth/google', GoogleLogin.as_view(), name='google_login'),
]
