// Example in a component like Dashboard.tsx or IncidentForm.tsx
"use client";
import { useEffect } from "react";

export default function TestConnection() {
  useEffect(() => {
    fetch("http://localhost:5000/api/ping") // Replace with actual backend URL
      .then((res) => res.json())
      .then((data) => console.log("Backend response:", data))
      .catch((err) => console.error("Connection error:", err));
  }, []);

  return <div>Check console for connection status.</div>;
}
