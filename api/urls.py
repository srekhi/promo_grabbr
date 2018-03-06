from django.urls import include
from django.urls import path

from api.auth.google import GoogleLogin
from api.company.view import UserCompaniesView
from rest_auth.views import UserDetailsView

urlpatterns = [
    path('auth/google', GoogleLogin.as_view(), name='google_login'),
    path('user', UserDetailsView.as_view(), name='user_details'),
    path('user_companies', UserCompaniesView.as_view(), name='user_companies'),
]
