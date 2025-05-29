from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from app.serializers import ProductSerializer
from app.models import Product

class ProductList(APIView):
    def post(self, request):
        product = ProductSerializer(data=request.data, context={'request': request})
        if product.is_valid():
            product.save()
            return Response(product.data, status=status.HTTP_201_CREATED)
        return Response(product.errors, status=status.HTTP_400_BAD_REQUEST)