from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from .models import AutomobileVO, SalesPerson, Customer, Sales
from common.json import ModelEncoder


class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_name", "employee_number","id"]


class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_name", "employee_number"]

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