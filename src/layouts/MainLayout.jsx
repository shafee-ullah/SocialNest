import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-secondary-50">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
