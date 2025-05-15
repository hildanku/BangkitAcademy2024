# MAKE ROUTING
# MAKE NEW FILE URLS.PY
# AND THEN ADD IN url.py

from django.urls import path
 
from . import views
 
urlpatterns = [
    path("movies", views.movies),
    path("movies/<int:id>", views.detail_movie),
]
