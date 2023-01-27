import { useEffect, useState } from "react";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  };

  const handleCancel = async (id) => {
    const url = `http://localhost:8080/api/appointments/${id}/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({ status: "CANCELED" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    response.json().then (() => {
        getData()
    })
  };

  const handleComplete = async (id) => {
    const url = `http://localhost:8080/api/appointments/${id}/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({ status: "COMPLETED" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    response.json().then (() => {
        getData()
    })
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/api/appointments/${id}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Customer Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Reason for Service</th>
          <th>VIP</th>
          <th>Status</th>
          <th>Technician</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {appointments
          .filter((appointment) => appointment.status === "SCHEDULED")
          .map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reason_for_service}</td>
                {appointment.vip && <td>VIP</td>}
                {!appointment.vip && <td> </td>}
                <td>{appointment.status}</td>
                <td>{appointment.technician.name}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-med btn-success"
                      onClick={() => handleComplete(appointment.id)}
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-med btn-danger"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-med btn-primary"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default AppointmentsList;
