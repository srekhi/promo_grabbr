from django.contrib.auth.models import User
from django.db import models

from .enums import EmailProvider


class MessageMetadata(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='messageMetadatas')
    message_id = models.CharField(max_length=32, unique=True)
    email_provider = models.CharField(max_length=32, choices=EmailProvider.choices(), default=EmailProvider.GMAIL)
    date_sent = models.DateField(null=True)

    class Meta:
        indexes = [
            models.Index(fields=['message_id', 'email_provider']),
        ]
        unique_together = ('message_id', 'email_provider')
