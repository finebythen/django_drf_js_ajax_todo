from django.shortcuts import render

from .decorators import allowed_users


@allowed_users(allowed_roles=['customer'])
def index(request):
    return render(request, 'app_todo/index.html')
