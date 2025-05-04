
import React from "react";
import { Navbar } from "./Navbar";
import { SOSButton } from "./SOSButton";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 container mx-auto py-6 px-4 relative">
        {children}
      </main>
      <footer className="bg-safety-dark text-white p-4">
        <div className="container mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} Women's Safety Incident Reporting System</p>
          <p className="mt-1">
            <a href="#" className="underline hover:text-safety-accent">Privacy Policy</a> | 
            <a href="#" className="underline hover:text-safety-accent ml-2">Terms of Service</a> | 
            <a href="#" className="underline hover:text-safety-accent ml-2">Contact</a>
          </p>
        </div>
      </footer>
      <SOSButton />
    </div>
  );
};
