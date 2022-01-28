from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.urls.conf import include, re_path
from django.views.generic.base import TemplateView
from django.views.decorators.cache import never_cache

base_page = never_cache(TemplateView.as_view(template_name = 'index.html'))

urlpatterns = [
    path('admin/', admin.site.urls),
    path('web_selling/',include('sellingapp.urls')),
    re_path('',base_page)
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)