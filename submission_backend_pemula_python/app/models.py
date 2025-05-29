from django.db import models
import uuid

class Product(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    shop = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.IntegerField()
    discount = models.IntegerField(default=0)
    category = models.CharField(max_length=255)
    stock = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    picture = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)
    sku = models.CharField(max_length=255, blank=True, null=True)