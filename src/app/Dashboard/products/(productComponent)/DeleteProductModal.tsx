"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReceivedProductType } from "@/app/types/productTypes";
import useDeleteProduct from "@/app/customHooks/productHooks/useDeleteProduct";

export default function DeleteProductModal({
  product,
  open,
  handleDeleteProductClose,
}: {
  product: ReceivedProductType | undefined;
  open: boolean;
  handleDeleteProductClose: () => void;
}) {
  const { mutate, isSuccess } = useDeleteProduct(product?.id);
  React.useMemo(() => {
    if (isSuccess) {
      handleDeleteProductClose();
    }
  }, [isSuccess]);
  return (
    <Dialog
      open={open}
      onClose={handleDeleteProductClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Product ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteProductClose}>Cancel</Button>
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
