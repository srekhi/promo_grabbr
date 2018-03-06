from django.contrib.auth import get_user_model

from rest_auth.serializers import UserDetailsSerializer

# Get the UserModel
UserModel = get_user_model()


class PGUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'first_name', 'last_name')
        read_only_fields = ('email',)
