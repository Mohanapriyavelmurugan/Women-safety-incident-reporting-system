
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, FileText, Bell } from "lucide-react";

interface Incident {
  id: string;
  reportedBy: string;
  dateReported: string;
  location: string;
  type: string;
  status: "under_review" | "investigating" | "awaiting_info" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  description: string;
}

// Mock data for incidents
const mockIncidents: Incident[] = [
  {
    id: "123456",
    reportedBy: "Jane Smith",
    dateReported: "2023-05-02",
    location: "Central Park, East Entrance",
    type: "Harassment",
    status: "investigating",
    priority: "high",
    description: "Verbal harassment by unknown individual while jogging. Suspect was wearing red jacket and blue jeans.",
  },
  {
    id: "654321",
    reportedBy: "Emily Johnson",
    dateReported: "2023-04-28",
    location: "Downtown Metro Station",
    type: "Stalking",
    status: "awaiting_info",
    priority: "medium",
    description: "Noticed same person following for three consecutive days on commute home from work.",
  },
  {
    id: "789012",
    reportedBy: "Sophia Lee",
    dateReported: "2023-04-15",
    location: "University Library",
    type: "Theft",
    status: "resolved",
    priority: "low",
    description: "Backpack stolen while studying. Contains laptop and personal items.",
  },
  {
    id: "456789",
    reportedBy: "Maria Rodriguez",
    dateReported: "2023-05-10",
    location: "Sunset Apartments, Building C",
    type: "Domestic Violence",
    status: "under_review",
    priority: "urgent",
    description: "Noise complaint from neighbors. Sounds of argument and possible physical altercation.",
  },
  {
    id: "234567",
    reportedBy: "Lisa Taylor",
    dateReported: "2023-05-08",
    location: "City Mall Parking Lot",
    type: "Assault",
    status: "investigating",
    priority: "high",
    description: "Attempted assault while returning to car after shopping. Security footage may be available.",
  },
  {
    id: "345678",
    reportedBy: "Anonymous",
    dateReported: "2023-05-05",
    location: "River Road Neighborhood",
    type: "Suspicious Activity",
    status: "under_review",
    priority: "medium",
    description: "Suspicious vehicle circling the neighborhood multiple times over the past week.",
  },
];

const statusLabels = {
  under_review: "Under Review",
  investigating: "Investigating",
  awaiting_info: "Awaiting Information",
  resolved: "Resolved",
  closed: "Closed",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  medium: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  high: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  urgent: "bg-red-100 text-red-800 hover:bg-red-200",
};

