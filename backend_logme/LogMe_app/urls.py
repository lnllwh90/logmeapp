from django.urls import path     
from .views import *

app_name = "LogMe_app"

urlpatterns = [
    # path('logMe/', index, name = 'my_index'),
    # path('register/', sign_up, name = 'sign_up'),
    path('register/create_user/', SignupView.as_view(), name = 'create_user'),
    # path('welcome/', success, name = 'success'),
    path('login/', LoginView.as_view(), name = 'login'),
    path('logout/', LogoutView.as_view(), name = 'logout'),
    # path('workouts/', workout_cal, name = 'workout_cal'),
    # path('meals/', meal_log, name = 'meal_log'),
    path('search/', meal_search, name='search'),
    path('user/',GetUserProfileView.as_view()),
    # path('goals/', goals, name = 'goals'),
    path('authenicated/', CheckAuthenticatedView.as_view()),
    path('delete/', DeleteAccountView.as_view(), name='delete'),
    path('csrf_cookie/', GetCSRFToken.as_view(), name = 'CSRF_Token'),
    path('update/', UpdateUserProfileView.as_view()),
]