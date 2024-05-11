"use client";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DirectionsCar, LocalShipping, TwoWheeler } from "@mui/icons-material";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getStatistics } from "@/api";
import { Card } from "@/components";

const Statistics = () => {
  const { data, isPending } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });

  if (isPending) {
    return <CircularProgress />;
  }

  if (!data) {
    return (
      <Typography variant="h1" className="text-center">
        Unable to load statistics
      </Typography>
    );
  }

  const { drivers, vehicles, shipments, orders } = data;

  const COLORS = ["red", "blue", "green", "purple", "brown"];

  return (
    <Box className="mt-4">
      <Box className="grid sm:grid-cols-2 gap-3 2xl:grid-cols-4">
        <Card
          title="Active Drivers"
          value={drivers?.activeDrivers}
          title2="Total Drivers"
          value2={drivers?.totalDrivers}
        />

        <Card
          title="Total Vehicles"
          value={vehicles?.totalVehicles}
          title2="Vehicle breakdown"
          value2={
            <Box className="flex items-center justify-evenly">
              <Box className="flex items-center">
                <Typography className="mr-2 font-semibold text-xl">
                  {vehicles?.totalVans}
                </Typography>
                <LocalShipping />
              </Box>
              <Box className="flex items-center">
                <Typography className="mr-2 font-semibold text-xl">
                  {vehicles?.totalCars}
                </Typography>
                <DirectionsCar />
              </Box>
              <Box className="flex items-center">
                <Typography className="mr-2 font-semibold text-xl">
                  {vehicles?.totalBikes}
                </Typography>
                <TwoWheeler />
              </Box>
            </Box>
          }
        />

        <Card
          title="Ongoing Shipments"
          value={shipments?.inProgress}
          title2="TCompleted shipments"
          value2={shipments?.completed}
        />

        <Card title="Revenue" value={`₦${orders?.revenue.toLocaleString()}`} />
      </Box>

      <Box className="grid sm:grid-cols-2 gap-3 mt-10">
        <Box className="shadow-md rounded-md w-full h-96 p-10 bg-white dark:bg-gray-800">
          <Typography className="font-semibold">Top shipments</Typography>

          <ResponsiveContainer>
            <BarChart data={shipments.topShipments}>
              <XAxis dataKey="name" />
              <YAxis min={1} />
              <Bar dataKey="count" fill="#8884d8" width={10} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box className="shadow-md rounded-md w-full h-96 p-10 bg-white dark:bg-gray-800">
          <Typography className="font-semibold">Top destinations</Typography>

          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={shipments.popularDestinations}
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="count"
                legendType="circle"
              >
                {shipments.popularDestinations.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box className="mt-10 shadow-md rounded-md w-full h-96 p-10 bg-white dark:bg-gray-800">
        <Typography className="font-semibold">Shipped Orders</Typography>

        <ResponsiveContainer>
          <AreaChart
            data={orders.ordersOverTime}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="count" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Statistics;
