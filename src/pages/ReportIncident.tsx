
import React from "react";
import { Layout } from "@/components/Layout";
import { IncidentForm } from "@/components/IncidentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ReportIncident = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Report an Incident</h1>
        
        <div className="mb-8 bg-safety-light p-4 rounded-lg">
          <p className="text-sm">
            <strong>Your privacy is important.</strong> All reports are confidential and 
            secure. Please provide as much detail as possible to help us investigate the incident.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>
              Fill out the form below to report an incident. Fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IncidentForm />
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">What happens next?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Your report will be reviewed by our security team.</li>
            <li>You will receive a case number for tracking purposes.</li>
            <li>An officer may contact you for additional information if needed.</li>
            <li>You can track the status of your report using the case number.</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default ReportIncident;
