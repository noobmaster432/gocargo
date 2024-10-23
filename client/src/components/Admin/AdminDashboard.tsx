/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { fetchAdminDashboardData } from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 9, 1),
    to: addDays(new Date(), 20),
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAdminDashboardData(dateRange);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 5000);
        // setIsLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  const revenueChartData = {
    labels:
      dashboardData?.revenueAnalytics.map((data: any) =>
        new Date(data._id).toLocaleDateString()
      ) || [],
    datasets: [
      {
        label: "Daily Revenue",
        data:
          dashboardData?.revenueAnalytics.map(
            (data: any) => data.totalRevenue
          ) || [],
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
          dashboardData?.bookings.filter((b: any) => b.status === "pending")
            .length || 0,
          dashboardData?.bookings.filter((b: any) => b.status === "completed")
            .length || 0,
          dashboardData?.bookings.filter((b: any) => b.status === "cancelled")
            .length || 0,
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="space-y-6 mx-6">
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
            {isLoading ? (
              <>
                <Skeleton className="bg-white h-28 w-80" />
                <Skeleton className="bg-white h-28 w-80" />
                <Skeleton className="bg-white h-28 w-80" />
                <Skeleton className="bg-white h-28 w-80" />
              </>
            ) : (
              <>
                <DashboardCard
                  title="Total Users"
                  value={dashboardData?.userCount}
                />
                <DashboardCard
                  title="Total Drivers"
                  value={dashboardData?.driverCount}
                />
                <DashboardCard
                  title="Total Bookings"
                  value={dashboardData?.bookingCount}
                />
                <DashboardCard
                  title="Total Revenue"
                  value={`${dashboardData?.totalRevenue.toFixed(2)}`}
                />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <Line data={revenueChartData} />
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Booking Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <Bar data={bookingStatusData} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <DataTable
            data={dashboardData?.users}
            isLoading={isLoading}
            columns={[
              { header: "Username", accessorKey: "name" },
              { header: "Email", accessorKey: "email" },
              { header: "Role", accessorKey: "role" },
              {
                header: "Created At",
                accessorKey: "createdAt",
                cell: ({ row }) => {
                  const createdAt = new Date(row.createdAt);
                  return isNaN(createdAt.getTime())
                    ? "Invalid Date"
                    : format(createdAt, "PPpp");
                },
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="drivers">
          <DataTable
            data={dashboardData?.drivers}
            isLoading={isLoading}
            columns={[
              { header: "Username", accessorKey: "name" },
              { header: "Email", accessorKey: "email" },
              { header: "Vehicle Type", accessorKey: "driverInfo.type" },
              {
                header: "License Plate",
                accessorKey: "driverInfo.licensePlate",
              },
              {
                header: "Vehicle Capacity",
                accessorKey: "driverInfo.capacity",
              },
              {
                header: "Created At",
                accessorKey: "createdAt",
                cell: ({ row }) => {
                  const createdAt = new Date(row.createdAt);
                  return isNaN(createdAt.getTime())
                    ? "Invalid Date"
                    : format(createdAt, "PPpp");
                },
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="bookings">
          <DataTable
            data={dashboardData?.bookings}
            isLoading={isLoading}
            columns={[
              { header: "Booking ID", accessorKey: "_id" },
              {
                header: "User",
                accessorKey: "user.name",
                cell: ({ row }) => row.user?.name || row.user?.email,
              },
              {
                header: "Driver",
                accessorKey: "driver.name",
                cell: ({ row }) =>
                  row.driver ? row.driver.name || row.driver.email : "N/A",
              },
              { header: "Status", accessorKey: "status" },
              {
                header: "Price",
                accessorKey: "price",
                cell: ({ row }) => `$${row.price.toFixed(2)}`,
              },
              { header: "Pickup", accessorKey: "pickupLocation" },
              { header: "Dropoff", accessorKey: "dropoffLocation" },
              {
                header: "Created At",
                accessorKey: "createdAt",
                cell: ({ row }) => {
                  const createdAt = new Date(row.createdAt);
                  return isNaN(createdAt.getTime())
                    ? "Invalid Date"
                    : format(createdAt, "PPpp");
                },
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
