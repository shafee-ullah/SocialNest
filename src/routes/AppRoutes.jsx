import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreateEvent from "../pages/CreateEvent";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import ManageEvents from "../pages/ManageEvents";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-events"
          element={
            <PrivateRoute>
              <ManageEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "dark:bg-secondary-800 dark:text-secondary-50",
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
          },
        }}
      />
    </>
  );
};

export default AppRoutes;
