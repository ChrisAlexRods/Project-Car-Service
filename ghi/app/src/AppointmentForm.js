import React, {useEffect, useState } from 'react';

function AppointmentForm() {

    const [status, setStatus] = useState([])
    const [technicians, setTechnicians] = useState([])

    const [formData, setFormData] = useState({
        vin: '',
        name: '',
        date: '',
        time: '',
        reason_for_service: '',
        vip: '',
        status: '',
        technician: '',
      })
    //   console.log(formData)

    const fetchStatusData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            setStatus(data.statuses);
            // console.log(bins)
        }
    }
    useEffect(() => {
        fetchStatusData();
    }, []);

    const fetchTechnicianData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
            // console.log(bins)
        }
    }
    useEffect(() => {
        fetchTechnicianData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8080/api/appointments/';
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
                vin: '',
                name: '',
                date: '',
                time: '',
                reason_for_service: '',
                vip: '',
                status: '',
                technician: '',
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
                        <h1 className="card-title">Add an automobile to inventory</h1>
                        <form onSubmit={handleSubmit} id="create-automobile-form">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <select onChange={handleFormChange} value={formData.model} name="model" id="model" className="form-select" required>
                                            <option value="">Choose a model</option>
                                            {models.map(model => {
                                            return (
                                                <option key={model.id} value={model.id}>{model.name}</option>
                                            )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.color} required placeholder="Color" type="text" id="color" name="color" className="form-control" />
                                        <label htmlFor="color">Color</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.year} required placeholder="Year" type="text" id="year" name="year" className="form-control" />
                                        <label htmlFor="year">Year</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.vin} required placeholder="VIN" type="text" id="vin" name="vin" className="form-control" />
                                        <label htmlFor="vin">VIN</label>
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

export default AppointmentForm;
