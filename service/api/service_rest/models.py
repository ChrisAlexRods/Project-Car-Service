from django.db import models
from django.urls import reverse
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=25, unique=True, null=True)

    def __str__(self):
        return self.employee_number

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    name = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    reason_for_service = models.TextField(max_length=2000)
    vip = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=
            [
                ("SCHEDULED", "SCHEDULED"),
                ("COMPLETED", "COMPLETED"),
                ("CANCELED", "CANCELED"),
            ]
        ,
        default="SCHEDULED"
    )

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("date", "time")
