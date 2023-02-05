from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.api_root),
    path('restaurants/', views.restaurant_list, name="restaurant-list"),
    path('restaurants/<int:pk>/', views.restaurant_detail, name="restaurant-detail"),
    
    #path('users/', views.user_list, name="user-list"),
    #path('users/<int:pk>/', views.user_detail, name="user-detail"),
    #path('api-auth/', include('rest_framework.urls')),
]

# We don't necessarily need to add these extra url patterns in, but it gives us a simple,
# clean way of referring to a specific format.
urlpatterns = format_suffix_patterns(urlpatterns)