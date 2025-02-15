/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
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
import { Vehicle } from "../../types";

const VehicleManagement: React.FC = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState({
    type: "",
    licensePlate: "",
    capacity: "",
  });

  const fetchVehicles = React.useCallback(async () => {
    try {
      const response = await api.get("/vehicles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVehicles(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch vehicles. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/vehicles", newVehicle, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast({
        title: "Vehicle Added",
        description: "Your new vehicle has been successfully added.",
      });
      fetchVehicles();
      setNewVehicle({ type: "", licensePlate: "", capacity: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add vehicle. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeVehicle = async (vehicleId: string) => {
    try {
      await api.delete(`/vehicles/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast({
        title: "Vehicle Removed",
        description: "The vehicle has been successfully removed.",
      });
      fetchVehicles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove vehicle. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Vehicle Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Vehicle</CardTitle>
          <CardDescription>
            Enter the details of your new vehicle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Vehicle Type</Label>
              <Select
                value={newVehicle.type}
                onValueChange={(value) =>
                  setNewVehicle({ ...newVehicle, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                value={newVehicle.licensePlate}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, licensePlate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={newVehicle.capacity}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, capacity: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">Add Vehicle</Button>
          </form>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-semibold mt-6">Your Vehicles</h2>
      {vehicles.map((vehicle) => (
        <Card key={vehicle._id}>
          <CardHeader>
            <CardTitle className="uppercase">{vehicle.type}</CardTitle>
            <CardDescription>
              License Plate: {vehicle.licensePlate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Capacity:</strong> {vehicle.capacity}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              onClick={() => removeVehicle(vehicle._id)}
            >
              Remove Vehicle
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VehicleManagement;
