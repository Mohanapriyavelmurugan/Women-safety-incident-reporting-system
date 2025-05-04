
import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export const SOSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const { toast } = useToast();

  const handleSOSClick = () => {
    setIsDialogOpen(true);
  };

  const activateEmergency = () => {
    setIsActivated(true);
    setIsDialogOpen(false);
    // In a real application, this would send an emergency alert to authorities
    toast({
      title: "Emergency Alert Activated",
      description: "Help is on the way. Stay in a safe place if possible.",
      variant: "destructive",
      duration: 10000,
    });

    // After 5 seconds, show another notification that would simulate a response
    setTimeout(() => {
      toast({
        title: "Update: Emergency Services Notified",
        description: "Your location has been shared with emergency services. They will contact you shortly.",
        duration: 0, // Won't dismiss automatically
      });
    }, 5000);
  };

  const cancelEmergency = () => {
    setIsDialogOpen(false);
    if (isActivated) {
      setIsActivated(false);
      toast({
        title: "Emergency Alert Deactivated",
        description: "Your emergency alert has been cancelled.",
      });
    }
  };

  return (
    <>
      <Button
        className={`fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-50 flex items-center justify-center ${
          isActivated
            ? "animate-pulse-gentle bg-safety-emergency"
            : "bg-safety-emergency hover:bg-red-700"
        }`}
        onClick={handleSOSClick}
      >
        <AlertTriangle className="h-8 w-8" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-safety-emergency flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Emergency SOS
            </DialogTitle>
            <DialogDescription>
              {isActivated
                ? "An emergency alert is currently active. Do you want to cancel it?"
                : "This will send an emergency alert to local authorities with your current location. Do you want to proceed?"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4 mt-4">
            {isActivated ? (
              <Button
                variant="default"
                className="w-full"
                onClick={cancelEmergency}
              >
                Cancel Emergency Alert
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="bg-safety-emergency"
                  onClick={activateEmergency}
                >
                  Activate Emergency Alert
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
