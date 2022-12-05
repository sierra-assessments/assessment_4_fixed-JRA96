from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('api/categories/', views.categories),
    path('api/categories/<int:category_id>/', views.category),
    path('api/posts/', views.posts),
    path('api/posts/<int:post_id>/', views.post),
    path('api/categories/<int:category_id>/posts/', views.category_posts),
    path('api/categories/<int:category_id>/posts/<int:post_id>/', views.category_post),

    # path('signup', views.sign_up),
    # path('login', views.log_in),
    # path('logout', views.log_out),
    # path('whoami', views.who_am_i)

]
