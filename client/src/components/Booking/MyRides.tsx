/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import api from "../../services/api";
import { Booking } from "../../types";

const MyRides: React.FC = () => {
  const [rides, setRides] = useState<Booking[]>([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await api.get("/bookings/my-rides");
      setRides(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch rides. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelRide = async (bookingId: string) => {
    try {
      await api.post(`/bookings/${bookingId}/cancel`);
      toast({
        title: "Ride Cancelled",
        description: "Your ride has been successfully cancelled.",
      });
      fetchRides();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel ride. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Rides</h1>
      {rides.map((ride) => (
        <Card key={ride.id}>
          <CardHeader>
            <CardTitle>Ride to {ride.dropoff}</CardTitle>
            <CardDescription>Booking ID: {ride.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>From:</strong> {ride.pickup}
                </p>
                <p>
                  <strong>To:</strong> {ride.dropoff}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(ride.date).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> ${ride.estimatedPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <Badge
                  variant={
                    ride.status === "completed" ? "default" : "secondary"
                  }
                >
                  {ride.status}
                </Badge>
              </div>
            </div>
            {ride.status === "pending" && (
              <Button
                variant="destructive"
                className="mt-4"
                onClick={() => cancelRide(ride.id)}
              >
                Cancel Ride
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyRides;
