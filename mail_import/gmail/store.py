import pytz

from oauth2client import GOOGLE_TOKEN_URI
from oauth2client.client import GoogleCredentials
from oauth2client.client import Storage


class GoogleCredentialStorage(Storage):
    def __init__(self, socialToken, **kwargs):
        super(GoogleCredentialStorage, self).__init__(**kwargs)

        self.socialToken = socialToken

    def locked_get(self):
        """
        Make an credentials object from the SocialToken

        Returns:
        oauth2client.OAuth2Credentials
        """

        credentials = GoogleCredentials(
            access_token=self.socialToken.token,
            client_id=self.socialToken.app.client_id,
            client_secret=self.socialToken.app.secret,
            refresh_token=self.socialToken.token_secret,
            token_expiry=self.socialToken.expires_at.replace(tzinfo=None),
            token_uri=GOOGLE_TOKEN_URI,
            user_agent='promo-grabber-agent/1.0',
        )
        credentials.set_store(self)

        return credentials

    def locked_put(self, credentials):
        """
        Update the SocialToken from the credentials
        """

        self.socialToken.token = credentials.access_token
        self.socialToken.expires_at = pytz.utc.localize(credentials.token_expiry)
        self.socialToken.save()
