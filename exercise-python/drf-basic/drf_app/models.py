from django.db import models
import uuid
# Create your models here.


class Note(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    title = models.CharField(max_length=200)
    body = models.TextField()
    tags = models.JSONField()
    createdAt = models.DateTimeField(auto_now_add=True)
