"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import AddCategoryModal from "./(categoryComponents)/AddCategoryModal";
import CategoryList from "./(categoryComponents)/CategoryList";
import { Toaster } from "react-hot-toast";
export default function CategoryPage() {

  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const handleAddCategoryClose: () => void = () => {
    setOpenAddCategory(false);
  };
  const handleAddCategoryOpen: () => void = () => {
    setOpenAddCategory(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Category"
        handleOpen={handleAddCategoryOpen}
        buttonTitle="Add new category"
      />
      <CategoryList />
      <AddCategoryModal
        open={openAddCategory}
        handleAddCategoryClose={handleAddCategoryClose}
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
