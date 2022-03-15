import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./fontawesome-free-5.15.4-web/css/all.min.css";

import Index from "./components/index";



class App extends Component {
  state = {}
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;