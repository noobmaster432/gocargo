import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Job {
  id: string;
  pickup: string;
  dropoff: string;
  status: string;
  estimatedEarnings: number;
}

export const DriverDashboard: React.FC = () => {
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);

  useEffect(() => {
    // TODO: Fetch actual job data from API
    const mockAvailableJobs: Job[] = [
      {
        id: "1",
        pickup: "123 Main St",
        dropoff: "456 Elm St",
        status: "Available",
        estimatedEarnings: 50,
      },
      {
        id: "2",
        pickup: "789 Oak St",
        dropoff: "321 Pine St",
        status: "Available",
        estimatedEarnings: 75,
      },
    ];
    const mockActiveJobs: Job[] = [
      {
        id: "3",
        pickup: "159 Maple St",
        dropoff: "753 Birch St",
        status: "In Progress",
        estimatedEarnings: 60,
      },
    ];
    setAvailableJobs(mockAvailableJobs);
    setActiveJobs(mockActiveJobs);
  }, []);

  const handleAcceptJob = (jobId: string) => {
    // TODO: Implement job acceptance logic and API call
    console.log("Job accepted:", jobId);
    const acceptedJob = availableJobs.find((job) => job.id === jobId);
    if (acceptedJob) {
      setActiveJobs([...activeJobs, { ...acceptedJob, status: "In Progress" }]);
      setAvailableJobs(availableJobs.filter((job) => job.id !== jobId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Jobs</CardTitle>
            <CardDescription>Jobs you can accept</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Dropoff</TableHead>
                  <TableHead>Estimated Earnings</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.pickup}</TableCell>
                    <TableCell>{job.dropoff}</TableCell>
                    <TableCell>${job.estimatedEarnings}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAcceptJob(job.id)}>
                        Accept
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Jobs you're currently working on</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Dropoff</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Earnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.pickup}</TableCell>
                    <TableCell>{job.dropoff}</TableCell>
                    <TableCell>{job.status}</TableCell>
                    <TableCell>${job.estimatedEarnings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
