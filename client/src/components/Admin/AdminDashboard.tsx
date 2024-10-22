/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { fetchAdminDashboardData } from "../../services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import DashboardCard from "../Shared/DashboardCard";
import DataTable from "../Shared/DataTable";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(), 20),
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdminDashboardData(dateRange);
      setDashboardData(data);
    };
    fetchData();
  }, [dateRange]);

  if (!dashboardData) return <div>Loading...</div>;

  const revenueChartData = {
    labels: dashboardData.revenueAnalytics.map((data: any) =>
      new Date(data._id).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Daily Revenue",
        data: dashboardData.revenueAnalytics.map(
          (data: any) => data.totalRevenue
        ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const bookingStatusData = {
    labels: ["Pending", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          dashboardData.bookings.filter((b: any) => b.status === "pending")
            .length,
          dashboardData.bookings.filter((b: any) => b.status === "completed")
            .length,
          dashboardData.bookings.filter((b: any) => b.status === "cancelled")
            .length,
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <DatePickerWithRange date={dateRange} setDate={setDateRange} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Users"
              value={dashboardData.userCount}
            />
            <DashboardCard
              title="Total Drivers"
              value={dashboardData.driverCount}
            />
            <DashboardCard
              title="Total Bookings"
              value={dashboardData.bookingCount}
            />
            <DashboardCard
              title="Total Revenue"
              value={`$${dashboardData.totalRevenue.toFixed(2)}`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={revenueChartData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Booking Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={bookingStatusData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <DataTable
            data={dashboardData.users}
            columns={[
              { header: "Username", accessorKey: "username" },
              { header: "Email", accessorKey: "email" },
              { header: "Role", accessorKey: "role" },
              { header: "Created At", accessorKey: "createdAt" },
            ]}
          />
        </TabsContent>

        <TabsContent value="drivers">
          <DataTable
            data={dashboardData.drivers}
            columns={[
              { header: "Username", accessorKey: "username" },
              { header: "Email", accessorKey: "email" },
              { header: "License Number", accessorKey: "licenseNumber" },
              { header: "Experience (Years)", accessorKey: "experienceYears" },
              { header: "Available", accessorKey: "isAvailable" },
            ]}
          />
        </TabsContent>

        <TabsContent value="bookings">
          <DataTable
            data={dashboardData.bookings}
            columns={[
              { header: "ID", accessorKey: "_id" },
              { header: "User", accessorKey: "user.username" },
              { header: "Driver", accessorKey: "driver.username" },
              { header: "Status", accessorKey: "status" },
              { header: "Price", accessorKey: "price" },
              { header: "Created At", accessorKey: "createdAt" },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
