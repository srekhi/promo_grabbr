from django.conf import settings

from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from requests.exceptions import HTTPError
from rest_auth.registration.serializers import SocialLoginSerializer
from rest_auth.registration.views import SocialLoginView
from rest_framework import serializers


class GoogleLoginSerializer(SocialLoginSerializer):
    code = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        view = self.context.get('view')
        if not view:
            raise serializers.ValidationError(
                _("View is not defined, pass it as a context variable")
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(
                _("Define adapter_class in view")
            )

        self.callback_url = getattr(view, 'callback_url', None)
        if not self.callback_url:
            raise serializers.ValidationError(
                _("Define callback_url in view")
            )

        self.client_class = getattr(view, 'client_class', None)
        if not self.client_class:
            raise serializers.ValidationError(
                _("Define client_class in view")
            )

        request = self._get_request()

        adapter = adapter_class(request)
        app = adapter.get_provider().get_app(request)

        provider = adapter.get_provider()
        scope = provider.get_scope(request)
        client = self.client_class(
            request,
            app.client_id,
            app.secret,
            adapter.access_token_method,
            adapter.access_token_url,
            self.callback_url,
            scope
        )
        token = client.get_access_token(attrs.get('code'))

        social_token = adapter.parse_token(token)
        social_token.app = app

        try:
            login = self.get_social_login(adapter, app, social_token, token['access_token'])
            complete_social_login(request, login)
        except HTTPError:
            raise serializers.ValidationError(_("Incorrect value"))

        if not login.is_existing:
            login.lookup()
            login.save(request, connect=True)

        attrs['user'] = login.account.user

        return attrs


class GoogleLogin(SocialLoginView):
    authentication_classes = ()
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.GOOGLE_CALLBACK_URL
    serializer_class = GoogleLoginSerializer
