import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TrackingData {
  id: string;
  status: string;
  currentLocation: string;
  estimatedDelivery: string;
}

export const TrackingComponent: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const handleTrack = () => {
    // TODO: Implement actual tracking logic and API call
    const mockTrackingData: TrackingData = {
      id: trackingId,
      status: "In Transit",
      currentLocation: "Chicago, IL",
      estimatedDelivery: "2023-05-15",
    };
    setTrackingData(mockTrackingData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Track Your Shipment</CardTitle>
          <CardDescription>
            Enter your tracking ID to get real-time updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Input
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your tracking ID"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrack}>Track</Button>
              </div>
            </div>
            {trackingData && (
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong> {trackingData.status}
                </p>
                <p>
                  <strong>Current Location:</strong>{" "}
                  {trackingData.currentLocation}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong>{" "}
                  {trackingData.estimatedDelivery}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
