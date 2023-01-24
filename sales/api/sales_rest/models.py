from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return f"{self.vin}"



class SalesPerson(models.Model):
    sales_name = models.CharField(max_length=200, unique=True)
    employee_number = models.BigIntegerField()

    def __str__(self):
        return f"{self.sales_name} {self.employee_number}"

    def get_api_url(self):
        return reverse("list_of_sales_people", kwargs={"pk": self.pk})


class Customer(models.Model):
    customer_name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200, unique=True)
    phone_number = models.BigIntegerField()

    def __str__(self):
        return f"{self.customer_name} {self.address} {self.phone_number}"

    def get_api_url(self):
        return reverse("detail_of_customer", kwargs={"pk": self.pk})


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_records",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales_records",
        on_delete=models.CASCADE,
    )
    sales_price = models.CharField(max_length=255)



    def get_api_url(self):
        return reverse("list_sale_records", kwargs={"pk": self.pk})
