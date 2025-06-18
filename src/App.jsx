import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import ThemeProvider from "./provider/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import EventDetails from "./pages/EventDetails";
import JoinedEvents from "./pages/JoinedEvents";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
