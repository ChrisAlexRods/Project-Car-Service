from django.shortcuts import render
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder
import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

# class AutomobileVOEncoder(ModelEncoder):
#     model = AutomobileVO
#     properties = ["vin"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_number"]
    # def get_extra_data(self, o):
    #     return {"bin": o.bin.id}

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "vin", "name", "vip", "date", "time", "reason_for_service", "status", "technician"]
    # def get_extra_data(self, o):
    #     return {
    #         "status": o.Status.name,
    #     }
    encoders = {
        # "automobile": AutomobileVOEncoder(),
        "technician": TechnicianDetailEncoder(),
    }
class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id", "vin", "name", "vip", "date", "time", "reason_for_service", "status", "technician"
    ]
    # def get_extra_data(self, o):
    #     return {
    #         "status": o.Status.name,
    #     }
    encoders = {
        # "automobile": AutomobileVOEncoder(),
        "technician": TechnicianDetailEncoder(),
    }



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):

    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):

    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
        #         try:
        #     sales_person = SalesPerson.objects.get(id = pk)
        #     sales_person.delete()
        #     return JsonResponse(
        #         sales_person,
        #         encoder = SalesPersonDetailEncoder,
        #         safe = False,
        #     )
        # except SalesPerson.DoesNotExist:
        #     return JsonResponse({"message: Sales Person does not exist"})

    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    #PUT REQUEST
    # else:
    #     content = json.loads(request.body)
    #     try:
    #         if "bin" in content:
    #             bin = BinVO.objects.get(id=content["bin"])
    #             content["bin"] = bin
    #     except BinVO.DoesNotExist:
    #         return JsonResponse(
    #             {"message": "Invalid bin id"},
    #             status=400,
    #         )
    #     Shoe.objects.filter(id=pk).update(**content)

    #     shoe = Shoe.objects.get(id=pk)
    #     return JsonResponse(
    #         {"shoe": shoe},
    #         encoder=ShoeDetailEncoder,
    #         safe=False,
    #     )



@require_http_methods(["GET", "POST"])
def api_list_appointments(request):

    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        # try:
        content = {
            "technician": Technician.objects.get(pk=content["technician"]),
            # "automobile": AutomobileVO.objects.get(vin=content["automobile"]),
        }
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
        # except Technician.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid Technician"},
        #         status=400,
        #    )
                #BLAHBLAHBLAHBLAH
        # except Exception as e:
        #     response = JsonResponse({"message": str(e)})
        #     response.status_code = 500
        #     return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


    # elif request.method == "DELETE":
    #     count, _ = Shoe.objects.filter(id=pk).delete()
    #     return JsonResponse({"deleted": count > 0})

    #PUT METHOD
    # else:
    #     content = json.loads(request.body)
    #     try:
    #         if "bin" in content:
    #             bin = BinVO.objects.get(id=content["bin"])
    #             content["bin"] = bin
    #     except BinVO.DoesNotExist:
    #         return JsonResponse(
    #             {"message": "Invalid bin id"},
    #             status=400,
    #         )
    #     Shoe.objects.filter(id=pk).update(**content)

    #     shoe = Shoe.objects.get(id=pk)
    #     return JsonResponse(
    #         {"shoe": shoe},
    #         encoder=ShoeDetailEncoder,
    #         safe=False,
    #     )
