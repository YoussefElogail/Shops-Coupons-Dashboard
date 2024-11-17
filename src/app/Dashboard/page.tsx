"use client";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import useGetStatistics from "../customHooks/statsticsHooks/useGetStatstics";
import { Statistics } from "../types/statistics";
export default function Dashboard() {
  const { data } = useGetStatistics();
  const statisticsData: Statistics = data?.data;
  const chartData = [
    { id: "Stores", value: statisticsData?.stores_count, label: "Stores" },
    { id: "Coupons", value: statisticsData?.coupons_count, label: "Coupons" },
    {
      id: "Active Coupons",
      value: statisticsData?.coupon_Active_count,
      label: "Active Coupons",
    },
    {
      id: "Categories",
      value: statisticsData?.categories_count,
      label: "Categories",
    },
  ];

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", padding: "2rem" }}>
        Dashboard Statistics
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={700}
          height={200}
        />{" "}
      </Box>
    </>
  );
}
