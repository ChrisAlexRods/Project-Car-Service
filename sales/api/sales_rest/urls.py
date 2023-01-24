from django.urls import path
from sales_rest.views import(
    list_of_sales_people,
    detail_of_sales_people,
    list_of_customers,
    detail_of_customer,
    list_sale_records,
    detail_sale_record,
)

urlpatterns = [
    path("sales/", list_of_sales_people, name = "list_of_sales_people"),
    path("sales/<int:pk>/", detail_of_sales_people, name = "detail_of_sales_people"),
    path("customers/", list_of_customers, name = "list_of_customers"),
    path("customers/<int:pk>/", detail_of_customer, name = "detail_of_customer"),
    path("sale_record/", list_sale_records, name = "list_sale_records"),
    path("sale_record/<int:pk>/", detail_sale_record, name = "detail_sale_record")
]
