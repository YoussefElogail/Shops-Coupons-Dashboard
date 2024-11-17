"use client";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteProductModal from "./DeleteProductModal";
import UpdateProductModal from "./UpdateProductModal";
import Image from "next/image";
import useGetProduct from "@/app/customHooks/productHooks/useGetHooks";
import { ReceivedProductType } from "@/app/types/productTypes";

const productsTitles: string[] = ["title", "store name", "image", "Action"];
const categoryTitlesList = productsTitles.map((title) => {
  return (
    <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function ProductsList() {
  const { data, isPending } = useGetProduct();
  const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState<boolean>(false);

  const handleUpdateProductClose: () => void = () => {
    setOpenUpdateProduct(false);
  };
  const handleUpdateProductOpen: () => void = () => {
    setOpenUpdateProduct(true);
  };
  const handleDeleteProductClose: () => void = () => {
    setOpenDeleteProduct(false);
  };
  const handleDeleteProductOpen: () => void = () => {
    setOpenDeleteProduct(true);
  };
  const productData: ReceivedProductType[] = data?.data.data;
  const [product, setProduct] = useState<ReceivedProductType | undefined>();
  const productList = productData?.map((product) => {
    return (
      <Grid
        spacing={2}
        container
        key={product.title_en}
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
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          {product.title_en}
        </Grid>
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          {product.store_name_en}
        </Grid>
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={`${product.image}`}
            width={100}
            height={50}
            alt="product image"
          />{" "}
        </Grid>
        <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setProduct(product);
                handleUpdateProductOpen();
              }}
            >
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setProduct(product);
                handleDeleteProductOpen();
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
            height: "80vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        productList
      )}

      <DeleteProductModal
        product={product}
        open={openDeleteProduct}
        handleDeleteProductClose={handleDeleteProductClose}
      />
      <UpdateProductModal
        product={product}
        open={openUpdateProduct}
        handleUpdateProductClose={handleUpdateProductClose}
      />
    </Box>
  );
}
