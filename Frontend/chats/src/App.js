import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import {  Routes, Route } from "react-router-dom";
import {QueryClientProvider, QueryClient} from 'react-query'


const queryClient = new QueryClient()


function App() {

  
  return (
    <>
    <QueryClientProvider client= {queryClient}>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
    <Routes>
      <Route exact path="/login" element={<Login/>}/>
    </Routes>
    <Routes>
      <Route exact path="/profile" element={<Profile/>}/>
    </Routes>
    </QueryClientProvider>
    </>
  );
}

export default App;
