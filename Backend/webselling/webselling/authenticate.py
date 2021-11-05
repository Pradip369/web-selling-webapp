from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework import exceptions
from rest_framework.authentication import CSRFCheck


def enforce_csrf(request):
    """
    Enforce CSRF validation.
    """
    check = CSRFCheck()
    # populates request.META['CSRF_COOKIE'], which is used in process_view()
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        # CSRF failed, bail with explicit error message
        raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)

'''
   Token Authentication for the every http(s) request...
'''
class CustomAuthentication(JWTAuthentication):
    
    def authenticate(self, request):
        header = self.get_header(request)
              
        if header is None:
            raw_token = request.get_signed_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],salt = settings.SIMPLE_JWT['AUTH_COOKIE_SALT'],default = False) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        enforce_csrf(request)
        return self.get_user(validated_token),validated_token