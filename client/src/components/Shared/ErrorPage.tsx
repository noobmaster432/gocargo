import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>An unexpected error has occurred.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            We're sorry, but something went wrong. Please try again later or
            contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
