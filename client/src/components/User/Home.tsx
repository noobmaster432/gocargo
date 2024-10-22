import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../hooks/useAuth";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Ride Sharing App</h1>
      <p className="text-xl">
        Your one-stop solution for convenient and reliable transportation.
      </p>

      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.role === "customer" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Book a Ride</CardTitle>
                  <CardDescription>Ready to go somewhere?</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Book a ride now and get to your destination safely and
                    comfortably.
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
                  <CardDescription>View your ride history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Check the status of your current and past rides.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link to="/rides">View Rides</Link>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
          {user.role === "driver" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Driver Dashboard</CardTitle>
                  <CardDescription>
                    Manage your driving activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    View and accept ride requests, update your location, and
                    manage your profile.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to="/driver/dashboard">Go to Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Management</CardTitle>
                  <CardDescription>Manage your vehicles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Add, update, or remove vehicles from your profile.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link to="/driver/vehicles">Manage Vehicles</Link>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
          {user.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Manage the entire system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access administrative tools and reports.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/admin">Go to Admin Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Track a Ride</CardTitle>
              <CardDescription>Real-time ride tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track the current location and status of any ongoing ride.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link to="/tracking">Track Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Join our community of riders and drivers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Sign up or log in to start using our ride-sharing services.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="mr-2">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Home;
