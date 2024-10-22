export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "driver" | "admin";
}

export interface Vehicle {
  id: string;
  type: string;
  licensePlate: string;
  capacity: string;
}

export interface Booking {
  id: string;
  userId: string;
  driverId: string | null;
  pickup: string;
  dropoff: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  date: string;
  estimatedPrice: number;
}

export interface Job extends Booking {
  estimatedEarnings: number;
}

export interface TrackingData {
  id: string;
  bookingId: string;
  status: string;
  currentLocation: string;
  estimatedDelivery: string;
}
