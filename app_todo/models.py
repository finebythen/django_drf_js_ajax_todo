from django.db import models


class Task(models.Model):
    description = models.CharField(max_length=250, null=False, blank=False, unique=True)
    status = models.BooleanField(default=False)
    created_user = models.CharField(max_length=100, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['description']

    def __str__(self) -> str:
        return self.description
