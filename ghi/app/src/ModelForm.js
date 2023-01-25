import React, { useState, useEffect } from 'react';

function ModelForm(){
    const[name, setName] = useState("")
    const[picture, setPicture] = useState("")
    const[manufacturer,setManufacturer] = useState([])
    const[selectedManufacturerId, setSelectedManufacturerId] = useState('');

    const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    }

    const handlePictureChange = (event) =>{
      const value = event.target.value;
      setPicture(value);
    }

    const handleManufacturer = (event) => {
      const selectedId = event.target.value;
      setSelectedManufacturerId(selectedId);
    }

    const fetchData = async () => {
      const url = "http://localhost:8100/api/manufacturers/"
      const response = await fetch(url)
      if(response.ok){
        const data = await response.json();
        setManufacturer(data.manufacturers)
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {}
      data.name = name;
      data.picture_url = picture;
      data.manufacturer_id = selectedManufacturerId;
      const locationUrl = "http://localhost:8100/api/models/";
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };
      const response = await fetch(locationUrl, fetchConfig)
      if(response.ok){
          const newManufacturer = await response.json();
          setName('')
          setPicture('')
          setSelectedManufacturerId('')
      }
  }
    useEffect(() => {
      fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a Car Model</h1>
                <form id="create-hat-form" onSubmit={handleSubmit} >
                  <div className="form-floating mb-3">
                    <input placeholder="Manufacturer_name" onChange={handleNameChange} required type="text" name="Manufacturer_name" id="Manufacturer_name" className="form-control" />
                    <label htmlFor="Manufacturer_name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder="Manufacturer_name" onChange={handlePictureChange} required type="text" name="picture_url" id="picture_url" className="form-control" />
                    <label htmlFor="picture_url">Picture URL</label>
                  </div>
                  <div className="mb-3">
                  <select required name="manufacturer" id="manufacturer" className="form-select" value={selectedManufacturerId} onChange={handleManufacturer} >
                    <option  value="">Choose a Manufacturer</option>
                    {manufacturer.map(manufacturer => (
                      <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                    ))}
                  </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
      )}
export default ModelForm;