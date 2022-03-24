import React from 'react'
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import {} from "react-router"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"


 const App = ()=>{
  return (
    <Router>
      <Routes>
        <Route element={<Home/>} path={"/"} exact/>
        <Route element={<Dashboard/>} path={"/dashboard"}  exact/>
        <Route element={<Onboarding/>} path={"/onboarding"} exact/>
      </Routes>
      
    </Router>
  );
}

export default App;
