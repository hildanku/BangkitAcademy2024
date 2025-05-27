from rest_framework import serializers
from drf_app.models import Note


class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'body', 'tags', 'createdAt']
