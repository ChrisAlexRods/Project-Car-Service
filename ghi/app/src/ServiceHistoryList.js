import { useEffect, useState } from "react";

function ServiceHistoryList() {
  const [filterVin, setFilterVin] = useState("");
  const [appointments, setAppointments] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/appointments/");

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    setFilterVin(e.target.value);
  };

  const filteredHistory = () => {
    if (filterVin === " ") {
      return appointments;
    } else {
      return appointments.filter((appointment) =>
        appointment.vin.toLowerCase().includes(filterVin)
      );
    }
  };

  return (
    <>
      <div>
        <input onChange={handleSearch} placeholder="Filter For VIN" />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason for Service</th>
            <th>Status</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory().map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reason_for_service}</td>
                <td>{appointment.status}</td>
                <td>{appointment.technician.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ServiceHistoryList;
