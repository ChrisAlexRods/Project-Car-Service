from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    sales_name = models.CharField(max_length=200, unique=True)
    employee_number = models.BigIntegerField()

    def __str__(self):
        return f"{self.sales_name} {self.employee_number}"

    def get_api_url(self):
        return reverse("list_of_sales_people", kwargs={"pk": self.pk})


class Customer(models.Model):
    customer_name = models.CharField(max_length=200, unique=True)
    adress = models.CharField(max_length=200, unique=True)
    phone_number = models.BigIntegerField()


class Sales(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )