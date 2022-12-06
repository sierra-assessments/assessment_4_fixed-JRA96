from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import Category, Post
# import json


def send_the_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)


@api_view(["GET", "POST"])
def categories(request):
    """
        GET: Returns a list of all posts 
        POST: Create a new category
    """

    if request.method == 'GET':
        list_of_categories = []
        all_categoriy_information = Category.objects.all().values()
        for item in all_categoriy_information:
            list_of_categories.append({'id': item['id'], 'title': item['title']},)
        print(list_of_categories)
        return JsonResponse({'data': list_of_categories})

    elif request.method == 'POST':
        new_category = Category(title=request.data['title'])
        new_category.save()
        return JsonResponse({'data': request.data})
    #


@api_view(["PUT", "DELETE", "GET"])
def category(request, category_id):
    """
        GET: Returns a single 
        PUT: Updates a single category
        DELETE: Deletes a category
    """
    if request.method == 'PUT':
        Category.objects.filter(id= category_id).update(title = request.data['title'])
        return JsonResponse({'success': True, 'id': category_id, 'title': request.data["title"]})
    elif request.method == 'DELETE':
        Category.objects.filter(id= category_id).delete()
        return JsonResponse({'success': True, 'id': category_id})
    elif request.method == 'GET':
        return JsonResponse({'success': True, 'id': category_id})


@api_view(["GET"])
def posts(request):

    if request.method == 'GET':
        list_of_posts = []
        all_post_information = Post.objects.all().values()
        print(all_post_information)
        for item in all_post_information:
            list_of_posts.append({'id': item['id'], 'title_id': item['title_id'], 'content': item['content']},)
        return JsonResponse({'data': list_of_posts})


@api_view(["GET", "PUT"])
def post(request, post_id):
    if request.method == 'PUT':
        Post.objects.filter(id= post_id).update(content = request.data['content'])
        return JsonResponse({'success': True, 'id': post_id})
    return JsonResponse({'success': True, 'id': post_id})


@api_view(["GET", "POST"])
def category_posts(request, category_id):
    if request.method == 'GET':
        list_of_category_posts = Post.objects.filter(title = category_id)
        post_content = []
        for item in list_of_category_posts.all().values():
            post_content.append({'id': item['id'], 'content': item['content']})
        # print(list_of_category_posts.all().values())
        # print(post_content)
        return JsonResponse({'data': post_content})
    
    elif request.method == 'POST':
        category = Category.objects.get(id= category_id)
        print(category)
        new_post = Post(title = category, content = request.data['content'])
        new_post.save()
        return JsonResponse({'success': True, 'id': category_id, 'content': request.data["content"]})



@api_view(["GET"])
def category_post(request, category_id, post_id):

    return JsonResponse({'success': True, 'id': post_id})
