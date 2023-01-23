from django.urls import path
from sales_rest.views import(
    list_of_sales_people,detail_of_sales_people
)

urlpatterns = [
    path("sales/", list_of_sales_people, name = "list_of_sales_people"),
    path("sales/<int:pk>/", detail_of_sales_people, name = "detail_of_sales_people"),
]
