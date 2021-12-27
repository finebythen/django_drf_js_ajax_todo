from django.contrib import admin
from .models import Task


def aufgabe_schliessen(modeladmin, request, queryset):
    queryset.update(status=True)

def aufgabe_oeffnen(modeladmin, request, queryset):
    queryset.update(status=False)

class TaskAdmin(admin.ModelAdmin):
    list_display = ('description', 'status', 'created_user', 'created_date')
    list_filter = ('status',)
    actions = [aufgabe_oeffnen, aufgabe_schliessen]

# Register your models here.
admin.site.register(Task, TaskAdmin)
