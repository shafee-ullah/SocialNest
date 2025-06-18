import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-11/12 mx-auto py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
