from django.urls import path
from . import api, views


urlpatterns = [
    # frontend
    path('', views.index, name='index'),

    # api
    path('api/endpoints/', api.api_endpoints, name='api-endpoints'),
    path('api/task/list/', api.api_list_tasks, name='api-list-tasks'),
    path('api/task/create/', api.api_create_task, name='api-create-task'),
    path('api/task/update/<int:pk>/', api.api_update_task, name='api-update-task'),
    path('api/task/delete/<int:pk>/', api.api_delete_task, name='api-delete-task'),
]
