from django.db import models
import re
from django.core.validators import *
from datetime import *
from django.db.models.expressions import F
from django.db.models.fields import CharField, EmailField, NullBooleanField, TextField
from django.contrib.auth.models import User
import bcrypt


class LogRegManager(models.Manager):
    '''Login and Registration validator'''

    def registration_validator(self, postData):
        '''Sign-up and Registration Validators'''
        errors = {}

        # RegEx validators
        alphabet = re.compile(r'^[a-zA-Z]*$')
        alphanumeric = re.compile(r'^[0-9a-zA-Z._@-]*$')
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$')

        
        if len(postData['first_name']) < 2:
            errors['first_name'] = 'Invalid: First Name must have at least two characters.'
        if not alphabet.search(postData['first_name']):
            errors['first_name'] = 'Invalid: Please include letters of the alphabet only.'
        if len(postData['last_name']) < 2:
            errors['last_name'] = 'Invalid: Last Name must have at least two characters.'
        if not alphabet.search(postData['last_name']):
            errors['last_name'] = 'Invalid: Please include letters of the alphabet only.'
        if not EMAIL_REGEX.match(postData['email']):
            errors['email'] = ("Invalid email address!")
        if len(postData['password']) <= 7:
            errors['password'] = 'Invalid: Password must be at least 8 characters.'
        if not alphanumeric.match(postData['password']):
            errors['password'] = 'Invalid: Password can only contain Alphanumeric values.'
        if postData['password'] != postData['confirm_password']:
            errors['password'] = 'Invalid: Passwords do not match!'

        return errors


    def log_validator(self, postData):
        ''' Login Validators '''
        errors = {}

        auth_email = LogReg.objects.filter(email=postData['email'])
        if not auth_email:
            errors['email'] = 'Invalid: Email has not been registered.'

        return errors

# class mealManager(models.Manager):
#     def meal_validator(self, postData):
#         errors = {}
#         if len(postData['meal_type']) == 0  :
#             errors['meal_type'] = 'Please select the type of meal.'
#         if len(postData['quantity']) == 0:
#             errors['quantity'] = 'Invalid: You cannot enter a quantity of 0!'
#         # if postData['pw']  != postData['cpw']:
#         #     errors['not_a_match'] = 'Invalid: Passwords does not match our records, try again!'
#         return errors


class LogReg(models.Model):
    ''' Models for Login and Registration forms '''
    first_name = models.CharField(verbose_name='First Name', max_length=32)
    last_name = models.CharField('Last Name', max_length=32)
    email = models.EmailField('Email')
    password = models.CharField('Password', max_length=256)
    confirm_password = models.CharField('Confirm Password', max_length=256)
    profile_name = models.CharField('Profile Name', max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = LogRegManager()
    # captcha_score = models.FloatField(default = 0.0)
    # has_profile = models.BooleanField(default=False)
    # # is_active = models.BooleanField(default = True)
    user = models.OneToOneField(User, on_delete = models.CASCADE, default="")

    def __str__(self):
        return f'{self.profile_name}'

class MealLog(models.Model):
    ''' Model for Meal Form. Will be used to calculate calories. '''
    meal_types=[
    ('breakfast', 'Breakfast'),
    ('brunch', 'Brunch'),
    ('snack', 'Snack'),
    ('lunch', 'Lunch'),
    ('dinner', 'Dinner'),
]
    meal_type = models.CharField('Type of Meal', choices = meal_types, default='Breakfast', max_length = 60)
    meal_name = models.CharField('Meal Name', max_length=255)
    mealId = models.CharField('Meal ID', max_length=255)
    quantity = models.IntegerField('Number of servings', db_column = 'item_quantity', default = 1)
    made_by = models.ForeignKey(LogReg, related_name='added_by', on_delete=models.CASCADE)
    date = models.DateField()
    # default=date.today
    calories = models.IntegerField('Calories', default = 0)
    meal_added = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    # objects = mealManager()

    def __str__(self):
        return f'{self.meal_name}'

class CalLog(models.Model):
    pass