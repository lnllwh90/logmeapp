"""
Django settings for self_proj project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# path to your React Templates.
REACT_TEMPLATE_DIR = os.path.join(BASE_DIR, 'LogMe_app/build')


# path to your base template.
# BASE_TEMPLATE = os.path.join(BASE_DIR, 'front-end/assets')

# path to your templates.
# TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
import os
from . import secrets

SECRET_KEY = secrets.SECRET_KEY

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'LogMe_app',
    'rest_framework.authtoken',
    'crispy_forms',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'tempus_dominus',
    'django.contrib.staticfiles',
    'widget_tweaks',
    'webpack_loader',
    'corsheaders',
    'rest_framework',
    'CollectTemplate',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
    'http://localhost:3000',
)

ROOT_URLCONF = 'self_proj.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            REACT_TEMPLATE_DIR
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'self_proj.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    # }
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "nbzuaiaa",
        "USER": 'nbzuaiaa',
        "PASSWORD": secrets.POSTGRES_PASSWORD,
        "HOST": "jelani.db.elephantsql.com",
        "PORT": "5432",
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#Date Picker attributes:
TEMPUS_DOMINUS_LOCALIZE = True
TEMPUS_DOMINUS_INCLUDE_ASSETS = True
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

# Static folder to house all CSS, image resources and JavaScript
STATIC_URL = '/static/'

#accessing API keys from secrets file
WORKOUT_API_KEY = secrets.WORKOUT_API_KEY
RECAPTCHA_SITE_KEY = secrets.RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY = secrets.RECAPTCHA_SECRET_KEY
GOOGLE_API = secrets.GOOGLE_API
FOOD_API = secrets.FOOD_API
FOOD_API_SECRET = secrets.FOOD_API_SECRET

#The STATIC_ROOT variable in settings.py defines the single folder you want to collect all your static files into. Typically, this would be a top-level folder inside your project
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

#This setting defines the additional locations the staticfiles app will traverse if the FileSystemFinder finder is enabled,
#This should be set to a list of strings that contain full paths to your additional files directory(ies)

# DJANGO_STATICS = os.path.join(BASE_DIR, 'LogMe_app/static')

# WEBPACK_STATICS = os.path.join(BASE_DIR, 'front-end/assets')

# REACT_STATICS = os.path.join(BASE_DIR, 'frontend/src')

# print(DJANGO_STATICS, WEBPACK_STATICS)


STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'LogMe_app/build/static'),
    os.path.join(BASE_DIR, 'LogMe_app/static')
]

WEBPACK_LOADER = {
  'DEFAULT': {
    'CACHE': DEBUG,
    'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    'POLL_INTERVAL': 0.1,
    'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
  }
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticated',],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}

#Default primary-key field type, Django add this automatically so it isn't needed. For this project i'll use Big Auto v. Auto. Big Auto BigAutoField is a 64-bit integer, much like an AutoField except that it is guaranteed to fit numbers from 1 to 9223372036854775807

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LOGIN_URL = "app:login"
LOGIN_REDIRECT_URL = "app:success"
LOGOUT_REDIRECT_URL = "app:logout"

BASE_COUNTRY = "US"