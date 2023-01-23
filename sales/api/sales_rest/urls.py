from django.urls import path
from sales_rest.views import(
    list_of_sales_people,detail_of_sales_people,list_of_customers,detail_of_customer,
)

urlpatterns = [
    path("sales/", list_of_sales_people, name = "list_of_sales_people"),
    path("sales/<int:pk>/", detail_of_sales_people, name = "detail_of_sales_people"),
    path("customers/", list_of_customers, name = "list_of_customers"),
    path("customers/<int:pk>/", detail_of_customer, name = "detail_of_customer")
]
