"use client";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteCouponModal from "./DeleteCouponModal";
import UpdateCouponModal from "./UpdateCouponModal";
import { ReceivedCouponType } from "@/app/types/couponTypes";
import useGetCoupon from "@/app/customHooks/couponHooks/useGetCoupon";
const couponsTitles: string[] = [
  "store name",
  "couponTitle",
  "Code",
  "Feature",
  "status",
  "Action",
];
const couponsTitlesList = couponsTitles.map((title) => {
  return (
    <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});
export default function CouponsList() {
  const [coupon, setCoupon] = useState<ReceivedCouponType>({
    id: 0,
    title_ar: "",
    title_en: "",
    code: "",
    status: false,
    featured: false,
    start_date: new Date(),
    end_date: new Date(),
    store_id: 0,
    store_name_en: "",
    flag_code: [""],
  });
  const { data, isPending } = useGetCoupon();
  const couponData: ReceivedCouponType[] = data?.data.data;
  const couponsList = couponData?.map((coupon) => {
    return (
      <Grid
        spacing={2}
        container
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0",
          color: "primary.main",
          margin: "1rem 0",
        }}
        key={coupon.title_en}
      >
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {coupon.store_name_en}
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {coupon.title_en}
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {coupon.code}
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {coupon.featured ? "featured" : "not-featured"}
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {coupon.status ? "active" : "in active"}
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setCoupon(coupon);
                handleUpdateCouponOpen();
              }}
            >
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setCoupon(coupon);
                handleDeleteCouponOpen();
              }}
            >
              <DeleteIcon sx={{ color: "#d50000" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  });
  console.log(couponsList?.length);
  const [openUpdateCoupon, setOpenUpdateCoupon] = useState<boolean>(false);
  const handleUpdateCouponClose: () => void = () => {
    setOpenUpdateCoupon(false);
  };
  const handleUpdateCouponOpen: () => void = () => {
    setOpenUpdateCoupon(true);
  };
  const [openDeleteCoupon, setOpenDeleteCoupon] = useState<boolean>(false);
  const handleDeleteCouponClose: () => void = () => {
    setOpenDeleteCoupon(false);
  };
  const handleDeleteCouponOpen: () => void = () => {
    setOpenDeleteCoupon(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Grid
        spacing={2}
        container
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 0",
          margin: "1rem 0",
        }}
      >
        {couponsTitlesList}
      </Grid>
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        couponsList
      )}
      <UpdateCouponModal
        coupon={coupon}
        open={openUpdateCoupon}
        handleUpdateCouponClose={handleUpdateCouponClose}
      />
      <DeleteCouponModal
        coupon={coupon}
        open={openDeleteCoupon}
        handleDeleteCouponClose={handleDeleteCouponClose}
      />
    </Box>
  );
}
