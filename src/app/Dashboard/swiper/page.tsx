"use client";
import { Box} from "@mui/material";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import AddSwiperModal from "./(swiperComponents)/AddSwiperModal";
import SwiperList from "./(swiperComponents)/SwiperList";
import { Toaster } from "react-hot-toast";
export default function SwiperPage() {

  const [openAddSwiper, setOpenAddSwiper] = useState<boolean>(false);
  const handleAddSwiperClose: () => void = () => {
    setOpenAddSwiper(false);
  };
  const handleAddSwiperOpen: () => void = () => {
    setOpenAddSwiper(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Swiper"
        handleOpen={handleAddSwiperOpen}
        buttonTitle="Add Image To slider"
      />
      <SwiperList />
      <AddSwiperModal
        open={openAddSwiper}
        handleAddSwiperClose={handleAddSwiperClose}
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
