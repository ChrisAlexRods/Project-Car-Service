import React, {useEffect, useState } from 'react';


function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])

    const status_choices = [
        { value: "SCHEDULED", label: "SCHEDULED" },
        { value: "COMPLETED", label: "COMPLETED" },
        { value: "CANCELED", label: "CANCELED" }
    ];

    const [formData, setFormData] = useState({
        vin: '',
        name: '',
        date: '',
        time: '',
        reason_for_service: '',
        status: '',
        technician: '',
      })

    const fetchTechnicianData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
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
                        <h1 className="card-title">Schedule a service appointment</h1>
                        <form onSubmit={handleSubmit} id="create-appointment-form">
                            <div className="row">
                                <div className="col">
                                <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.vin} required placeholder="VIN" type="text" id="vin" name="vin" className="form-control" />
                                        <label htmlFor="vin">VIN</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.name} required placeholder="Customer Name" type="text" id="name" name="name" className="form-control" />
                                        <label htmlFor="name">Customer Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.date} required placeholder="Date" type="date" id="date" name="date" className="form-control" />
                                        <label htmlFor="date">Date</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.time} required placeholder="Time" type="time" id="time" name="time" className="form-control" />
                                        <label htmlFor="time">Time</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reason_for_service">Reason for Service</label>
                                        <textarea onChange={handleFormChange} value={formData.reason_for_service} required placeholder="Reason for Service" id="reason_for_service" name="reason_for_service" className="form-control" rows="3" ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <select onChange={handleFormChange} value={formData.status} name="status" id="status" className="form-select" required>
                                            <option value="">Appointment Status</option>
                                            {status_choices.map((choice) => (
                                                <option key={choice.value} value={choice.value} label={choice.label}>
                                                    {choice.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <select onChange={handleFormChange} value={formData.technician} name="technician" id="technician" className="form-select" required>
                                            <option value="">Choose a technician</option>
                                            {technicians.map(technician => {
                                                return (
                                                    <option key={technician.id} value={technician.id}>{technician.name}</option>
                                                )
                                            })}
                                        </select>
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
