"use client";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import UpdateCategoryModal from "./UpdateCategoryModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useGetCategory from "@/app/customHooks/categoryHooks/useGetCategory";
import { categoryType } from "@/app/types/categoryTypes";

const categoryTitles: string[] = [
  "category name en",
  "category name ar",
  "Action",
];
const categoryTitlesList = categoryTitles.map((title) => {
  return (
    <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function CategoryList() {
  const { data, isPending } = useGetCategory();
  const categoryData: categoryType [] = data?.data.data;
  const [category, setCategory] = useState<categoryType | undefined>();

  const [openUpdateCategory, setOpenUpdateCategory] = useState<boolean>(false);

  const handleUpdateCategoryClose: () => void = () => {
    setOpenUpdateCategory(false);
  };
  const handleUpdateCategoryOpen: () => void = () => {
    setOpenUpdateCategory(true);
  };
  const [openDeleteCategory, setOpenDeleteCategory] = useState<boolean>(false);
  const handleDeleteCategoryClose: () => void = () => {
    setOpenDeleteCategory(false);
  };
  const handleDeleteCategoryOpen: () => void = () => {
    setOpenDeleteCategory(true);
  };
  const categoryList = categoryData?.map((category) => {
    return (
      <Grid
        spacing={2}
        container
        key={category.name_en}
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
          {category.name_en}
        </Grid>
        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          {category.name_ar}
        </Grid>
        <Grid xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setCategory(category);
                handleUpdateCategoryOpen();
              }}
            >
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setCategory(category);
                handleDeleteCategoryOpen();
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
        {categoryTitlesList}
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
        categoryList
      )}
      <UpdateCategoryModal
        category={category}
        open={openUpdateCategory}
        handleUpdateCategoryClose={handleUpdateCategoryClose}
      />
      <DeleteCategoryModal
        category={category}
        open={openDeleteCategory}
        handleDeleteCategoryClose={handleDeleteCategoryClose}
      />
    </Box>
  );
}
