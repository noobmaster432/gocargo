# Go Cargo
## On-Demand Logistics Platform for Goods Transportation

Go Cargo is an implementation of a highly scalable logistics platform that allows users to book transportation services for moving goods. The platform connects users who need to transport items with a fleet of drivers, providing real-time availability, pricing, and tracking of vehicles.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

### User Features
- Book a vehicle for transporting goods
- Real-time tracking of driver's location
- Upfront price estimation

### Driver Features
- Receive and accept booking requests
- Update job status (e.g., pending, in progress, completed)

### Admin Features
- Fleet management
- Basic analytics

## Technology Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Deployment: Docker, Vercel

## Architecture

The system is designed to handle 10,000 requests per second, with a registered base of 100,000 drivers and 50 million users globally. It uses a microservices architecture to ensure scalability and maintainability.


### **Entities and Attributes:**

1. **User**
   - **Primary Key (PK)**: `_id` (unique identifier for each user).
   - **Attributes**:
     - `name`: The name of the user.
     - `email`: User's email address.
     - `password`: Encrypted password for authentication.
     - `role`: Defines whether the user is a customer or a driver.
     - `phone`: User’s contact number.
     - `location`: The current or registered location of the user.
     - `driverInfo`: Information relevant to the driver, such as driving license, certifications, etc. (likely relevant for users with the role "driver").

2. **Booking**
   - **Primary Key (PK)**: `_id` (unique identifier for each booking).
   - **Attributes**:
     - `pickupLocation`: Starting point of the journey.
     - `dropoffLocation`: Destination of the journey.
     - `vehicleType`: Type of vehicle requested for the booking (e.g., sedan, truck).
     - `status`: Current status of the booking (e.g., pending, active, completed).
     - `price`: The cost associated with the booking.
     - `currentLocation`: Real-time location of the vehicle during the trip.
   - **Foreign Keys (FK)**:
     - `user`: References the **User** entity, indicating the customer who made the booking.
     - `driver`: References the **User** entity, indicating the driver assigned to the booking.

3. **Vehicle**
   - **Primary Key (PK)**: `_id` (unique identifier for each vehicle).
   - **Attributes**:
     - `type`: Type of the vehicle (e.g., van, truck).
     - `licensePlate`: Vehicle's unique registration number.
     - `capacity`: The vehicle’s maximum load or passenger capacity.
   - **Foreign Key (FK)**:
     - `driver`: References the **User** entity (specifically a user with a driver role), indicating the driver who owns or is assigned to the vehicle.

### **Relationships:**

1. **User-to-Booking**:
   - There is a **1-to-Many** relationship between the **User** and **Booking** entities:
     - A single **User** (acting as a **customer**) can make many bookings.
     - A single **User** (acting as a **driver**) can be assigned to multiple bookings.

2. **User-to-Vehicle**:
   - There is a **1-to-1** relationship between the **User** (with the **role** of a driver) and **Vehicle** entities:
     - Each **driver** owns or is assigned to exactly one **Vehicle**.

### Summary of Relationships:
- **User (customer)** to **Booking**: One user can create many bookings.
- **User (driver)** to **Booking**: One driver can handle many bookings.
- **User (driver)** to **Vehicle**: One driver owns or is assigned exactly one vehicle.

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/noobmaster432/gocargo.git
   cd gocargo
   ```

2. Set up environment variables:
   Create a `.env` file in the client and server directory and add the following:
   ```
   #server
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URI=frontend_url
   PORT=preferred_port
   ```
   ```
   #client
   VITE_BACKEND_URI=backend_url
   ```

3. Run Docker Compose
   ```
   docker-compose up --build
   ```

4. Stopping the application
   ```
   docker-compose down
   ```

5. Rebuild the containers
   ```
   docker-compose up --build
   ```

## Usage

To use the **Go Cargo** application, follow these steps:

1. **Access the application:**
   - Visit [http://localhost:5173](http://localhost:5173) to open the frontend interface.
   - Depending on your role (Customer, Driver, or Admin), log in using the credentials provided below.

2. **Login Credentials for Testing:**

   - **Customer (Grahak):**
     - Email: `grahak@gmail.com`
     - Password: `password`
   
   - **Driver (Vahak):**
     - Email: `vahak@gmail.com`
     - Password: `password`
   
   - **Admin:**
     - Email: `admin@gmail.com`
     - Password: `password`

3. **Testing Features:**

   - **Customer (Grahak):**
     - Book a vehicle to transport goods.
     - Track the driver’s location in real-time once a booking is made.
   
   - **Driver (Vahak):**
     - View and accept booking requests.
     - Update job status (e.g., pending, in progress, completed).
   
   - **Admin:**
     - Manage the fleet of vehicles and view booking statistics.
     - Access basic analytics.

Make sure to explore each role to test the application's different functionalities.

## Future Improvements

- Implement surge pricing
- Add support for scheduled future bookings
- Enhance analytics dashboard for admins

## License

This project is licensed under the MIT License.

---
