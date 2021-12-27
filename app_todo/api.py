from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .functions import get_full_username
from .models import Task
from .serializers import TaskSerializerGET, TaskSerializerPOST


@api_view(['GET'])
def api_endpoints(request):
    endpoints = {
        'endpoints': 'api/endpoints/',
        'task list': 'api/task/list/',
        'task create': 'api/task/create/',
        'task update': 'api/task/update/<int:pk>/',
        'task delete': 'api/task/delete/<int:pk>/',
    }
    return Response(endpoints)


@api_view(['GET'])
def api_list_tasks(request):
    qs = Task.objects.all()
    serializer = TaskSerializerGET(qs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def api_create_task(request):
    username = get_full_username(request)
    serializer = TaskSerializerPOST(data=request.data)
    if serializer.is_valid():
        serializer.save(status=False, created_user=username)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_update_task(request, pk):
    qs = Task.objects.get(id=pk)
    if qs.status:
        qs.status = False
    else:
        qs.status = True
    qs.save()
    return Response(status=status.HTTP_200_OK)



@api_view(['DELETE'])
def api_delete_task(request, pk):
    qs = Task.objects.get(id=pk)
    qs.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
