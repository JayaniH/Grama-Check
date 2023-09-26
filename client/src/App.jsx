import React from 'react';
import './App.css';
import ViewRequest from './Pages/GS/ViewRequest';
import Home from './Pages/Home';
import Letter from './Pages/GS/Letter';
import ApplyRequest from './Pages/Citizen/ApplyRequest';
import ApplyForm from './Pages/Citizen/ApplyForm';
import AdminHome  from './Pages/Admin/AdminHome';
import GSHome from './Pages/GS/GSHome';
import CreateGS from './Pages/Admin/CreateGS';
import CitizenHome from './Pages/Citizen/CitizenHome';
import Page1 from './Pages/Page1';
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
        <Route path='/GSHome' element={<GSHome/>}/>
        <Route path='/CitizenHome' element={<CitizenHome/>}/>
        <Route path='/Page1' element={<Page1/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
