"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useDeleteStore from "@/app/customHooks/storeHooks/useDeleteStore";
import { ReceivedStoreType } from "@/app/types/storeTypes";

export default function DeleteStoreModal({
  store,
  open,
  handleDeleteStoreClose,
}: {
  store: ReceivedStoreType | undefined;
  open: boolean;
  handleDeleteStoreClose: () => void;
}) {
  const { mutate, isSuccess } = useDeleteStore(store?.id);
  React.useMemo(() => {
    if (isSuccess) {
      handleDeleteStoreClose();
    }
  }, [isSuccess]);
  return (
    <Dialog
      open={open}
      onClose={handleDeleteStoreClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Dele Store</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this store ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteStoreClose}>Cancel</Button>
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
