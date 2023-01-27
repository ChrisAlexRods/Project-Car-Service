import React, { useState, useEffect } from "react";

function SalesPersonForm() {
  const [name, setName] = useState("");
  const [employee_number, setEmployeeNumber] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmployeeIdChange = (event) => {
    const value = event.target.value;
    setEmployeeNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.sales_name = name;
    data.employee_number = employee_number;

    const salesPersonUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesPersonUrl, fetchConfig);
    if (response.ok) {
      alert("Successfully created a new sales person!");
      setName("");
      setEmployeeNumber("");
    } else {
      alert("Error creating sales person. Please try again later.");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Sales Person</h1>
          <form id="create-hat-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder="sales_name"
                onChange={handleNameChange}
                required
                type="text"
                name="sales_name"
                id="sales_name"
                className="form-control"
              />
              <label htmlFor="sales_name">Sales person</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="employee_number"
                onChange={handleEmployeeIdChange}
                required
                type="text"
                name="employee_number"
                id="employee_number"
                className="form-control"
              />
              <label htmlFor="presenter_name">Employee number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesPersonForm;
