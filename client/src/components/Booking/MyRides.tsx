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

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  status: string;
  date: string;
}

export const MyRides: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    // TODO: Fetch actual ride data from API
    const mockRides: Ride[] = [
      {
        id: "1",
        pickup: "123 Main St",
        dropoff: "456 Elm St",
        status: "Completed",
        date: "2023-05-01",
      },
      {
        id: "2",
        pickup: "789 Oak St",
        dropoff: "321 Pine St",
        status: "In Progress",
        date: "2023-05-05",
      },
      {
        id: "3",
        pickup: "159 Maple St",
        dropoff: "753 Birch St",
        status: "Scheduled",
        date: "2023-05-10",
      },
    ];
    setRides(mockRides);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Rides</CardTitle>
          <CardDescription>View and manage your bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Dropoff</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.map((ride) => (
                <TableRow key={ride.id}>
                  <TableCell>{ride.date}</TableCell>
                  <TableCell>{ride.pickup}</TableCell>
                  <TableCell>{ride.dropoff}</TableCell>
                  <TableCell>{ride.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {ride.status === "Scheduled" ? "Cancel" : "Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
