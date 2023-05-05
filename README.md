# Car Service Project README
Welcome to the Car Service project! This project is a car dealership management system, consisting of various microservices that handle inventory, sales, and services.

## Getting Started
To get started with the Car Service project, follow these steps to set up your environment:

1. Create a Docker volume for the project data:`docker volume create beta-data`
2. Build the project using Docker Compose:`docker-compose build`
3. Run the project using Docker Compose:`docker-compose up`

## Project Overview
The Car Service project consists of several microservices:

- Inventory Microservice
- Sales Microservice
-Service Microservice

## Team Members
- Person 1: Christian Rodriguez
- Person 2: Daniel Im - Service Microservice

## Design
Service Microservice
Daniel Im

The service microservice has three models:

- Technician: Creates the table for technicians who will be assigned to the second model as a foreign key. The technicians model only has two fields for the technician name and their employee number.

- Appointment: The table for keeping track of service appointments. Here we record the details of the vehicles to be serviced and the details of the appointment. Fields include the VIN of the vehicle, the owner's name, the time/date of the appointment, the reason for the appointment, the status of the appointment, and a reference to the foreign key Technician to show an assigned Technician for the appointment.

- AutomobileVO: This model comes from the inventory microservice and is used to reference against the appointment model VIN field. It switches the VIP field Boolean value in our views depending on whether the VIN recorded for the service appointment exists in the AutomobileVO.

Sales Microservice
Christian Rodriguez

The sales microservice has three models:

- AutomobileVO: This model pulls the specific data that we want from the inventory microservice, in this case, the VIN. A poller is used to communicate between the sales microservice and the inventory microservice. The VIN is then used within the SalesRecord model as a foreign key to make the connection to the inventory.

- Customer: Contains the customer_name, address, and phone_number fields.

- SalesPerson: Contains the sales_name and employee number fields. Both act as foreign keys to the SalesRecord model.

- SalesRecord: This model is the culmination of all other models. It uses a foreign key from inventory and two other foreign keys within the sales project to give a detailed record of a sold car. The final field is the sales price, which takes a number for the price.
![Homepage](https://user-images.githubusercontent.com/105233007/227309345-f6f39803-edcf-422b-8c8b-b1003e71dc1f.PNG)
