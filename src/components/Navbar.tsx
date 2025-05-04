
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-safety-primary font-bold text-xl">SafeHaven</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/report" className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md">
              Report Incident
            </Link>
            <Link to="/track" className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md">
              Track Case
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md">
              Login
            </Link>
            <Link to="/register">
              <Button className="bg-safety-primary hover:bg-safety-secondary">Register</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 px-2 pt-2 pb-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/report" 
                className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Report Incident
              </Link>
              <Link 
                to="/track" 
                className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Track Case
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-safety-primary px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-safety-primary hover:bg-safety-secondary text-white px-3 py-2 rounded-md text-center"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
