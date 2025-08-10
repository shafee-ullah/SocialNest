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
import JoinedEvents from "../pages/JoinedEvents";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
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
            path="/events/:id/edit"
            element={
              <PrivateRoute>
                <CreateEvent />
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
            path="/joined-events"
            element={
              <PrivateRoute>
                <JoinedEvents />
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
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 404 - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default AppRoutes;
