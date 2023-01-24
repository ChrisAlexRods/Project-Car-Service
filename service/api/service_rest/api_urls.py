from django.urls import path
from .views import api_list_technicians, api_show_technicians

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_create_technicians"),
    path(
        "technicians/<int:pk>/",
        api_list_technicians,
        name="api_list_technicians",
    ),
    #Show all shoes?
    # path("shoes/", api_show_shoe, name="api_show_shoe"),
    # path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),
]
