import { useEffect, useState } from 'react';

function CustomerForm(){

    const[customer, setCustomer] = useState("")
    const[address, setAddress] = useState("")
    const[phone_number, setPhone_Number] = useState("")

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone_Number(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.customer_name = customer;
        data.address = address;
        data.phone_number = phone_number;

        const customerUrl = "http://localhost:8090/api/customers/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };

        const response = await fetch(customerUrl,fetchConfig);
        if(response.ok){
            const resposne = await response.json();
            alert("Successfully created a new customer");
            setCustomer('')
            setAddress('')
            setPhone_Number('')
        }else{
            alert("Error creating customer. Please make sure the phone number has no (-).")
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
                <form id="create-hat-form" onSubmit={handleSubmit} >
                    <div className="form-floating mb-3">
                    <input placeholder="customer_name" onChange={handleCustomerChange} required type="text" name="customer_name" id="customer_name" className="form-control" />
                    <label htmlFor="customer_name">Customer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="address" onChange={handleAddressChange} required type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="phone_number" onChange={handlePhoneChange} required type="text" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        )}

export default CustomerForm;
