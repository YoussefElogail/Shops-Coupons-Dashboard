"use client";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteSwiperModal from "./DeleteSwiperModal";
import useGetSwiper from "@/app/customHooks/swiperHooks/useGetSwiper";
import { receivedSwiper } from "@/app/types/swiperTypes";
import Image from "next/image";
const swiperTitles: string[] = ["image_en","image_ar", "Action"];
const swiperTitlesList = swiperTitles.map((title) => {
  return (
    <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function CategoryList() {
  const { data, isPending } = useGetSwiper();
  const swiperData: receivedSwiper[] = data?.data.data;

  const [swiper, setSwiper] = useState<receivedSwiper | undefined>();


  const [openDeleteSwiper, setOpenDeleteSwiper] = useState<boolean>(false);
  const handleDeleteSwiperClose: () => void = () => {
    setOpenDeleteSwiper(false);
  };
  const handleDeleteSwiperOpen: () => void = () => {
    setOpenDeleteSwiper(true);
  };
  const swiperList = swiperData?.map((swiper, index) => {
    return (
      <Grid
        spacing={2}
        container
        key={index}
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
      >
        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={`${swiper.image_en}`}
            width={100}
            height={50}
            alt="swiper image"
          />
        </Grid>
        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={`${swiper.image_ar}`}
            width={100}
            height={50}
            alt="swiper image"
          />
        </Grid>
        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
  
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setSwiper(swiper);
                handleDeleteSwiperOpen();
              }}
            >
              <DeleteIcon sx={{ color: "#d50000" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  });
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
        {swiperTitlesList}
      </Grid>
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        swiperList
      )}

      <DeleteSwiperModal
        swiper={swiper}
        open={openDeleteSwiper}
        handleDeleteSwiperClose={handleDeleteSwiperClose}
      />
    </Box>
  );
}
