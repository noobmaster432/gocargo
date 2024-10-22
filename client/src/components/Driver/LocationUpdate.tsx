/* eslint-disable @typescript-eslint/no-explicit-any */
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

const LocationUpdate: React.FC = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentBooking, setCurrentBooking] = useState<any>(null);

  useEffect(() => {
    fetchCurrentBooking();
  }, []);

  const fetchCurrentBooking = async () => {
    try {
      const response = await api.get("/driver/current-booking");
      setCurrentBooking(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch current booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/driver/update-location", { latitude, longitude });
      toast({
        title: "Location Updated",
        description: "Your location has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update location. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Update Location</h1>
      {currentBooking && (
        <Card>
          <CardHeader>
            <CardTitle>Current Booking</CardTitle>
            <CardDescription>Booking ID: {currentBooking.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>From:</strong> {currentBooking.pickup}
            </p>
            <p>
              <strong>To:</strong> {currentBooking.dropoff}
            </p>
            <p>
              <strong>Status:</strong> {currentBooking.status}
            </p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Update Your Location</CardTitle>
          <CardDescription>
            Enter your current coordinates or use GPS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={getCurrentLocation}
            >
              Get Current Location
            </Button>
            <Button type="submit" className="w-full">
              Update Location
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationUpdate;
