from django.contrib import admin
from .models import AutomobileVO, SalesPerson, Customer, Sales
# Register your models here.

@admin.register(AutomobileVO)
class AutomobileVOadmin(admin.ModelAdmin):
    pass

@admin.register(SalesPerson)
class SalesPersonadmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class Customeradmin(admin.ModelAdmin):
    pass

@admin.register(Sales)
class Salesadmin(admin.ModelAdmin):
    pass