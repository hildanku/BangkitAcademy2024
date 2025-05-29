from rest_framework import serializers
from app.models import Product

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'shop',
            'location',
            'price',
            'discount',
            'category',
            'stock',
            'is_available',
            'picture'
        ]