const statusColors = {
  under_review: "bg-blue-100 text-blue-800",
  investigating: "bg-amber-100 text-amber-800",
  awaiting_info: "bg-purple-100 text-purple-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const AdminDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [newStatus, setNewStatus] = useState<Incident["status"]>("under_review");
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusUpdate = () => {
    if (!selectedIncident) return;
    
    // In a real app, this would make an API call to update the status
    const updatedIncidents = incidents.map(incident => 
      incident.id === selectedIncident.id 
        ? { ...incident, status: newStatus } 
        : incident
    );
    
    setIncidents(updatedIncidents);
    setIsUpdateDialogOpen(false);
    
    toast({
      title: "Status updated",
      description: `Case #${selectedIncident.id} status has been updated to ${statusLabels[newStatus]}.`,
    });
    
    // Reset state
    setStatusUpdate("");
    setNewStatus("under_review");
  };

  const openIncidentDetails = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const openUpdateDialog = (incident: Incident) => {
    setSelectedIncident(incident);
    setNewStatus(incident.status);
    setIsUpdateDialogOpen(true);
  };

  const filteredIncidents = incidents.filter(incident => 
    incident.id.includes(searchTerm) ||
    incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const urgentCount = incidents.filter(i => i.priority === "urgent").length;
  const highCount = incidents.filter(i => i.priority === "high").length;
  const pendingCount = incidents.filter(i => i.status !== "resolved" && i.status !== "closed").length;

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Urgent Cases</p>
                <p className="text-2xl font-bold">{urgentCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Bell className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-bold">{highCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Cases</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <TabsList className="mb-4 md:mb-0">
              <TabsTrigger value="all">All Incidents</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search incidents..."
                className="pl-8 pr-4 py-2 border rounded-md w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>All Reported Incidents</CardTitle>
                <CardDescription>
                  View and manage all reported incidents
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.reportedBy}</TableCell>
                          <TableCell>{incident.dateReported}</TableCell>
                          <TableCell>{incident.type}</TableCell>
                          <TableCell>
                            <Badge className={priorityColors[incident.priority]}>
                              {priorityLabels[incident.priority]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[incident.status]}>
                              {statusLabels[incident.status]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openIncidentDetails(incident)}
                              >
                                View
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-safety-primary hover:bg-safety-secondary"
                                onClick={() => openUpdateDialog(incident)}
                              >
                                Update
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="urgent">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Urgent Incidents</CardTitle>
                <CardDescription>
                  Critical cases requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncidents
                        .filter((i) => i.priority === "urgent")
                        .map((incident) => (
                          <TableRow key={incident.id}>
                            <TableCell className="font-medium">{incident.id}</TableCell>
                            <TableCell>{incident.reportedBy}</TableCell>
                            <TableCell>{incident.dateReported}</TableCell>
                            <TableCell>{incident.type}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[incident.status]}>
                                {statusLabels[incident.status]}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openIncidentDetails(incident)}
                                >
                                  View
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="bg-safety-primary hover:bg-safety-secondary"
                                  onClick={() => openUpdateDialog(incident)}
                                >
                                  Update
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Pending Incidents</CardTitle>
                <CardDescription>
                  Cases that require further action
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncidents
                        .filter((i) => i.status !== "resolved" && i.status !== "closed")
                        .map((incident) => (
                          <TableRow key={incident.id}>
                            <TableCell className="font-medium">{incident.id}</TableCell>
                            <TableCell>{incident.reportedBy}</TableCell>
                            <TableCell>{incident.dateReported}</TableCell>
                            <TableCell>{incident.type}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[incident.status]}>
                                {statusLabels[incident.status]}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openIncidentDetails(incident)}
                                >
                                  View
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="bg-safety-primary hover:bg-safety-secondary"
                                  onClick={() => openUpdateDialog(incident)}
                                >
                                  Update
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resolved">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Resolved Incidents</CardTitle>
                <CardDescription>
                  Cases that have been closed or resolved
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncidents
                        .filter((i) => i.status === "resolved" || i.status === "closed")
                        .map((incident) => (
                          <TableRow key={incident.id}>
                            <TableCell className="font-medium">{incident.id}</TableCell>
                            <TableCell>{incident.reportedBy}</TableCell>
                            <TableCell>{incident.dateReported}</TableCell>
                            <TableCell>{incident.type}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[incident.status]}>
                                {statusLabels[incident.status]}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openIncidentDetails(incident)}
                                >
                                  View
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Case Details Dialog */}
      {selectedIncident && (
        <Dialog open={!!selectedIncident && !isUpdateDialogOpen} onOpenChange={() => setSelectedIncident(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Case #{selectedIncident.id}</DialogTitle>
              <DialogDescription>
                Reported on {selectedIncident.dateReported} by {selectedIncident.reportedBy}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Incident Type</p>
                <p className="font-medium">{selectedIncident.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedIncident.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <Badge className={priorityColors[selectedIncident.priority]}>
                  {priorityLabels[selectedIncident.priority]}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className={statusColors[selectedIncident.status]}>
                  {statusLabels[selectedIncident.status]}
                </Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <div className="bg-gray-50 p-3 rounded-md">
                <p>{selectedIncident.description}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Evidence</p>
              <div className="bg-gray-50 p-3 rounded-md flex items-center justify-center">
                <p className="text-gray-400">No evidence files attached</p>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedIncident(null)}
              >
                Close
              </Button>
              <Button 
                className="bg-safety-primary hover:bg-safety-secondary"
                onClick={() => {
                  setSelectedIncident(selectedIncident);
                  setNewStatus(selectedIncident.status);
                  setIsUpdateDialogOpen(true);
                }}
              >
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Case Status</DialogTitle>
            <DialogDescription>
              Update the status for case #{selectedIncident?.id}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as Incident["status"])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="awaiting_info">Awaiting Information</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Update Notes</label>
              <Textarea
                placeholder="Add notes about this status update"
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-safety-primary hover:bg-safety-secondary"
              onClick={handleStatusUpdate}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminDashboard;
