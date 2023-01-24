import React, { useState, useEffect } from 'react';

function ManufacturerForm(){
    const [name, setName] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name };
        const locationUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok){
            setFormSubmitted(true);
        }
    }

    useEffect(() => {
        if (formSubmitted) {
            setName("");
            setFormSubmitted(false);
        }
    }, [formSubmitted]);

return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Manufacturer</h1>
            <form id="create-hat-form" onSubmit={handleSubmit} >
              <div className="form-floating mb-3">
                <input placeholder="Manufacturer_name" onChange={handleNameChange} required type="text" name="Manufacturer_name" id="Manufacturer_name" className="form-control" />
                <label htmlFor="presenter_name">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
  )}

  export default ManufacturerForm;