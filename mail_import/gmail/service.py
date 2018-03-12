from django.utils.functional import cached_property

from allauth.socialaccount.models import SocialToken

from .client import GmailServiceClient


class GmailMessageService(object):

    def __init__(self, user):
        self.user = user

    @cached_property
    def _socialToken(self):
        try:
            return SocialToken.objects.get(
                app__provider='google',
                account__provider='google',
                account__user=self.user
            )
        except SocialToken.DoesNotExist:
            raise

    def updateNewMessageIds(sinceDate):
        """
            Update MessageMetadata with relevant message ids for that user
        """
        client = GmailServiceClient(self._socialToken)

        # Get watching companies
        # Get their email addresses
        # Build search query
        # Update MessageMetadata with ids
