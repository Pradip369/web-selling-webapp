from django.contrib import admin
from .models import WebInformation,BiddingUser

class BiddingUserInline(admin.StackedInline):    
    model = BiddingUser
    extra = 0
    can_delete = True

@admin.register(WebInformation)
class WebInforamtionAdmin(admin.ModelAdmin):
    list_display= ["id","user_name","domain_name","price","created_date"]
    search_fields=["id","domain_name","price","short_title",'full_description','website_url']
    list_per_page = 10
    list_filter = ['created_date']
    list_display_links = list_display
    readonly_fields = ['id','created_date']
    inlines = [BiddingUserInline]