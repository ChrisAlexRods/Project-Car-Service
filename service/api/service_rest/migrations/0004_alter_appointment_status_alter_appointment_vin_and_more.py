# Generated by Django 4.0.3 on 2023-01-26 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_status_options_remove_appointment_automobile_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[], default='SCHEDULED', max_length=20),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=17),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17),
        ),
        migrations.DeleteModel(
            name='Status',
        ),
    ]
