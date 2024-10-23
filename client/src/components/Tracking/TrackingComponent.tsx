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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { TrackingData } from "../../types";
import { Badge } from "../ui/badge";

const TrackingComponent: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [bookingId, setBookingId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchTrackingData = useCallback(async () => {
    if (!bookingId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/tracking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrackingData(response.data.data);
      setStatus(response.data.data.status);
    } catch (error) {
      setError(
        "Failed to fetch tracking data. Please check the booking ID and try again."
      );
      toast({
        title: "Error",
        description:
          "Failed to fetch tracking data. Please check the booking ID and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [bookingId, toast]);

  useEffect(() => {
    if (trackingData) {
      const interval = setInterval(fetchTrackingData, 30000);
      return () => clearInterval(interval);
    }
  }, [trackingData, fetchTrackingData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackingData();
  };

  const handleUpdateTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !status || !latitude || !longitude) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.put(
        `/tracking/${bookingId}`,
        {
          status,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTrackingData(response.data.data);
      toast({
        title: "Success",
        description: "Tracking information updated successfully",
      });
    } catch (error) {
      setError("Failed to update tracking data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to update tracking data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
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
            <Button type="submit" disabled={loading}>
              {loading ? "Tracking..." : "Track"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {user && user.role === "driver" && trackingData && (
        <Card>
          <CardHeader>
            <CardTitle>Update Tracking Information</CardTitle>
            <CardDescription>
              Update the current status and location for this booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateTracking} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>
              <div className="space-x-4">
                <Button type="button" onClick={getCurrentLocation}>
                  Get Current Location
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Tracking"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {trackingData && (
        <Card>
          <CardHeader>
            <CardTitle>Tracking Information</CardTitle>
            <CardDescription>Booking ID: {trackingData._id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                <Badge variant="secondary" className="capitalize">
                  {trackingData.status}
                </Badge>
              </p>
              <p>
                <strong>Current Location:</strong>{" "}
                {trackingData.currentLocation?.coordinates &&
                trackingData.currentLocation.coordinates.length > 0
                  ? trackingData.currentLocation.coordinates.join(", ")
                  : trackingData.pickupLocation}
              </p>
              <p>
                <strong>Estimated Delivery:</strong>{" "}
                {new Date(
                  new Date().getTime() +
                    (Math.floor(Math.random() * (60 - 15 + 1)) + 15) * 60000
                ).toLocaleString()}
              </p>
              <>
                <p>
                  <strong>From:</strong> {trackingData.pickupLocation}
                </p>
                <p>
                  <strong>To:</strong> {trackingData.dropoffLocation}
                </p>
              </>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(trackingData.updatedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackingComponent;
