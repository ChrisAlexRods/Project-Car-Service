# CarCar

Team:

- Person 1 - Christian Rodriguez
- Person 2 - Daniel Im - Service Microservice

## Design

## Service microservice

Daniel Im
Explain your models and integration with the inventory
microservice, here.

The service microservice has three models: technician which creates the table for technicians who will be assigned to the second model as a foreign key. The technicians model only has two fields for the technician name and their employee number. The second model is the appointment model which is the table for keeping track of service appointments, here we record the details of the vehicles to be serviced and the details of the appointment. We have the VIN of the vehicle, the owner's name, the time/date of the appointment, the reason for the appointment, the status of the appointment, we reference the foreign key Technician to show an assigned Technician for the appointment. Finally we reference our third and last model - the automobile VO which is the only model from the inventory microservice and is purely used to reference against the appointment model VIN field to switch the VIP field Boolean value in our views depending on whether the VIN recorded for the service appointment exists in the AutomobileVO.

## Sales microservice

Christian Rodriguez
Explain your models and integration with the inventory
microservice, here.

The Sales models primarily dealt with the inventory models through my AutomobileVO and SalesRecord classes. My AutomobileVO pulls the specific data that I want which I defined in the model which in my case was the VIN. We pull the vin from the invnetory models so we can use it in the sales microservice. To do this I use a polar to communicate between the sales microservice and the inventory microservice. Once the poller allows for communication between my microservices I can now use the VIN within the SalesRecord model as a foreign key to make that connection to inventory. My automobile and sales_person fields are foreign keys to my other defined models. My Customer model contains the customer_name, address, and phone_number. Within my SalesPerson model, I have defined the sales_name and employee number. Both act as foreign keys to my SalesRecord model. The final field is just a sales price field which takes a number for the price. The culmination of all my models is within my SalesRecord Model where i use a foreign key from inventory and two other foreign keys within the sales project to give a detailed record of a sold car.
