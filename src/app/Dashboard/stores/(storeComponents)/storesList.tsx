"use client";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { categoryType } from "@/app/types/categoryTypes";
import useGetStore from "@/app/customHooks/storeHooks/useGetStore";
import { ReceivedStoreType } from "@/app/types/storeTypes";
import UpdatedStoreModal from "./UpdateStoreModal";
import DeleteStoreModal from "./DeleteStoreModal";

const storesTitles: string[] = ["name", "image", "Feature", "status", "Action"];
const storesTitlesList = storesTitles.map((title) => {
  return (
    <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function StoresList({
  categoryData,
}: {
  categoryData: categoryType[];
}) {
  const { data, isPending } = useGetStore();
  const storesData: ReceivedStoreType[] = data?.data.data;
  const [store, setStore] = useState<ReceivedStoreType | undefined>(undefined);
  const [openUpdateStore, setOpenUpdateStore] = useState<boolean>(false);
  const handleUpdateStoreClose: () => void = () => {
    setOpenUpdateStore(false);
  };
  const handleUpdateStoreOpen: () => void = () => {
    setOpenUpdateStore(true);
  };
  const [openDeleteStore, setOpenDeleteStore] = useState<boolean>(false);
  const handleDeleteStoreClose: () => void = () => {
    setOpenDeleteStore(false);
  };
  const handleDeleteStoreOpen: () => void = () => {
    setOpenDeleteStore(true);
  };
  const storesList = storesData?.map((store) => {
    return (
      <Grid
        key={store.name_en}
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
      >
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {store.name_en}
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={`${store.image}`}
            width={100}
            height={50}
            alt="store image"
          />
        </Grid>
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {store.featured}
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          {store.status}
        </Grid>{" "}
        <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setStore(store);
                handleUpdateStoreOpen();
              }}
            >
              <EditIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setStore(store);
                handleDeleteStoreOpen();
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
        {storesTitlesList}
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
        storesList
      )}
      <UpdatedStoreModal
        store={store}
        open={openUpdateStore}
        handleUpdatedStoreClose={handleUpdateStoreClose}
        categoryData={categoryData}
      />
      <DeleteStoreModal
        store={store}
        open={openDeleteStore}
        handleDeleteStoreClose={handleDeleteStoreClose}
      />
    </Box>
  );
}
