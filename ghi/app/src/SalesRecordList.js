import { useEffect, useState } from 'react';

function SalesRecordList(){
    const[sales_record, setSales_record] = useState([])
    const[filterValue, setFilterValue] = useState("")

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sale_record/');

        if (response.ok) {
          const data = await response.json();
          setSales_record(data.sales_record)
          console.log(data)
        }
      }

      useEffect(()=>{
        getData()
      }, [])

    const handleChange = (e) => {
      setFilterValue(e.target.value)
    }

    console.log(filterValue)

    return (
        <table className="table table-striped">
            <thead>
              <tr>
                  <th>VIN</th>
                  <th>Sales Person Name</th>
                  <th>Customer Name</th>
                  <th>Sale Price</th>
                  <th>Employee Number</th>
              </tr>
            </thead>
            <tbody>
              {sales_record.filter(record => record.sales_person.sales_name.toLowerCase().includes(filterValue.toLowerCase()))
                .map(sales_record => {
                  return (
                  <tr key={sales_record.id}>
                      <td>{ sales_record.vin}</td>
                      <td>{ sales_record.sales_person.sales_name }</td>
                      <td>{ sales_record.customer.customer_name }</td>
                      <td>{ sales_record.sales_price }</td>
                      <td>{sales_record.sales_person.employee_number}</td>
                  </tr>
                  );
              })}
            </tbody>
            <h5>Filter by Sales Person Name</h5>
            <input onChange ={handleChange} placeholder = "Filter For Name"/>
        </table>
    )
}

export default SalesRecordList;
