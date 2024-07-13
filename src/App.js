import React from 'react';
import {  Routes, Route, Navigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';
import Balance from './components/Balance';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import Category from './components/Category';
import Profile from './components/Profile';
import { ConfigProvider } from './context/ConfigContext';



function App() {
  return (
    <ConfigProvider>
    <div className="App">
      <Navbar />
    
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/auth/signup" element={<IsAnon><SignUp /></IsAnon>} />
          <Route path="/auth/login" element={<IsAnon><Login /></IsAnon>} />
          <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
          <Route path="/income" element={<IsPrivate><IncomeList /></IsPrivate>} />
          <Route path="/income/new" element={<IsPrivate><IncomeForm /></IsPrivate>} />
          <Route path="/expense/new" element={<IsPrivate><ExpenseForm /></IsPrivate>} />
          <Route path="/expense" element={<IsPrivate><ExpenseList /></IsPrivate>} />
          <Route path="/balance" element={<IsPrivate><Balance /></IsPrivate>} />
          <Route path="/category" element={<IsPrivate><Category /></IsPrivate>} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
          
          
        </Routes>
      
   </div>
   </ConfigProvider>
 
 );
}

export default App;