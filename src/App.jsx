import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import ThemeProvider from "./provider/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 text-secondary-900 dark:text-secondary-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
