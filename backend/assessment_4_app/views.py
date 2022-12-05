from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view


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
        list_of_categories = [
            {'id': 1, 'title': 'Games'},
            {'id': 2, 'title': 'Hobbies'},
            {'id': 3, 'title': 'Movies'}
        ]
        return JsonResponse({'data': list_of_categories})

    elif request.method == 'POST':
        print(request.data["title"])
        return JsonResponse({'success': True, 'title': request.data["title"]})
    #


@api_view(["PUT", "DELETE"])
def category(request, category_id):
    if request.method == 'PUT':
        print(request.data["title"])
        return JsonResponse({'success': True, 'title': request.data["title"]})
    elif request.method == 'DELETE':
        return JsonResponse({'success': True, 'id': category_id})


@api_view([])
def posts(request):

    pass


@api_view([])
def post(request, post_id):

    pass


@api_view([])
def category_posts(request, category_id):

    pass


@api_view([])
def category_post(request, category_id, post_id):

    pass
