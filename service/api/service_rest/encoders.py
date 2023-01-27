from common.json import ModelEncoder

from .models import Technician, Appointment, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_number"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "vin", "name", "date", "time", "vip", "reason_for_service", "status", "technician"]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id", "vin", "name", "date", "time", "vip", "reason_for_service", "status", "technician"
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }
