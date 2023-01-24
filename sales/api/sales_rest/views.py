from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from common.json import ModelEncoder


class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_name", "employee_number","id"]


class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_name", "employee_number"]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ["customer_name", "address", "phone_number", "id"]


class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["sales_person", "customer", "sales_price", "id"]
    encoders = {
        "sales_person": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
    }
    def get_extra_data(self, o):
        return {
            "vin": o.automobile.vin,
        }


@require_http_methods(["GET", "POST"])
def list_of_sales_people(request):
    if request.method == "GET":
        person = SalesPerson.objects.all()
        return JsonResponse(
            {"person": person },
            encoder = SalesPersonListEncoder
        )
    else:
        try: #POST
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                {"sales_person": sales_person},
                encoder = SalesPersonListEncoder,
                safe = False,
            )
        except:
            response = JsonResponse(
                {"Message": "Could not create a sales person at this time"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def detail_of_sales_people(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id =pk)
            return JsonResponse(
                sales_person,
                encoder = SalesPersonDetailEncoder,
                safe = False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "That sales person does not exist"})
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id = pk)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder = SalesPersonDetailEncoder,
                safe = False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message: Sales Person does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.get(id =pk)

            props = ["sales_name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(sales_person, prop, content[prop])
            sales_person.save()
            return JsonResponse(
                sales_person,
                encoder = SalesPersonListEncoder,
                safe = False,
            )
        except SalesPerson.DoesNotExist:
                response = JsonResponse({"Message: Sales Person does not exist"})
                response.status_code = 404
                return response


@require_http_methods(["GET", "POST"])
def list_of_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder = CustomerListEncoder,
            safe = False,
        )
    else:
        try: #POST
            content = json.loads(request.body)
            customers = Customer.objects.create(**content)
            return JsonResponse(
                customers,
                encoder = CustomerListEncoder,
                safe = False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def detail_of_customer(request, pk):
    if request.method == "GET":
        try:
            customers = Customer.objects.get(id=pk)
            return JsonResponse(
                customers,
                encoder = CustomerListEncoder,
                safe = False
            )
        except Customer.DoesNotExist:
            return JsonResponse({"Message": "Does not exist"})

    elif request.method == "DELETE":
        try:
            customers = Customer.objects.get(id=pk)
            customers.delete()
            return JsonResponse(
                customers,
                encoder = CustomerListEncoder,
                safe = False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Can't delete"})
    else:
        try: #PUT
            content = json.loads(request.body)
            customers = Customer.objects.get(id = pk)

            props = ["customer_name","address","phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customers, prop, content[prop])
                customers.save()
                return JsonResponse(
                    customers,
                    encoder = CustomerListEncoder,
                    safe = False,
                )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer not exist"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def list_sale_records(request):
    if request.method == "GET":
        sales_record = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_record": sales_record},
            encoder = SalesRecordListEncoder,
            safe = False
        )
    else:
        # try: #POST
            content = json.loads(request.body)
            content = {
                "sales_person": SalesPerson.objects.get(pk=content["sales_person"]),
                "automobile": AutomobileVO.objects.get(vin=content["automobile"]),
                "customer": Customer.objects.get(pk=content["customer"]),
            }
            sales_record = SalesRecord.objects.create(**content)
            return JsonResponse(
                {"sales_record": sales_record},
                encoder = SalesRecordListEncoder,
                safe = False,
            )
        # except:
        #     response = JsonResponse(
        #         {"message": "Sales record can not be created"}
        #     )
        #     response.status_code = 400
        #     return response
