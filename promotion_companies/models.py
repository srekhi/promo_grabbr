from django.contrib.auth.models import User
from django.db import models

from .enums import CompanyName


class UserCompany(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    companyName = models.CharField(max_length=32, choices=CompanyName.choices())
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'companyName')
