from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'access': str(refresh.access_token),
        # 'refresh': str(refresh),
    }

def set_browser_cookie(response,key,value):
    response.set_signed_cookie(
                       key = key, 
                       value = value,
                       salt = settings.SIMPLE_JWT['AUTH_COOKIE_SALT'],
                       expires = 214748364,
                       secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                       httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                       samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                       ) 

def set_token_cookie(request,response,user):
    data = get_tokens_for_user(user)    
    set_browser_cookie(response,settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],data["access"])
    csrf.get_token(request)
    return True