import profile
from re import L, M
# from urllib import response
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets, permissions, status
from django.http.response import HttpResponse
from django.shortcuts import redirect, render, reverse,HttpResponseRedirect
from django.contrib import messages, auth
from .models import *
from .forms import *
import bcrypt, json, requests
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.conf import settings
from django.http import JsonResponse
from django.utils.http import urlencode
from urllib.parse import urlparse, quote, unquote
import random
import string
import secrets
from django.db.models import Q
import requests
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password, make_password

# Create your views here.

class CheckAuthenticatedView(APIView):
    ''' Checks if the user is authenticated'''
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:

            return Response({ 'error': 'Something went wrong when checking authentication status'})

@method_decorator(ensure_csrf_cookie, name = 'dispatch')
class GetCSRFToken(APIView):
    ''' Assigns a CSRF token for the session'''
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):

        return Response({'success': 'CSRF cookie set'})

@method_decorator(csrf_protect, name = 'dispatch')
class SignupView(APIView):

    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format = None):

        ''' Create a new user and adds the user to the Database. Upon success the user is then redirected to the LogMe app home page. '''

        data = self.request.data

        auth_password = data['password']
        auth_cpw = data['confirm_password']

        errors = LogReg.objects.registration_validator(data)

        check_emailDB = LogReg.objects.filter(email=data['email'])
        print('checked_emailDB')
        check_emailAPI = User.objects.filter(username = data['email'])
        print('checked_emailAPI')
        profileName_check = LogReg.objects.filter(profile_name = data['profile_name'])
        print('profileNameChecked')
        try:

            if check_emailDB or check_emailAPI:

                return Response({'error': 'Email/Username already exists, please try again'})

            elif len(errors) > 0:

                for key, value in errors.items():

                    return Response({'error': {'key': key, 'description': value}})   
            else: 
                if auth_password == auth_cpw:

                    if profileName_check:

                        return Response({'error': 'Profile Name already exists. Please try again!'})
                    else:
                        serializer = LogRegSerializer(data = data)

                        # must call .is_valid to interact with the serializer

                        if serializer.is_valid(raise_exception=True):

                            clean_data = serializer.data

                            email = clean_data['email']

                            password = clean_data['password']

                            hashed_pw =  make_password(password)

                            first_name = clean_data['first_name'] 

                            last_name = clean_data['last_name']

                            profile_name = clean_data['profile_name']

                            # You don't need to add variable.save() as the model.objects.create_user() function will save the instance for you.

                            user = User.objects.create_user(
                                username = email,
                                email = email, 
                                first_name = first_name, 
                                last_name = last_name,
                                password = hashed_pw
                            )

                            userId = User.objects.get(id = user.id)

                            LogReg.objects.create(
                                email = email, 
                                password = hashed_pw, 
                                first_name = first_name, 
                                last_name = last_name,
                                profile_name = profile_name,
                                user = userId
                            )
                            #assigns the user to the session

                            userSession = auth.authenticate(request, username = email, password = hashed_pw)

                            #Check's if the user is authenticated
                            isAuthenticated = userSession.is_authenticated
                            if isAuthenticated:

                                #If the user is authenticated, log the user into the app. Assigns a session id on the backend.
                                auth.login(request, userSession)

                            return Response(
                                { 
                                    'success': 'User created successfully' 
                                }, 
                                status=status.HTTP_201_CREATED
                            )

                else:

                    return Response(
                        { 
                            'error': 'Passwords do not match' 
                        }, 
                        status=status.HTTP_400_BAD_REQUEST)

        except:

            return Response(
                {
                    'error': 'Something went wrong when registering account. Please Try again.'
                },
                status=status.HTTP_400_BAD_REQUEST)


