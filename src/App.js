import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Settings from "./Components/Settings/Settings";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Analytics from "./Components/Analytics/Analytics";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Dashboard} />}
          />
          <Route
            path="/analytics"
            element={<ProtectedRoute Component={Analytics} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute Component={Settings} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
