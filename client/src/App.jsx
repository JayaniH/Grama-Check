import React from 'react';
import './App.css';
import ViewRequest from './Pages/GS/ViewRequest';
import Home from './Pages/Home';
import Letter from './Pages/GS/Letter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homePage" element={<Home/>} />
        <Route path="/viewRequests" element={<ViewRequest />} />
        <Route path='/letter' element={<Letter/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