class GetUserProfileView(APIView):
    def get(self, request, format=None):
        ''' Retrieves the Users profile_name and id from the database to persists the users session and populate the jsx files powered by React.js'''

        data = self.request.data

        userProfile_email = data.get('email')
        userProfile_profileName = data.get('profile_name')
        try:
            if userProfile_profileName and userProfile_email:
                #This will check that if a profile_name and email was entered in the request that both are for the same user.
                user_profile = LogReg.objects.get(Q(profile_name = userProfile_profileName) & Q(email=userProfile_email) )
                #check the DB for the profile_name, if only the profile_name is in the request
            elif userProfile_profileName:
                user_profile = LogReg.objects.get(profile_name = userProfile_profileName)
                #check the DB for the email, if only the email is in the request
            elif userProfile_email:
                user_profile = LogReg.objects.get( email = userProfile_email )
            else:
                return Response({'error': 'User credentials do not exists.'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({ 'profile_name': user_profile.profile_name, 'id': user_profile.id }, status=status.HTTP_200_OK )
        except LogReg.DoesNotExist:
            if userProfile_profileName and userProfile_email:
                return Response({ 'error': f'User Credentials with email: {userProfile_email} and profile_name: {userProfile_profileName} do not exists.'}, status=status.HTTP_404_NOT_FOUND)
            elif userProfile_profileName:
                return Response({ 'error': f'The profile name: {userProfile_profileName} does not exists.'}, status=status.HTTP_404_NOT_FOUND)
            elif userProfile_email:
                return Response({ 'error': f'The email: {userProfile_email} does not exists.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({ 'error': 'Something went wrong. Please try re-entering your user credentials. If the issue persist, please reach out to customer support!'}, status=status.HTTP_404_NOT_FOUND)

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        ''' Login page for existing users'''

        data = self.request.data


        email = data['email']
        password= data['password']

        errors = LogReg.objects.log_validator(data)

        try:
            #Checks the Model validator for errors
            if len(errors) > 0:
                for key,value in errors.items():
                    messages.error(request,value)
                    return Response(
                        {
                            'error': {
                                'key' : key, 
                                'description': value
                            }
                        }
                    )
            else:
                #Get the user's email from the Database
                user_authentication = LogReg.objects.get(email = email)

                #checks if the user's email address exists in the Database
                if user_authentication is not None:

                    password_authentication = check_password(password, user_authentication.password)
                    #Check's if the password entered matches the password stored in the Database
                    if password_authentication:

                        valid_password = user_authentication.password

                        #If the login credentials are valid, check for authentication
                        user = auth.authenticate(username = email, password = valid_password)


                        #Check's if the user is authenticated
                        if user is not None:
                            isAuthenticated = user.is_authenticated
                            if isAuthenticated:

                                #If the user is authenticated, log the user into the app. Assigns a session id on the backend.
                                auth.login(request, user)

                                return Response({ 
                                    'success':'User Authenticated Successfully!' 
                                    }
                                )
                        else:
                            return Response({ 'error': 'Error Authenticating. Try Again' })
                    else:
                        return Response({'error': 'Password does not match our records. Try Again'})
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

# Will require a CSRF token
class UpdateUserProfileView(APIView):
    '''update user credentials'''
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            profile_name = data['profile_name']

            LogReg.objects.filter(user=user).update(first_name=first_name, last_name = last_name, profile_name = profile_name)

            user_profile = LogReg.objects.get(user=user)
            user_profile = LogRegSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username) })
        except:
            return Response({'error': 'Something went wrong updating profile'})


def meal_search(request):
    ''' Make a request to access the Food API'''
    # if request.is_ajax():
    #variable that accepts user input to begin fetching results from the API
    search_form = SearchForm(request.GET)
    if search_form.is_valid() :
    #     search_form = SearchForm(request.GET.get('search_term', ""))
    # if search_form.is_valid():
    #     search_form.save()

    #     res = None
        #Sanitize user input, accounts for character encoding (Spacing, special characters)
        encoded_search_term = search_form.cleaned_data['search_term']
        # response = request.GET.get(f'https://api.edamam.com/api/food-database/v2/parser?app_id={settings.FOOD_API}&app_key={settings.FOOD_API_SECRET}&ingr={encoded_search_term}')
        # items = response.json()
        # print(items)
        # return(encoded_search_term)
        
        # Food API URL
        edamam_api_url1 = 'https://api.edamam.com/api/food-database/v2/parser'
        
        # Query string params (app_id and app_key passed from settings file)
        params = {
            'app_id' : settings.FOOD_API,
            'app_key': settings.FOOD_API_SECRET,
            'ingr': encoded_search_term,
            'nutrition-type': 'cooking',
            'category': 'packaged-foods',
        }
        # concatenates the Food API URL and QS params to begin search
        response = requests.get(edamam_api_url1, params=params)
        # returns results in json format
        items = response.json()
        # parses results from the 'hints' key
        items2 = items['hints']
        mealNames = []
        mealIds = []

        #debugging
        #parses the Json Response 
        for name in items2:
            meal_name = name['food']['label']
            meal_id = name['food']['foodId']
            mealIds.append(meal_name)
            mealNames.append(meal_id)

        #prints the food labels and food id to terminal
        print(mealNames)
        print(mealIds)

        #returns the Json response upon success
        return JsonResponse(items)
    
    #if results from JSON response returns in error, print an error
    return JsonResponse({'error': 'Not able to validate search'})

# def foodApi(request, item):
#     response=requests.get('https://api.edamam.com/auto-complete',
#     params = {'q': 'item'})
#     pass

def goals(request):
    return render(request, 'view_goals.html')

class LogoutView(APIView):
    def post(self, request, format=None):
        ''' Clears the session from cache and redirects back to the home page'''

        #Clears the session and redirects to the Login page
        # request.session.clear()
        # return redirect('/')

        try:
            auth.logout(request)
            return Response({ 'success': 'User Logged Out of application successfully'})
        except:
            return Response({ 'error': 'Something went wrong when logging out' })

class DeleteAccountView(APIView):
    '''deletes the user from the database'''
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({ 'success': 'Account deleted Successfully'})
        
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user'})