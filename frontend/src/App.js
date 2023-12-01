import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from './component/Navbar.js';

import OrigToDest from './pages/OrigToDest.js'
import Airline from './pages/Airline.js'
import CreateAcc from './pages/CreateAcc.js'
import AccRecord from './pages/AccRecord.js'
import CreateRecord from './pages/CreateRecord.js'
import Account from './pages/Account.js'
import UpdatePassword from './pages/UpdatePassword.js'
import DeleteAccount from './pages/DeleteAccount';


function App() {
  return (
    <BrowserRouter>
      <h1> FlightDelayPro </h1>
      <Navbar/>
      <Routes> 
        <Route exact path="/" element={<OrigToDest/>}/>
        <Route path="/airline" element={<Airline/>}/>
        <Route path="/account-record" element={<AccRecord/>}/>
        <Route path="/create-account" element={<CreateAcc/>}/>
        <Route path="/create-record" element={<CreateRecord/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/update-password" element={<UpdatePassword/>}/>
        <Route path="/delete-account" element={<DeleteAccount/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
