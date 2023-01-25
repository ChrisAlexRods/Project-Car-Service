from django.db import models
from django.urls import reverse
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

# class Vip(models.Model):
#     vip = models.BooleanField(default=False)

class Technician(models.Model):

    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=25, unique=True, null=True)


    def __str__(self):
        return self.employee_number

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})

class Status(models.Model):
    """
    The Status VO model provides a status to an appointment, which
    can be SCHEDULED, COMPLETED, or CANCELED.
    """

    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10, unique=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)  # Default ordering for Status
        verbose_name_plural = "statuses"  #
class Appointment(models.Model):

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="SCHEDULED")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment


    vin = models.CharField(max_length=17, unique=True)
    name = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    reason_for_service = models.TextField(max_length=2000)
    vip = models.BooleanField(default=False)

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    status = models.ForeignKey(
        Status,
        related_name="presentations",
        on_delete=models.PROTECT,
    )

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def cancel(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()

    def complete(self):
        status = Status.objects.get(name="COMPLETED")
        self.status = status
        self.save()

    def __str__(self):
        return self.automobile.vin

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("date", "time")  # Default ordering for presentation
