from functools import reduce

from django.utils.functional import cached_property

from allauth.socialaccount.models import SocialToken
from mail_import.enums import EmailProvider
from mail_import.models import MessageMetadata
from promotion_companies.constants.emails import COMPANY_EMAILS
from promotion_companies.models import UserCompany

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

    def updateNewMessageIds(self, sinceDate):
        """
            Update MessageMetadata with relevant message ids for that user
        """
        client = GmailServiceClient(self._socialToken)

        userCompanies = list(UserCompany.objects.filter(
            user=self.user,
            active=True
        ).values_list('companyName', flat=True))
        emailAddressMap = map(lambda company: COMPANY_EMAILS.get(company, []), userCompanies)
        emailAddresses = reduce(lambda x, y: x.extend(y), emailAddressMap)

        # Build search query
        fromTerms = map(lambda sender: '{}:{}'.format('from', sender), emailAddresses)
        searchQuery = GmailServiceClient.query_or(fromTerms)

        dateTerm = 'newer:{}'.format(sinceDate.strftime('%Y/%m/%d'))
        searchQuery = GmailServiceClient.query_and([dateTerm, searchQuery])

        # Update MessageMetadata with new message ids
        messageIds = client.getMessageIds(searchQuery)

        existingMessageIds = set(MessageMetadata.objects.filter(
            user=self.user,
            email_provider=EmailProvider.GMAIL,
            message_id__in=messageIds
        ).values_list('message_id', flat=True))
        newMessageMetas = MessageMetadata.objects.bulk_create([
            MessageMetadata(
                user=self.user,
                email_provider=EmailProvider.GMAIL,
                message_id=messageId
            ) for messageId in messageIds.difference(existingMessageIds)
        ])

        return newMessageMetas
