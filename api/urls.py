from django.urls import include
from django.urls import path

from api.auth.google import GoogleLogin


urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    path('auth/google', GoogleLogin.as_view(), name='google_login'),
]
