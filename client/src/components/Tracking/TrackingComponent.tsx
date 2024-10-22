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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import api from "../../services/api";
import { TrackingData } from "../../types";

const TrackingComponent: React.FC = () => {
  const [bookingId, setBookingId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const fetchTrackingData = React.useCallback(async () => {
      if (!bookingId) return;
  
      try {
        const response = await api.get(`/tracking/${bookingId}`);
        setTrackingData(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Failed to fetch tracking data. Please check the booking ID and try again.",
          variant: "destructive",
        });
      }
    }, [bookingId]);

  useEffect(() => {
    if (trackingData) {
      const interval = setInterval(fetchTrackingData, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [trackingData, fetchTrackingData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackingData();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Track Your Ride</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter Booking ID</CardTitle>
          <CardDescription>
            Provide your booking ID to track your ride
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookingId">Booking ID</Label>
              <Input
                id="bookingId"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Track</Button>
          </form>
        </CardContent>
      </Card>
      {trackingData && (
        <Card>
          <CardHeader>
            <CardTitle>Tracking Information</CardTitle>
            <CardDescription>
              Booking ID: {trackingData.bookingId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Status:</strong> {trackingData.status}
            </p>
            <p>
              <strong>Current Location:</strong> {trackingData.currentLocation}
            </p>
            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {trackingData.estimatedDelivery}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackingComponent;
