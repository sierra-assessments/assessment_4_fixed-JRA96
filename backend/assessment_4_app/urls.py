from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('categories/', views.categories),
    path('categories/<int:category_id>/', views.category),
    path('posts/', views.posts),
    path('posts/<int:post_id>/', views.post),
    path('categories/<int:category_id>/posts/', views.category_posts),
    path('categories/<int:category_id>/posts/<int:post_id>/', views.category_post),

    # path('signup', views.sign_up),
    # path('login', views.log_in),
    # path('logout', views.log_out),
    # path('whoami', views.who_am_i)

]
