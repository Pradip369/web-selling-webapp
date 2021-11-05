from rest_framework import serializers
from .models import WebInformation,BiddingUser
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password','user_permissions','groups','is_active','is_staff')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=150,write_only=True)

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True,validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True,validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

class WebInformationSerializer(serializers.ModelSerializer):
    user_name = serializers.SlugRelatedField(slug_field='username',read_only = True)

    class Meta:
        model = WebInformation
        fields = ('id','user_name','domain_name','short_title','website_image','full_description','short_video','website_url','price','created_date')
        read_only_fields = ('id','created_date')

class BiddingUserSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username',read_only = True)

    class Meta:
        model = BiddingUser
        fields = ('id','user','website','bid_price','created_date')
        read_only_fields = ('id','created_date')