import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 Ride Sharing App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
