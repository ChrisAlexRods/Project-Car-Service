import { useEffect, useState } from 'react';

function ServiceHistoryList() {
  const [appointments, setAppointments] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/');

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments)
      console.log(data)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

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
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.map(appointment => {
                  return (
                  <tr key={appointment.id}>
                      <td>{ appointment.vin }</td>
                      <td>{ appointment.date }</td>
                      <td>{ appointment.time }</td>
                      <td>{ appointment.reason_for_service }</td>
                      <td>{ appointment.vip }</td>
                      <td>{ appointment.status }</td>
                      <td>{ appointment.technician }</td>
                  </tr>
                  );
              })}
            </tbody>
        </table>
    )
}

export default ServiceHistoryList;
