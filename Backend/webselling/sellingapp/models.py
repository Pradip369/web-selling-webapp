from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

class WebInformation(models.Model):
    user_name = models.ForeignKey(to = User,on_delete=models.CASCADE,related_name='webinfo_user')
    domain_name = models.CharField(max_length=60,unique=True)
    short_title = models.CharField(max_length=150)
    website_image = models.ImageField(upload_to = 'web_image')
    full_description = models.TextField()
    short_video = models.FileField(upload_to = 'web_video',null=True,blank=True,validators=[FileExtensionValidator(allowed_extensions = ['MP4','WEBM'])])
    website_url = models.URLField()
    price = models.IntegerField(help_text='Price must be in INR!!')
    created_date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.domain_name)

class BiddingUser(models.Model):
    user = models.ForeignKey(to = User,on_delete=models.CASCADE,related_name='bidding_user_details')
    website = models.ForeignKey(to = WebInformation,on_delete=models.CASCADE,related_name='web_bidding_users')
    bid_price = models.IntegerField()
    created_date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.user.username)