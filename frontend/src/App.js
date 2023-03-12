import React from "react";
import Signup from "./Components/SignUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Main from "./Components/Main";
import Home from "./Components/Home";
import Explore from "./Components/Explore";
import Find from "./Components/Find";

function App() {
  return (
    <Router>
      <Main />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />
        <Route
          path="/find"
          element={
            <PrivateRoute>
              <Find />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
