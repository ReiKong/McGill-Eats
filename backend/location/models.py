from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=30, unique=True)
    distance = models.CharField(max_length=30, blank=True, null=True)
    duration = models.CharField(max_length=30, blank=True, null=True)
    #latitude = models.DecimalField()
    #longitude = models.DecimalField()
    #location = models.CharField(max_length=, default="", unique=True)

# check if the object already exists and prepopulate objects
names = ["Bio Cafe", "Booster Juice", "Dispatch Cafe", "Law Cafe", "Engineering Cafe", "Med Cafe", 
         "Redpath Cafe", "Trottier Cafe", "Med Cafe", "Soupe Cafe", "Opiano", "Super Sandwich",
         "Shawarmaz", "Nouilles Zhonghua-Chinese Noodles", "Japote", "Chef on Call", "Joes Panini 24h",
         "Preso Tea", "Shuyi Tealicious"]
for name in names:
    if not Restaurant.objects.filter(name=name).exists():
        Restaurant.objects.create(name=name)