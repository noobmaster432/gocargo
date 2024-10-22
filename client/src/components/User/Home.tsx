import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Logistics Platform
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Book a Ride</CardTitle>
            <CardDescription>
              Schedule transportation for your goods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Quick and easy booking process for all your transportation needs.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/book">Book Now</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Rides</CardTitle>
            <CardDescription>View and manage your bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Keep track of all your past and upcoming rides.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/rides">View Rides</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Track Shipment</CardTitle>
            <CardDescription>Real-time tracking of your goods</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get live updates on the location of your shipment.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/tracking">Track Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
