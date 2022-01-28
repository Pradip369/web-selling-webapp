from pathlib import Path
import os

from dotenv import load_dotenv    # .env var Get and set...
load_dotenv()  # take environment variables from .env.

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG")
ALLOWED_HOSTS = (os.getenv("ALLOWED_HOSTS")).split(',')

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'sellingapp',
    'corsheaders',
    # 'storages'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    # Core Headers
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'webselling.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'build')],
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

WSGI_APPLICATION = 'webselling.wsgi.application'


# Database

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("NAME"),
        'USER': os.getenv("USER"),
        'PASSWORD': os.getenv("PASSWORD"),
        'HOST': os.getenv("HOST"),
        'PORT': '5432'
    }
}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    # {
    #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    # },
]


# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# ======================================= Rest Framework Settings ====================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'webselling.authenticate.CustomAuthentication',
    ),
    'DATETIME_FORMAT': "%b %d, %Y at %X",
    'DEFAULT_METADATA_CLASS': None,   # Option request is not permitted
}

# ======================================== Simple JWT Token ===========================
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=2),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('JWT',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(days=2),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=2),

    # ============ My custom ==============
    'AUTH_COOKIE_ACCESS': 'access_token',
    'AUTH_COOKIE_DOMAIN': None,
    'AUTH_COOKIE_SECURE': False,
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_PATH': '/',
    'AUTH_COOKIE_SAMESITE': 'Lax',
    'AUTH_COOKIE_SALT' : os.getenv("AUTH_COOKIE_SALT")
}

if DEBUG:
    # ====================================== Media File Settings =========================
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

    # ===================================== Static File Settings ==============================
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# AWS_LOCATION = 'static'

# AWS_ACCESS_KEY_ID = (os.getenv("AWS_ACCESS_KEY_ID"))
# AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
# AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")

# AWS_S3_CUSTOM_DOMAIN='%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
# AWS_S3_OBJECT_PARAMETERS = {    
#     'CacheControl': 'max-age=86400',
# }
# DEFAULT_FILE_STORAGE = 'webselling.storage_backends.MediaStorage'
# STATICFILES_STORAGE = "webselling.storage_backends.StaticStorage"
# STATIC_URL='https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
# ADMIN_MEDIA_PREFIX = STATIC_URL + 'admin/'
# STATICFILES_FINDERS = ('django.contrib.staticfiles.finders.FileSystemFinder',
# 'django.contrib.staticfiles.finders.AppDirectoriesFinder',)
# AWS_DEFAULT_ACL = None

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build','static'),
]

# ===================================== corsheader settings ==================================
CORS_ALLOW_ALL_ORIGINS = True


CORS_ALLOW_CREDENTIALS = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'