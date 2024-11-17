"use client";
import dynamic from 'next/dynamic';
import { Box } from "@mui/material";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import { Toaster } from "react-hot-toast";
import useGetCategory from "@/app/customHooks/categoryHooks/useGetCategory";
import { categoryType } from "@/app/types/categoryTypes";

const AddStoreModal = dynamic(() => import('./(storeComponents)/AddStoreModal'), { ssr: false });
const StoresList = dynamic(() => import('./(storeComponents)/storesList'), { ssr: false });

export default function Store() {
  const { data } = useGetCategory();
  const categoryData: categoryType[] = data?.data.data;
  const [openAddStore, setOpenAddStore] = useState<boolean>(false);
  const handleAddStoreClose: () => void = () => {
    setOpenAddStore(false);
  };
  const handleAddStoreOpen: () => void = () => {
    setOpenAddStore(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Stores"
        handleOpen={handleAddStoreOpen}
        buttonTitle="Add new store"
      />
      <StoresList categoryData={categoryData} />
      <AddStoreModal
        open={openAddStore}
        handleAddStoreClose={handleAddStoreClose}
        categoryData={categoryData}
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
