/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import api from "../../services/api";
import { Job } from "../../types";
import { Badge } from "../ui/badge";

const DriverDashboard: React.FC = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await api.get("/drivers/bookings/available", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchMyJobs = useCallback(async () => {
    try {
      const response = await api.get("/drivers/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyJobs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchDriverStatus = useCallback(async () => {
    try {
      const response = await api.get("/driver/status");
      setIsAvailable(response.data.isAvailable);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchMyJobs();
    fetchDriverStatus();
  }, [fetchJobs, fetchMyJobs, fetchDriverStatus]);

  const toggleAvailability = async () => {
    try {
      setIsAvailable(!isAvailable);
      toast({
        title: "Status Updated",
        description: `You are now ${
          isAvailable ? "available" : "unavailable"
        } for new jobs.`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptJob = async (jobId: string) => {
    try {
      await api.put(`/drivers/bookings/${jobId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      <h2 className="text-2xl font-semibold mt-6">My Jobs</h2>
      {myJobs.map((job) => (
        <Card key={job._id}>
          <CardHeader>
            <CardTitle>Job to {job.dropoffLocation}</CardTitle>
            <CardDescription>Booking ID: {job._id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>From:</strong> {job.pickupLocation}
                </p>
                <p>
                  <strong>To:</strong> {job.dropoffLocation}
                </p>
                <p>
                  <strong>Estimated Earnings:</strong> ${job.price.toFixed(2)}
                </p>
              </div>
              <Badge
                  className="capitalize"
                  variant={
                    job.status === "completed" ? "default" : "secondary"
                  }
                >{job.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
      <h2 className="text-2xl font-semibold mt-6">Available Jobs</h2>
      {jobs.map((job) => (
        <Card key={job._id}>
          <CardHeader>
            <CardTitle>Job to {job.dropoffLocation}</CardTitle>
            <CardDescription>Booking ID: {job._id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>From:</strong> {job.pickupLocation}
                </p>
                <p>
                  <strong>To:</strong> {job.dropoffLocation}
                </p>
                <p>
                  <strong>Estimated Earnings:</strong> ${job.price.toFixed(2)}
                </p>
              </div>
              <Button onClick={() => acceptJob(job._id)}>Accept Job</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DriverDashboard;
