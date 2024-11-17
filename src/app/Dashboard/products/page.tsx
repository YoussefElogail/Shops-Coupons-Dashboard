"use client";
import { Box} from "@mui/material";
import { useState } from "react";
import Heading from "../DashboardSharedComponent/Heading";
import { Toaster } from "react-hot-toast";
import ProductList from "./(productComponent)/ProductsList";
import AddProductModal from "./(productComponent)/AddProductModal";
export default function ProductsPage() {
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);
  const handleAddProductClose: () => void = () => {
    setOpenAddProduct(false);
  };
  const handleAddProductOpen: () => void = () => {
    setOpenAddProduct(true);
  };
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading
        title="Products"
        handleOpen={handleAddProductOpen}
        buttonTitle="Add new product"
      />
      <ProductList />
      <AddProductModal
        open={openAddProduct}
        handleAddProductClose={handleAddProductClose}
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
