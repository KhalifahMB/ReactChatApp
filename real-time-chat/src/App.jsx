/* eslint-disable no-unused-vars */
// src/App.js
import React, { useState } from "react";
import { app, auth } from "./firebase";
import Login from "./components/Login";
import Chat from "./components/Chat";
import UserList from "./components/UserList";
import { useAuthState } from "react-firebase-hooks/auth";
import "./assets/css/styles.css";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/Error";
import SharedLayout from "./components/SharedLayout";
function App() {
  // const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="chats"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
