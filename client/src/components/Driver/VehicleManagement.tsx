import React, { useState, useEffect } from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Vehicle {
  id: string;
  type: string;
  licensePlate: string;
  capacity: string;
}

export const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, "id">>({
    type: "",
    licensePlate: "",
    capacity: "",
  });

  useEffect(() => {
    // TODO: Fetch actual vehicle data from API
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        type: "Car",
        licensePlate: "ABC123",
        capacity: "4 passengers",
      },
      { id: "2", type: "Van", licensePlate: "XYZ789", capacity: "1000 kg" },
    ];
    setVehicles(mockVehicles);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setNewVehicle((prev) => ({ ...prev, type: value }));
  };

  const handleAddVehicle = () => {
    // TODO: Implement add vehicle logic and API call
    const vehicleWithId = { ...newVehicle, id: Date.now().toString() };
    setVehicles([...vehicles, vehicleWithId]);
    setNewVehicle({ type: "", licensePlate: "", capacity: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Vehicle</CardTitle>
          <CardDescription>
            Register a new vehicle for your fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Vehicle Type</Label>
              <Select onValueChange={handleTypeChange} value={newVehicle.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={newVehicle.licensePlate}
                onChange={handleInputChange}
                placeholder="Enter license plate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                value={newVehicle.capacity}
                onChange={handleInputChange}
                placeholder="Enter capacity (e.g., 4 passengers or 1000 kg)"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddVehicle}>Add Vehicle</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles</CardTitle>
          <CardDescription>Manage your registered vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.licensePlate}</TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
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
