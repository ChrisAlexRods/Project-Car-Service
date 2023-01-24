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

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number"]
    # def get_extra_data(self, o):
    #     return {"bin": o.bin.id}

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["name", "date", "time", "reason_for_service", "automobile", "technician"]
    # def get_extra_data(self, o):
    #     return {"bin": o.bin.id}
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "technician": TechnicianDetailEncoder(),
        # "status":
    }
class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "name", "date", "time", "reason_for_service", "automobile", "technician"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
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
def api_show_technicians(request, pk):

    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
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
