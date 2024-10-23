export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "driver" | "admin";
}

export interface Vehicle {
  _id: string;
  type: string;
  licensePlate: string;
  capacity: string;
}

export interface Booking {
  _id: string;
  userId: string;
  driverId: string | null;
  pickupLocation: string;
  dropoffLocation: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  price: number;
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
