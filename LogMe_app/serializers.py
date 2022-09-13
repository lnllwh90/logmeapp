from dataclasses import fields
from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class LogRegSerializer(serializers.ModelSerializer):
  class Meta:
    model = LogReg
    fields = ['first_name', 'last_name', 'email', 'created_at', 'updated_at', 'id', 'profile_name', 'password']

    # def create(self, validated_data):
    #   user = User.objects.create(
    #     username = validated_data['email'],
    #     email = validated_data['email'],
    #     first_name = validated_data['first_name'],
    #     last_name = validated_data['last_name'],
    #   )

    #   user.set_password(validated_data['password'])
    #   user.save()

    #   return user

class MealLogSerializer(serializers.ModelSerializer):
  class Meta:
    model = MealLog
    fields = ['meal_type', 'meal_name', 'mealId', 'quantity', 'made_by', 'date', 'calories', 'meal_added', 'last_updated']
  