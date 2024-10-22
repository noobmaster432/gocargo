/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import api from "../../services/api";
import { Job } from "../../types";

const DriverDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchDriverStatus();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/driver/jobs");
      setJobs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchDriverStatus = async () => {
    try {
      const response = await api.get("/driver/status");
      setIsAvailable(response.data.isAvailable);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch driver status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleAvailability = async () => {
    try {
      const response = await api.post("/driver/toggle-availability");
      setIsAvailable(response.data.isAvailable);
      toast({
        title: "Status Updated",
        description: `You are now ${
          response.data.isAvailable ? "available" : "unavailable"
        } for new jobs.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    }
  };

  const acceptJob = async (jobId: string) => {
    try {
      await api.post(`/driver/jobs/${jobId}/accept`);
      toast({
        title: "Job Accepted",
        description: "You have successfully accepted the job.",
      });
      fetchJobs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Driver Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            Toggle your availability for new jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isAvailable}
              onCheckedChange={toggleAvailability}
            />
            <span>{isAvailable ? "Available" : "Unavailable"}</span>
          </div>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-semibold mt-6">Available Jobs</h2>
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>Job to {job.dropoff}</CardTitle>
            <CardDescription>Booking ID: {job.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>From:</strong> {job.pickup}
                </p>
                <p>
                  <strong>To:</strong> {job.dropoff}
                </p>
                <p>
                  <strong>Estimated Earnings:</strong> $
                  {job.estimatedEarnings.toFixed(2)}
                </p>
              </div>
              <Button onClick={() => acceptJob(job.id)}>Accept Job</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DriverDashboard;
