import { useEffect, useState } from 'react';

function AutomobilesList() {
  const [automobiles, setAutomobiles] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/');

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles)
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
              {automobiles && automobiles.map(automobile => {
                  return (
                  <tr key={automobile.id}>
                      <td>{ automobile.vin }</td>
                      <td>{ automobile.model.name }</td>
                      <td>{ automobile.color }</td>
                      <td>{ automobile.year }</td>
                      <td><button className="btn btn-med btn-primary" onClick={() => handleDelete(automobile.vin)}>Delete</button></td>
                  </tr>
                  );
              })}
            </tbody>
        </table>
    )
}

export default AutomobilesList;
