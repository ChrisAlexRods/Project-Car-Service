import React, { useState, useEffect } from 'react';


function SalesRecordForm(){
    const[automobile, setAutomobile] = useState([])
    const [selectedAuto, setSelectedAuto] = useState("")
    const[sales_person, setSales_Person] = useState([])
    const[selectedSalesPerson, setSelectedSalesPerson] = useState("")
    const[customer, setCustomer] = useState([])
    const[selectedCustomer, setSelectedCustomer] = useState("")
    const[sales_price, setSalesPrice] = useState("")


    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setSelectedAuto(value);
    }

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSelectedSalesPerson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setSelectedCustomer(value);
    }

    const handleSalesPriceChange = (event) => {
        const value = event.target.value;
        setSalesPrice(value);
    }

    const fetchAutomobile = async () => {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json();
            setAutomobile(data.autos)
            console.log(data)
        }
    }

    const fetchSalesPerson = async ()=> {
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json();
            setSales_Person(data.person)
        }
    }

    const fetchCustomer = async () => {
        const url = "http://localhost:8090/api/customers/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json();
            setCustomer(data.customer)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.automobile = automobile;
        data.sales_person = sales_person
        data.customer = customer;
        data.sales_price = sales_price;


        const salesRecordUrl = "http://localhost:8090/api/sale_record/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesRecordUrl,fetchConfig)
        if(response.ok){
            setSelectedAuto('')
            setSelectedSalesPerson('')
            setSelectedCustomer('')
            setSalesPrice('')
        }
    }
    useEffect(() => {
        fetchAutomobile();
      }, []);

    useEffect(() => {
        fetchSalesPerson();
    }, []);
    useEffect(() => {
        fetchCustomer();
    }, []);





    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Record a New Sale</h1>
                <form id="create-hat-form" onSubmit={handleSubmit} >
                <div className="mb-3">
                <select required name="automobile" id="automobile" className="form-select" onChange={handleAutomobileChange} >
                    <option  value="">Choose a Automobile</option>
                    {automobile.map(autos => (
                      <option key={autos.id} value={autos.id}>{autos.vin}</option>
                    ))}
                  </select>
                  </div>
                  <div className="mb-3">
                <select required name="sales_person" id="sales_person" className="form-select" onChange={handleSalesPersonChange} >
                    <option  value="">Choose a Sales Person</option>
                    {sales_person.map(person => (
                      <option key={person.id} value={person.id}>{person.sales_name}</option>
                    ))}
                  </select>
                  </div>
                  <div className="mb-3">
                <select required name="customer_name" id="customer_name" className="form-select" onChange={handleCustomerChange} >
                    <option  value="">Choose a Customer</option>
                    {customer.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.customer_name}</option>
                    ))}
                  </select>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder="sales_price" onChange={handleSalesPriceChange} required type="text" name="sales_price" id="sales_price" className="form-control" />
                    <label htmlFor="sales_price">Sales Price</label>
                  </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        )}

export default SalesRecordForm;
