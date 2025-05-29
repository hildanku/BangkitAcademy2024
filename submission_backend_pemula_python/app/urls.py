from django.urls import path
from app import views
 
urlpatterns = [
  path('products/',views.ProductList.as_view(), name='product-list'),
  path('products/<uuid:pk>/', views.ProductDetail.as_view(), name='product-detail'),
]