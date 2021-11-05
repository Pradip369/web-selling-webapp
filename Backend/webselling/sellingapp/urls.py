from django.urls.conf import path
from .views import WebInformationView,ManageAuth,LoginView,BiddingUserView,RegisterView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'website_manage', WebInformationView)
router.register(r'bidding_manage', BiddingUserView)

urlpatterns = [
path('user_login/', LoginView.as_view(),name = 'login'),
path('user_register/', RegisterView.as_view(),name = 'register'),
path('manage_auth/', ManageAuth.as_view(),name = 'manage_auth')
]

urlpatterns += router.urls