import React from "react";
import SpectrumStatus from "./SpectrumStatus";
import SpectrumLiveStatus from "./SpectrumLiveStatus";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpectrumStatus />} />
        <Route path="/live" element={<SpectrumLiveStatus />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
