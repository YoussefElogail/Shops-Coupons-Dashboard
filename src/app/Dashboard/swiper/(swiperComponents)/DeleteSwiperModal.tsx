"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { receivedSwiper } from "@/app/types/swiperTypes";
import useDeleteSwiper from "@/app/customHooks/swiperHooks/useDeleteSwiper";
export default function DeleteSwiperModal({
  swiper,
  open,
  handleDeleteSwiperClose,
}: {
  swiper: receivedSwiper | undefined;
  open: boolean;
  handleDeleteSwiperClose: () => void;
}) {
  const { mutate, isSuccess } = useDeleteSwiper(swiper?.id);
  React.useMemo(() => {
    if (isSuccess) {
      handleDeleteSwiperClose();
    }
  }, [isSuccess]);
  return (
    <Dialog
      open={open}
      onClose={handleDeleteSwiperClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Dele image</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this image ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteSwiperClose}>Cancel</Button>
        <Button
          onClick={() => {
            mutate();
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
