import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";




function App() {

  
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
    <Routes>
      <Route exact path="/login" element={<Login/>}/>
    </Routes>
    <Routes>
      <Route exact path="/profile" element={<Profile/>}/>
    </Routes>
    </>
  );
}

export default App;
