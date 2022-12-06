from django.db import models

class Category(models.Model):
    title = models.CharField(max_length= 255)

class Post(models.Model):
    title = models.ForeignKey(Category, on_delete=models.CASCADE) # One to many
    content = models.TextField()
