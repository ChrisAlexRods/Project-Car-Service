import { useEffect, useState } from 'react';

function AutomobilesList() {
  const [automobile, setAutomobiles] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/');

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAutomobiles(data.autos)
       }
  }

  const handleDelete = async (vin) => {
    const url = `http://localhost:8100/api/automobiles/${vin}`
    const fetchConfig = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
        getData()
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
                  <th>Model Name</th>
                  <th>Color</th>
                  <th>Year</th>
                  <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {automobile && automobile.map(autos => {
                  return (
                  <tr key={autos.id}>
                      <td>{ autos.vin }</td>
                      <td>{ autos.model.name }</td>
                      <td>{ autos.color }</td>
                      <td>{ autos.year }</td>
                      <td><button className="btn btn-med btn-primary" onClick={() => handleDelete(autos.vin)}>Delete</button></td>
                  </tr>
                  );
              })}
            </tbody>
        </table>
    )
}

export default AutomobilesList;
