from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from sales_rest.encoders import (
    SalesPersonListEncoder,
    SalesPersonDetailEncoder,
    CustomerListEncoder,
    SalesRecordListEncoder,
)


@require_http_methods(["GET", "POST"])
def list_of_sales_people(request):
    if request.method == "GET":
        person = SalesPerson.objects.all()
        return JsonResponse({"person": person}, encoder=SalesPersonListEncoder)
    else:
        try:  # POST
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                {"sales_person": sales_person},
                encoder=SalesPersonListEncoder,
                safe=False,
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
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonDetailEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "That sales person does not exist"})
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonDetailEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message: Sales Person does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.get(id=pk)

            props = ["sales_name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(sales_person, prop, content[prop])
            sales_person.save()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonListEncoder,
                safe=False,
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
            encoder=CustomerListEncoder,
            safe=False,
        )
    else:
        try:  # POST
            content = json.loads(request.body)
            customers = Customer.objects.create(**content)
            return JsonResponse(
                customers,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create customer"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def detail_of_customer(request, pk):
    if request.method == "GET":
        try:
            customers = Customer.objects.get(id=pk)
            return JsonResponse(customers, encoder=CustomerListEncoder, safe=False)
        except Customer.DoesNotExist:
            return JsonResponse({"Message": "Does not exist"})

    elif request.method == "DELETE":
        try:
            customers = Customer.objects.get(id=pk)
            customers.delete()
            return JsonResponse(
                customers,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Can't delete"})
    else:
        try:  # PUT
            content = json.loads(request.body)
            customers = Customer.objects.get(id=pk)

            props = ["customer_name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customers, prop, content[prop])
                customers.save()
                return JsonResponse(
                    customers,
                    encoder=CustomerListEncoder,
                    safe=False,
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
            {"sales_record": sales_record}, encoder=SalesRecordListEncoder, safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            content = {
                "sales_person": SalesPerson.objects.get(pk=content["sales_person"]),
                "automobile": AutomobileVO.objects.get(vin=content["automobile"]),
                "customer": Customer.objects.get(pk=content["customer"]),
                "sales_price": content["sales_price"],
            }
            sales_record = SalesRecord.objects.create(**content)
            return JsonResponse(
                {"sales_record": sales_record},
                encoder=SalesRecordListEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "A sales person with the given ID does not exist."},
                status=400,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "A automobile with the given VIN does not exist."},
                status=400,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "A customer with the given ID does not exist."}, status=400
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def detail_sale_record(request, pk):
    if request.method == "GET":
        try:
            sales_record = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                sales_record, encoder=SalesRecordListEncoder, safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse({"Message": "Does not exist"})
    elif request.method == "DELETE":
        try:
            sale_record = SalesRecord.objects.get(id=pk)
            sale_record.delete()
            return JsonResponse(
                sale_record,
                encoder=SalesRecordListEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"The Sales record Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            sale_record = SalesRecord.objects.get(id=pk)

            props = ["automobile", "sales_person", "customer", "sales_price"]
            for prop in props:
                if prop in content:
                    setattr(sale_record, prop, content[prop])
                sale_record.save()
                return JsonResponse(
                    sale_record, encoder=SalesRecordListEncoder, safe=False
                )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "The Sales Record Does not exist"})
            response.status_code = 404
            return response
