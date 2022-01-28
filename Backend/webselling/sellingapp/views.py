from .models import WebInformation,BiddingUser
from .serializers import WebInformationSerializer,UserSerializer,BiddingUserSerializer,LoginSerializer,RegisterSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from rest_framework import status,serializers,viewsets
from rest_framework.decorators import api_view, permission_classes, throttle_classes,authentication_classes
from rest_framework.filters import OrderingFilter,SearchFilter
from rest_framework.exceptions import PermissionDenied        
from django.utils import timezone
from .utility import set_token_cookie
from django.contrib.auth import authenticate
from rest_framework.generics import UpdateAPIView,CreateAPIView
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class ManageAuth(APIView):
    permission_classes = [AllowAny]

    def post(self,request,formate = None):      # Logout
        response = Response()
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        response.status_code = status.HTTP_200_OK
        response.data = {"Success" : "Successfully logged out!!"}
        return response

    def put(self,request,formate=None):         # Get user details
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            data = serializer.data
            data['isAuthenticated'] = True
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response({"un_authorized" : "Un_Authenticated!!"},status=status.HTTP_204_NO_CONTENT)

class RegisterView(CreateAPIView,UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create(
            username=serializer.data.get('username'),
            email=serializer.data.get('email'),
            first_name=serializer.data.get('first_name'),
            last_name=serializer.data.get('last_name')
        )
        user.set_password(serializer.data.get('password'))
        user.last_login = timezone.now()
        user.save()
        response = Response()
        set_token_cookie(request,response,user) 
        response.status = status.HTTP_200_OK
        return response

    def update(self, request, *args, **kwargs):
        data = request.data
        user_id = self.request.query_params.get('user_id',0)
        instance = get_object_or_404(User,id = user_id,username = request.user.username)
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self,request,formate = None):
        data = request.data
        response = Response()       
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username,password=password)
        if user is not None:
            if user.is_active:
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])
                set_token_cookie(request,response,user) 
                response.status = status.HTTP_200_OK
                return response
            else:
                return Response({"No active" : "This account is not actived yet!!"},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"Invalid" : "Invalid username or password!!"},status=status.HTTP_400_BAD_REQUEST)

class WebInformationView(viewsets.ModelViewSet):
    queryset = WebInformation.objects.all()
    serializer_class = WebInformationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [OrderingFilter,SearchFilter]
    search_fields = ['domain_name', 'short_title','full_description','website_url','price']
    ordering_fields = ['created_date','price']
    ordering = ['-created_date']

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = WebInformation.objects.filter(user_name__id = user_id)
            return queryset
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(user_name=self.request.user)

    def update(self, request,*args, **kwargs):
        instance = self.get_object()
        if self.request.user == instance.user_name:
            return super(WebInformationView,self).update(request,*args, **kwargs)
        else:
            raise PermissionDenied()

    def perform_destroy(self, instance):
        if self.request.user == instance.user_name:
            return instance.delete()
        else:
            raise PermissionDenied()

class BiddingUserView(viewsets.ModelViewSet):
    queryset = BiddingUser.objects.all()
    serializer_class = BiddingUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [OrderingFilter,SearchFilter]
    search_fields = ['user__username', 'bid_price']
    ordering_fields = ['created_date','bid_price']
    ordering = ['-bid_price']

    def get_queryset(self):
        web_id = self.request.query_params.get('web_id',0)
        if web_id:
            queryset = BiddingUser.objects.filter(website__id = web_id)
            return queryset
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self,request, *args, **kwargs):
        web_id = request.data.get('website',0)
        has_bidded = BiddingUser.objects.filter(user = self.request.user,website = web_id).exists()
        if has_bidded:
            raise PermissionDenied(detail = "You have to already bidded this website!!")
        else:
            return super().create(request, *args, **kwargs)

    def update(self, request,*args, **kwargs):
        instance = self.get_object()
        if self.request.user == instance.user:
            return super(BiddingUserView,self).update(request,*args, **kwargs)
        else:
            raise PermissionDenied()

    def perform_destroy(self, instance):
        if self.request.user == instance.user:
            return instance.delete()
        else:
            raise PermissionDenied()