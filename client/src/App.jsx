import React from 'react';
import './App.css';
import ViewRequest from './Pages/GS/ViewRequest';
import Home from './Pages/Home';
import Letter from './Pages/GS/Letter';
import ApplyRequest from './Pages/Citizen/ApplyRequest';
import ApplyForm from './Pages/Citizen/ApplyForm';
import AdminHome  from './Pages/Admin/AdminHome';
import CreateGS from './Pages/Admin/CreateGS';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homePage" element={<Home/>} />
        <Route path="/viewRequests" element={<ViewRequest />} />
        <Route path='/letter' element={<Letter/>}/>
        <Route path='/applyRequest' element={<ApplyRequest/>} />
        <Route path='/applyForm' element={<ApplyForm/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/CreateGS' element={<CreateGS/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
