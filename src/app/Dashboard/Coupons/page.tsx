"use client";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import CouponsList from "./(couponsComponents)/CouponsList";
import AddCouponModal from "./(couponsComponents)/AddCouponModal";
import { Toaster } from "react-hot-toast";
export default function CouponsPage() {
  const [openAddCoupon, setOpenAddCoupon] = useState<boolean>(false);
  const handleAddCouponClose: () => void = () => {
    setOpenAddCoupon(false);
  };
  const handleAddCouponOpen: () => void = () => {
    setOpenAddCoupon(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Coupons"
        handleOpen={handleAddCouponOpen}
        buttonTitle="Add new coupon"
      />
      <CouponsList />
      <AddCouponModal
        open={openAddCoupon}
        handleAddCouponClose={handleAddCouponClose}
      />
      <Toaster
        toastOptions={{
          position: "bottom-left",
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </Box>
  );
}
