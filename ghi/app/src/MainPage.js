import "./MainPage.css";
import { useEffect, useState } from "react";

function MainPage() {
  const [model, setModel] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      const data = await response.json();
      setModel(data.models);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="header px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership management!
        </p>
        <div className="img-container">
          {model.map((mod) => (
            <div key={mod.id}
              className="card"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            >
              <img
                className="card-img-top"
                src={mod.picture_url}
                alt={mod.name}
              />
              <div className="card-body">
                <p className="card-title">{mod.name}</p>
                <p className="card-text">
                  Manufacturer: {mod.manufacturer.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
