from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from common.json import ModelEncoder


class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["sales_name", "employee_number", "id"]


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
