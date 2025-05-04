
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, FileText, Search } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-safety-primary" />,
      title: "Report an Incident",
      description: "Submit details about an incident in a secure and confidential manner.",
      link: "/report",
      linkText: "File a Report",
    },
    {
      icon: <Search className="h-6 w-6 text-safety-primary" />,
      title: "Track Case Status",
      description: "Follow the progress of your report with your case tracking number.",
      link: "/track",
      linkText: "Check Status",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-safety-emergency" />,
      title: "Emergency SOS",
      description: "Quickly alert authorities in case of an emergency situation.",
      link: "#",
      linkText: "SOS Button",
      emergency: true,
    },
    {
      icon: <Bell className="h-6 w-6 text-safety-primary" />,
      title: "Stay Updated",
      description: "Receive notifications about your case and safety alerts.",
      link: "/register",
      linkText: "Register Now",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-safety-dark">
                Safe Haven <span className="text-safety-primary">Reporting System</span>
              </h1>
              <p className="text-lg mb-6 text-gray-600 max-w-md">
                A secure platform for reporting and tracking incidents. Your safety is our priority.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/report">
                  <Button className="bg-safety-primary hover:bg-safety-secondary w-full sm:w-auto">
                    Report an Incident
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full sm:w-auto border-safety-primary text-safety-primary hover:bg-safety-light">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" 
                alt="Safe reporting" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-safety-dark">
            How We Can Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                  feature.emergency ? 'border-2 border-safety-emergency' : ''
                }`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.link}>
                  <Button 
                    variant={feature.emergency ? "destructive" : "outline"} 
                    className={feature.emergency ? "bg-safety-emergency w-full" : "border-safety-primary text-safety-primary hover:bg-safety-light w-full"}
                  >
                    {feature.linkText}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4 text-safety-dark">About Safe Haven</h2>
              <p className="text-gray-600 mb-4">
                Safe Haven is dedicated to providing a secure and confidential platform for reporting incidents. 
                We work closely with local authorities to ensure that all reports are handled with care and professionalism.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to create safer communities by empowering individuals to report incidents and access support services.
              </p>
              <div className="flex space-x-2 items-center">
                <div className="h-1 w-20 bg-safety-primary rounded-full"></div>
                <p className="text-safety-primary font-medium">Your safety matters</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-safety-light p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">100%</h3>
                  <p className="text-sm text-gray-600">Confidential Reporting</p>
                </div>
                <div className="bg-safety-light p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">24/7</h3>
                  <p className="text-sm text-gray-600">Emergency Support</p>
                </div>
                <div className="bg-safety-light p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">Fast</h3>
                  <p className="text-sm text-gray-600">Response Times</p>
                </div>
                <div className="bg-safety-light p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">Secure</h3>
                  <p className="text-sm text-gray-600">Data Protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
