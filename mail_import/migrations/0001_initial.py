# Generated by Django 2.0.1 on 2018-03-04 23:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mail_import.enums


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MessageMetadata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_id', models.CharField(max_length=32, unique=True)),
                ('email_provider', models.CharField(choices=[('GMAIL', 'gmail')], default=mail_import.enums.EmailProvider('gmail'), max_length=32)),
                ('date_sent', models.DateField()),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='messageMetadatas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddIndex(
            model_name='messagemetadata',
            index=models.Index(fields=['message_id', 'email_provider'], name='mail_import_message_61ebce_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='messagemetadata',
            unique_together={('message_id', 'email_provider')},
        ),
    ]
