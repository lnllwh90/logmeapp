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
import requests
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.views import APIView


# Create your views here.

class CheckAuthenticatedView(APIView):
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
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):

        return Response({'success': 'CSRF cookie set'})

@method_decorator(csrf_protect, name = 'dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format = None):
        ''' Create a new user and adds the user to the DB. Upon success the user is then redirected to the LogMe app home page. '''

        data = self.request.data
        
        auth_password = data['password']
        auth_cpw = data['confirm_password']

        errors = LogReg.objects.registration_validator(data)
        
        check_emailDB = LogReg.objects.filter (email=data['email'])
        check_emailAPI = User.objects.filter(username = data['email'])

        profileName_check = LogReg.objects.filter(profile_name = data['profile_name'])

        if check_emailDB or check_emailAPI:
            return Response({'error': 'Email/Username already exists, please try again'})

        elif profileName_check:
            return Response({'error': 'Profile Name already exists. Please try again!'})

        elif len(errors) > 0:
            for key, value in errors.items():
                return Response({'error': {'key': key, 'description': value}})    
        else:
            try: 
                if auth_password == auth_cpw:

                    hashed_pw = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt()).decode()

                    serializer = LogRegSerializer(data = data)
                    #must call .is_valid to interact with the serializer

                    if serializer.is_valid(raise_exception=True):
                        
                        clean_data = serializer.validated_data

                        hashed_pw = bcrypt.hashpw(clean_data['password'].encode(), bcrypt.gensalt()).decode()

                        print(clean_data)
                        # print(hashed_pw)
                        
                        user = User.objects.create_user(
                            username = clean_data['email'], 
                            password = hashed_pw, 
                            first_name = clean_data['first_name'], 
                            last_name = clean_data['last_name'],
                            email = clean_data['email']
                        )

                        user.save()
                        
                        userDB = LogReg.objects.create_user(
                            user=user,
                            email = clean_data['email'], 
                            password = hashed_pw, 
                            first_name = clean_data['first_name'], 
                            last_name = clean_data['last_name'],
                            profile_name = clean_data['profile_name']
                        )

                        userDB.save()

                        print('hi')
                        #Will need to save serializer last, won't save to RESTApi
                        # serializer.save()

                        user = User.objects.get(id=user.id)

                        return Response({ 'success': 'User created successfully' 
                        }, 
                        status=status.HTTP_201_CREATED)

                else:
                    return Response({ 
                        'error': 'Passwords do not match' 
                        }, 
                        status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({ 
                    'error': 'Something went wrong when registering account. Please Try again.' 
                }, 
                status=status.HTTP_400_BAD_REQUEST)
            
            return Response({ 
                'error': 'Something went wrong when registering account. If this issue persist please contact system Admin for assistance' 
                }, status=status.HTTP_400_BAD_REQUEST)

                        # clean_data = serializer.data
                        # password = clean_data['password']
                        # confirm_password = data['confirm_password']
                        # email = clean_data['email']
                        # profile_name = clean_data['profile_name']

            # check_email = LogReg.objects.filter (email=email)
            

            # if check_email:
            #     return Response({
            #     'error': str(errors)})
        # return Response({ 'error': 'Username already exists' })
        # return Response({ 'error' : 'Profile Name already exists' })

            # if len(password) < 8 :
            #     return Response({ 'error': 'Password must be at least 8 characters long. Try Again.' })
            # else: 
            #     try:
                    #Look into protecting the password and confirm password before hashing
        #             if password == confirm_password:
        #                 # hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        #                 if LogReg.objects.filter (email=email).exists():
        #                     return Response({ 'error': 'Username already exists' })
        #                 elif LogReg.objects.filter(profile_name = profile_name).exists():
        #                     return Response({ 'error' : 'Profile Name already exists' })
        #                 else:
        #                     serializer.save()
        #                     # user = User.objects.create_user(
        #                     #     username = email, 
        #                     #     password = hashed_pw, 
        #                     #     first_name = first_name, 
        #                     #     last_name = last_name, 
        #                     #     email=email,
        #                     #     profile_name = profile_name
        #                     # )

        #                     # user.save()

        #                     # user = User.objects.get(id=user.id)
                            
                            

        #                     # user_profile = LogReg.objects.create(
        #                     #     user=user,
        #                     #     first_name = first_name,
        #                     #     last_name = last_name,
        #                     #     email = email,
        #                     #     profile_name = profile_name,
        #                     #     pw = hashed_pw
        #                     # )

        #                         # request.session['log_user_id'] = user_profile.id
        #                     # user_profile.save()

        #                     return Response({  'success': 'User created successfully' })
        #             else:
        #                 return Response({ 'error': 'Passwords do not match' })
        #         except:
        #             return Response({ 'error': 'Something went wrong when registering account' })
                
        #     # return Response({ 'error': 'Something went wrong when registering account' })



        # # password = data['password']
        # # print(password)
        # # hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        # # print(hashed_pw)
        # # if serializer.is_valid(raise_exception=True):
        # #     serializer.save()
        #     # clean_data = serializer.data
        #     # user = User.objects.create_user(
        #     #     username = clean_data['email'], 
        #     #     password = clean_data['password'], 
        #     #     first_name = clean_data['first_name'], 
        #     #     last_name = clean_data['last_name']
        #     # )

        #     # user = User.objects.get(id=user.id)
        #     # print(clean_data['email'])
        #     # print(clean_data['first_name'])
        # #     return Response({  'success': 'User created successfully' }) 
        # # return Response(serializer.errors)

        # # username = data['username']
        # # password = data['password']
        # # re_password = data['re_password']
        # # first_name = data['first_name']
        # # last_name = data['last_name']
        # # email = username
        # # profile_name = data['profile_name']
        
        # # print(data)
        # # print(email)

        # # if len(password) < 8 :
        # #     return Response({ 'error': 'Password must be at least 8 characters long. Try Again.' })
        # # else: 
        # #     try:
        # #         if password == re_password:
        # #             if User.objects.filter (username=username).exists():
        # #                 return Response({ 'error': 'Username already exists' })
        # #             elif LogReg.objects.filter(profile_name = data['profile_name']).exists():
        # #                 return Response({ 'error' : 'Profile Name already exists' })
        # #             else:
        # #                 user = User.objects.create_user(
        # #                     username = username, 
        # #                     password = password, 
        # #                     first_name = first_name, 
        # #                     last_name = last_name, 
        # #                     email=email,
        # #                     profile_name = profile_name
        # #                 )

        # #                 user.save()

        # #                 user = User.objects.get(id=user.id)
                        
        # #                 hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        # #                 user_profile = LogReg.objects.create(
        # #                     user=user,
        # #                     first_name = first_name,
        # #                     last_name = last_name,
        # #                     email = email,
        # #                     profile_name = data['profile_name'],
        # #                     pw = hashed_pw
        # #                 )

        # #                     # request.session['log_user_id'] = user_profile.id
        # #                 user_profile.save()

        # #                 return Response({  'success': 'User created successfully' })
        # #         else:
        # #             return Response({ 'error': 'Passwords do not match' })
        # #     except:
        # #         return Response({ 'error': 'Something went wrong when registering account' })


class GetUserProfileView(APIView):
    def get(self, request, format=None):
        # print(self.request.user)
        user = self.request.user
        print(user)
        try:
            user_profile = LogReg.objects.get(email=user)
            user_profile = LogRegSerializer(user_profile)
            # print(user_profile)
            return Response({ 'profile': user_profile.data, 'username': str(user) })
        except:
            return Response({ 'error': 'Something went wrong when retrieving profile'})

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        ''' Login page for existing users'''
        data = self.request.data

        print(data)



        email = data['email']
        password = data['password']
        print(email, password)

        try:
            user = auth.authenticate(username = email, password = password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success':'User Authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

# Will require a CSRF token
class UpdateUserProfileView(APIView):
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
        ''' Log out '''

        #Clears the session and redirects to the Login page
        # request.session.clear()
        # return redirect('/')

        try:
            auth.logout(request)
            return Response({ 'success': 'User Logged Out of application successfully'})
        except:
            return Response({ 'error': 'Something went wrong when logging out' })

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({ 'success': 'Account deleted Successfully'})
        
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user'})