import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound"; // Imported NotFound component
import AuthForm from "./components/AuthForm"; // Imported AuthForm component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<AuthForm mode="register" />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
