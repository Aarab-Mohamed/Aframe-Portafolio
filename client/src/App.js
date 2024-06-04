// import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompShowData from "./components/ShowData";
import CompCreateData from "./components/CreateData";
import CompEditData from "./components/EditData";
import AFrameScene from "./components/AFrameScene2";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AFrameScene />} />
        <Route path="/show" element={<CompShowData />} />
        <Route path="/create" element={<CompCreateData />} />
        <Route path="/edit/:id" element={<CompEditData />} />
      </Routes>
    </Router>
  );
}

export default App;
