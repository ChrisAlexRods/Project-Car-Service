import { useEffect, useState } from 'react';

function SalesRecordList(){
    const[sales_record, setSales_record] = useState([])

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

    return (
        <table className="table table-striped">
            <thead>
              <tr>
                  <th>VIN</th>
                  <th>Sales Person Name</th>
                  <th>Customer Name</th>
                  <th>Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {sales_record && sales_record.map(sales_record => {
                  return (
                  <tr key={sales_record.id}>
                      <td>{ sales_record.vin}</td>
                      <td>{ sales_record.sales_person.sales_name }</td>
                      <td>{ sales_record.customer.customer_name }</td>
                      <td>{ sales_record.sales_price }</td>
                  </tr>
                  );
              })}
            </tbody>
        </table>
    )
}

export default SalesRecordList;
