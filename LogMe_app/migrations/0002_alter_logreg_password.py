# Generated by Django 4.0.6 on 2022-08-10 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LogMe_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logreg',
            name='password',
            field=models.CharField(max_length=256, verbose_name='Password'),
        ),
    ]
