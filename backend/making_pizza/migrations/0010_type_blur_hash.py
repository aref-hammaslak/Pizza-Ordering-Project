# Generated by Django 5.0.3 on 2024-03-20 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('making_pizza', '0009_pizza_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='type',
            name='blur_hash',
            field=models.CharField(default='eJM=,*tm7%owTK~W%$t8xuMx5tWA%LIUnNt7WARjs*n#NeRPnOIUM{', max_length=200),
            preserve_default=False,
        ),
    ]
