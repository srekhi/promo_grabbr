from django.utils.functional import cached_property

from apiclient import discovery
from apiclient import errors
from oauth2client import GOOGLE_TOKEN_URI
from oauth2client.client import GoogleCredentials


class GmailAPIService(object):

    def __init__(self, socialToken):
        self.socialToken = socialToken
        self.socialAccount = socialToken.account

        self._validate()

        self.service = discovery.build('gmail', 'v1', credentials=self.credentials)

    def _validate(self):
        if self.socialAccount.provider != 'google':
            raise

    @cached_property
    def credentials(self):
        return GoogleCredentials(
            access_token=self.socialToken.token,
            client_id=self.socialToken.app.client_id,
            client_secret=self.socialToken.app.secret,
            refresh_token=self.socialToken.token_secret,
            token_expiry=self.socialToken.expires_at,
            token_uri=GOOGLE_TOKEN_URI,
            user_agent='promo-grabber-agent/1.0',
        )

    def getMessages(self, startDate, senders):
        fromTerms = map(lambda sender: '{}:{}'.format('from', sender), senders)
        searchQuery = self._query_or(fromTerms)

        if startDate:
            dateTerm = 'newer:{}'.format(startDate.strftime('%Y/%m/%d'))
            searchQuery = self._query_and([dateTerm, searchQuery])

        messages = []

        try:
            response = self.service.users().messages().list(
                userId='me',
                q=searchQuery,
            ).execute()

            if 'messages' in response:
                messages.extend(response['messages'])

            while 'nextPageToken' in response:
                pageToken = response['nextPageToken']
                response = service.users().messages().list(
                    userId='me',
                    q=searchQuery,
                    pageToken=pageToken
                ).execute()
                messages.extend(response['messages'])
        except errors.Error:
            raise

        return messages

    @classmethod
    def _query_term(cls, searchType, value):
        return '{}:{}'.format(searchType, value)

    @classmethod
    def _query_or(cls, searchTerms):
        return '( {} )'.format(' OR '.join(searchTerms))

    @classmethod
    def _query_and(cls, searchTerms):
        return '( {} )'.format(' '.join(searchTerms))
