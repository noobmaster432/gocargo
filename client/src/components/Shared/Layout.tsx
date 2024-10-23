import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <Navbar />
      <main className="container mx-auto px-4 py-8 min-h-[78.25vh]">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 Go Cargo. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
