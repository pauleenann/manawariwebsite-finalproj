import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Update from './pages/Update';
import Add from './pages/Add';
import Homepage from './pages/Homepage';
import Earring from './components/Earrings/Earring';
import Bracelet from './components/Bracelets/Bracelet';
import Necklace from './components/Necklaces/Necklace';
import Ring from './components/Rings/Ring';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Login from './components/Login/Login';
import Bag from './components/Bag/Bag';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Admin from './components/Admin/Admin';
import AdminNavBar from './components/AdminNavBar/AdminNavBar';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is an admin (customize this based on your authentication mechanism)
    const userCategory = localStorage.getItem('category');
    setIsAdmin(userCategory === 'admin');
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Conditionally render either NavigationBar or AdminNavBar */}
        {isAdmin ? <AdminNavBar /> : <NavigationBar />}
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/earrings" element={<Earring />} />
          <Route path="/bracelets" element={<Bracelet />} />
          <Route path="/necklaces" element={<Necklace />} />
          <Route path="/rings" element={<Ring />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
