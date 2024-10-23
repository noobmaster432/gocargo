import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import api from "../../services/api";

const BookingForm: React.FC = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const navigate = useNavigate();

  // Simulated price calculation based on vehicle type and a random distance
  const calculateEstimatedPrice = useCallback((vehicleType: string) => {
    const basePrice =
      {
        standard: 10,
        premium: 15,
        suv: 20,
      }[vehicleType] || 10;

    return basePrice * distance;
  },[distance]);

  useEffect(() => {
    if (vehicleType) {
      const price = calculateEstimatedPrice(vehicleType);
      setEstimatedPrice(price);
    }
  }, [vehicleType, calculateEstimatedPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimatedPrice) {
      toast({
        title: "Error",
        description: "Please select a vehicle type to get an estimated price.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await api.post(
        "/bookings",
        {
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          vehicleType,
          price: estimatedPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "Booking Successful",
        description: `Your booking ID is ${response.data.bookingId}`,
      });
      navigate("/rides");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Booking Failed",
        description:
          "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Book a Ride</CardTitle>
        <CardDescription>Enter your ride details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input
                id="pickup"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dropoff">Dropoff Location</Label>
              <Input
                id="dropoff"
                placeholder="Enter dropoff location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select onValueChange={setVehicleType} required>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {estimatedPrice !== null && (
              <div className="flex flex-col space-y-1.5">
                <Label>Estimated Price</Label>
                <div className="text-2xl font-bold">
                  ${estimatedPrice.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit" onClick={handleSubmit}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
