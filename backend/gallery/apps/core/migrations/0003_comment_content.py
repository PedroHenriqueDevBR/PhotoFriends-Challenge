# Generated by Django 3.2.7 on 2021-09-19 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_book_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='content',
            field=models.CharField(default='', max_length=2500),
            preserve_default=False,
        ),
    ]
