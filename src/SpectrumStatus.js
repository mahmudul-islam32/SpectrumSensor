import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Loader from "./Loader";

const SpectrumStatus = () => {
  const [sensorData, setSensorData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
      );
      setSensorData(response.data);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-3 text-center mt-5">
            <h1>Spectrum Sensor Data</h1>
          </div>
          {!sensorData && <Loader />}
          {sensorData && (
            <div className="col-md-12 mx-auto mt-5">
              <div className="row">
                <div className="col">
                  <div className="velocity text-center">
                    <h3>Velocity</h3>
                    <p>{sensorData.velocity}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="altitude text-center">
                    <h3>Altitude</h3>
                    <p>{sensorData.altitude}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="temperature text-center">
                    <h3>Temperature</h3>
                    <p>{sensorData.temperature}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="pressure text-center">
                    <h3>Ascending </h3>
                    <p>{sensorData.isAscending ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mt-5">
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                  <div
                    className={`alert ${
                      sensorData.isActionRequired
                        ? "alert-danger"
                        : "alert-success"
                    }`}
                    role="alert"
                  >
                    Action Required:{" "}
                    {sensorData.isActionRequired ? "Yes" : "No"}
                  </div>
                  <div className="alert alert-success" role="alert">
                    Status: {sensorData.statusMessage}
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mt-5">
                <button
                  className="btn btn-primary text-center"
                  onClick={fetchData}
                >
                  Update Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpectrumStatus;
