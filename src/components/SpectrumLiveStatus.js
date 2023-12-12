import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Loader from "./Loader";

const SpectrumLiveStatus = () => {
  const [liveData, setLiveData] = useState(null);
  const [isActionRequired, setIsActionRequired] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connected successfully");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLiveData(data);
      setIsActionRequired(data.IsActionRequired);

      // Open the modal automatically if isActionRequired is true
      if (data.IsActionRequired) {
        setShowPopup(true);
        // Pause WebSocket updates while modal is open
        newSocket.close();
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("WebSocket connection died");
      }
    };

    setSocket(newSocket);

    // Cleanup WebSocket connection on component unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const handleAction = async () => {
    try {
      await axios.get(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum"
      );

      setIsActionRequired(false);
      const newSocket = new WebSocket(
        "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
      );

      newSocket.onopen = () => {
        console.log("WebSocket reconnected successfully");
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLiveData(data);
        setIsActionRequired(data.IsActionRequired);

        // Open the modal automatically if isActionRequired is true
        if (data.IsActionRequired) {
          setShowPopup(true);
          // Pause WebSocket updates while modal is open
          newSocket.close();
        }
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      newSocket.onclose = (event) => {
        if (event.wasClean) {
          console.log(
            `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
          );
        } else {
          console.error("WebSocket connection died");
        }
      };

      setSocket(newSocket);

      // Hide the popup
      setShowPopup(false);
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-3 text-center mt-5">
            <h1>Live Data</h1>
          </div>
          {!liveData && <Loader />}
          {liveData && (
            <div className="col-md-12 mx-auto mt-5">
              <div className="row">
                <div className="col">
                  <div className="velocity text-center">
                    <h3>Velocity</h3>
                    <p>{liveData.Velocity}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="altitude text-center">
                    <h3>Altitude</h3>
                    <p>{liveData.Altitude}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="temperature text-center">
                    <h3>Temperature</h3>
                    <p>{liveData.Temperature}</p>
                  </div>
                </div>
                <div className="col">
                  <div className="pressure text-center">
                    <h3>Ascending </h3>
                    <p>{liveData.IsAscending ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mt-5">
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                  <div
                    className={`alert ${
                      isActionRequired ? "alert-danger" : "alert-success"
                    }`}
                    role="alert"
                  >
                    Action Required: {isActionRequired ? "Yes" : "No"}
                  </div>
                  <div className="alert alert-success" role="alert">
                    Status: {liveData.StatusMessage}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`modal fade ${showPopup ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showPopup ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Please Take Action</h5>
            </div>

            <div className="modal-body">
              {isActionRequired && (
                <button className="btn btn-danger" onClick={handleAction}>
                  Take Action
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpectrumLiveStatus;
