import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Browse from "./pages/Browse/Browse";
import { useAuthStore } from "./store/auth"
import "./App.css";

function App() {
  //check if token exists
  const isAuthenticated = !!useAuthStore.getState().token;
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/browse"
          element={
            isAuthenticated ? <Browse /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/browse" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
