import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useEffect,useState } from "react";

export default function App(){
  const [isAuth,setIsAuth]=useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsAuth(!!token)
  },[])
  return(
    <BrowserRouter>

    <Routes>
      <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/"
      element={
        isAuth ? <Dashboard/> : <Navigate to="/login"/>
      }
      />
    </Routes>

   </BrowserRouter>
  )
}