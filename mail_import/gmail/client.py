from django.utils.functional import cached_property

from apiclient import discovery
from apiclient import errors
from oauth2client import GOOGLE_TOKEN_URI

from .store import GoogleCredentialStorage


class GmailServiceClient(object):
    BATCH_SIZE = 1000

    def __init__(self, socialToken):
        self.socialToken = socialToken
        self.socialAccount = socialToken.account

        self._validate()

        self.service = discovery.build('gmail', 'v1', credentials=self.credentials)

    def _validate(self):
        # TODO (bill-x): Better validations
        if self.socialAccount.provider != 'google':
            raise

    @cached_property
    def credentials(self):
        return GoogleCredentialStorage(self.socialToken).get()

    def getMessageIds(self, searchQuery):
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
                response = self.service.users().messages().list(
                    userId='me',
                    q=searchQuery,
                    pageToken=pageToken
                ).execute()
                messages.extend(response['messages'])
        except errors.Error:
            # TODO (bill-x): Custom exceptions
            raise

        return {message['id'] for message in messages}

    def getMessages(self, messageIds, callbackSuccess, callbackFail=None):
        """
        Batches the request to get messages by ID.

        Args:
            messageIds: List of message ids
            callbackSuccess: Function that will be called for each successful response
            callbackFail: Function that will be called for each error response
        """

        def _callback(request_id, response, exception):
            if exception is not None:
                return callbackFail and callbackFail(messageId, exception)

            callbackSuccess(response)

        for i in range(0, len(messageIds), self.BATCH_SIZE):
            batch = self.service.new_batch_http_request(callback=_callback)

            for messageId in messageIds[i:i+self.BATCH_SIZE]:
                request = self.service.users().messages().get(
                    userId='me',
                    id=messageId
                )
                batch.add(request, request_id=messageId)

            batch.execute()

    @classmethod
    def query_term(cls, searchType, value):
        return '{}:{}'.format(searchType, value)

    @classmethod
    def query_or(cls, searchTerms):
        return '( {} )'.format(' OR '.join(searchTerms))

    @classmethod
    def query_and(cls, searchTerms):
        return '( {} )'.format(' '.join(searchTerms))
