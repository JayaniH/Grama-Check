import React from 'react';
import './App.css';
import ViewRequest from './Pages/GS/ViewRequest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/viewRequests" element={<ViewRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
