import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sizebar from './components/Sizebar';
import Navbar from './components/Navbar';
import React, { useState } from 'react';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="App">
      <Sizebar isSidebarOpen={isSidebarOpen} />
      <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle= {handleSidebarToggle}  />

      
    </div>
  );
}

export default App;
