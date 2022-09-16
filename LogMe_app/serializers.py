from dataclasses import fields
from .models import *
from rest_framework import serializers

class LogRegSerializer(serializers.ModelSerializer):
  class Meta:
    model = LogReg
    fields = ['first_name', 'last_name', 'email', 'created_at', 'updated_at', 'id', 'profile_name', 'password']

    def create(self, validated_data):
    
      return LogReg.objects.create(**validated_data)

class MealLogSerializer(serializers.ModelSerializer):
  class Meta:
    model = MealLog
    fields = ['meal_type', 'meal_name', 'mealId', 'quantity', 'made_by', 'date', 'calories', 'meal_added', 'last_updated']
  