import React, {useEffect, useState } from 'react';

function TechnicianForm() {

    const [formData, setFormData] = useState({
        name: '',
        employee_number: '',
      })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            setFormData({
                name: '',
                employee_number: '',
            })
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h1 className="card-title">Add a technician</h1>
                        <form onSubmit={handleSubmit} id="create-technician-form">
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.name} required placeholder="Name" type="text" id="name" name="name" className="form-control" />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.employee_number} required placeholder="Employee Number" type="text" id="employee_number" name="employee_number" className="form-control" />
                                        <label htmlFor="employee_number">Employee Number</label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-lg btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
