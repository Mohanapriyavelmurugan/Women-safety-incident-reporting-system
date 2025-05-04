
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface CaseDetails {
  caseId: string;
  status: "under_review" | "investigating" | "awaiting_info" | "resolved" | "closed";
  dateReported: string;
  lastUpdated: string;
  assignedOfficer: string;
  notes: string[];
}

// Mock data for demonstration
const mockCaseDetails: Record<string, CaseDetails> = {
  "123456": {
    caseId: "123456",
    status: "investigating",
    dateReported: "2023-05-02",
    lastUpdated: "2023-05-05",
    assignedOfficer: "Officer Sarah Johnson",
    notes: [
      "2023-05-05: Officer contacted witnesses for statements.",
      "2023-05-03: Evidence collected from scene.",
      "2023-05-02: Case opened and assigned to Officer Johnson.",
    ],
  },
  "654321": {
    caseId: "654321",
    status: "awaiting_info",
    dateReported: "2023-04-28",
    lastUpdated: "2023-05-01",
    assignedOfficer: "Officer Michael Chen",
    notes: [
      "2023-05-01: Waiting for additional information from reporter.",
      "2023-04-30: Initial investigation completed.",
      "2023-04-28: Case opened and assigned to Officer Chen.",
    ],
  },
  "789012": {
    caseId: "789012",
    status: "resolved",
    dateReported: "2023-04-15",
    lastUpdated: "2023-04-25",
    assignedOfficer: "Officer David Williams",
    notes: [
      "2023-04-25: Case resolved. Perpetrator identified and appropriate action taken.",
      "2023-04-20: Witness interviews completed.",
      "2023-04-16: Evidence collection completed.",
      "2023-04-15: Case opened and assigned to Officer Williams.",
    ],
  },
};

const statusLabels = {
  under_review: "Under Review",
  investigating: "Investigating",
  awaiting_info: "Awaiting Information",
  resolved: "Resolved",
  closed: "Closed",
};

const statusColors = {
  under_review: "bg-blue-100 text-blue-800",
  investigating: "bg-amber-100 text-amber-800",
  awaiting_info: "bg-purple-100 text-purple-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const TrackCase = () => {
  const [caseId, setCaseId] = useState("");
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // In a real app, this would make an API call
    if (caseId.trim() === "") {
      setError("Please enter a case ID");
      return;
    }
    
    // Check if the case exists in our mock data
    if (mockCaseDetails[caseId]) {
      setCaseDetails(mockCaseDetails[caseId]);
      toast({
        title: "Case found",
        description: `Case #${caseId} details have been retrieved.`,
      });
    } else {
      setError("Case not found. Please check the ID and try again.");
      setCaseDetails(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Track Your Case</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Case Status Lookup</CardTitle>
            <CardDescription>
              Enter your case ID to check the current status of your incident report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter your case ID (e.g., 123456)"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="bg-safety-primary hover:bg-safety-secondary">
                Track Case
              </Button>
            </form>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        
        {caseDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Case #{caseDetails.caseId}</CardTitle>
              <CardDescription>
                Reported on {caseDetails.dateReported} | Last updated {caseDetails.lastUpdated}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span 
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-sm font-medium ${
                      statusColors[caseDetails.status]
                    }`}
                  >
                    {statusLabels[caseDetails.status]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned Officer</p>
                  <p className="font-medium">{caseDetails.assignedOfficer}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Case Updates</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead>Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caseDetails.notes.map((note, index) => {
                      const [date, message] = note.split(": ");
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{date}</TableCell>
                          <TableCell>{message}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 bg-safety-light p-4 rounded-md">
                <p className="text-sm">
                  <strong>Need assistance?</strong> Contact our support team at{" "}
                  <a href="mailto:support@safehaven.org" className="text-safety-primary hover:underline">
                    support@safehaven.org
                  </a>{" "}
                  or call <strong>1-800-SAFE-NOW</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {!caseDetails && !error && (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">
              Enter your case ID above to view case details and current status.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackCase;
