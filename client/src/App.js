import React from "react";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import {} from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const [Cookies, setCookies, removeCookies] = useCookies();
  const token = Cookies.token;
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path={"/"} exact />
        { token &&<Route element={<Dashboard />} path={"/dashboard"} exact />}
        {token && <Route element={<Onboarding />} path={"/onboarding"} exact />}
      </Routes>
    </Router>
  );
};

export default App;
