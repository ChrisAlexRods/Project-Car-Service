import { useEffect, useState } from 'react';

function ModelList(){
    const [model, setModel] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/models/")

        if(response.ok){
            const data = await response.json();
            setModel(data.models)
            console.log(data)
            console.log(data.models);
        }
    }

    useEffect(() => {
        getData();
      }, []);

    return (
        <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture URL</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {model && model.map(mod => (
                <tr key={mod.id}>
                  <td>{mod.name}</td>
                  <td>{mod.picture_url}</td>
                  <td>{mod.manufacturer.name}</td>
                </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    }
export default ModelList;
