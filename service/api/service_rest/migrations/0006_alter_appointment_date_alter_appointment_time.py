# Generated by Django 4.0.3 on 2023-01-26 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_alter_appointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='time',
            field=models.TimeField(),
        ),
    ]