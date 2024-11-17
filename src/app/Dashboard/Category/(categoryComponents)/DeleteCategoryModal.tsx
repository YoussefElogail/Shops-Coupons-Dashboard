"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { categoryType } from "@/app/types/categoryTypes";
import useDeleteCategory from "@/app/customHooks/categoryHooks/useDeleteCategory";
export default function DeleteCategoryModal({
  category,
  open,
  handleDeleteCategoryClose,
}: {
  category: categoryType | undefined;
  open: boolean;
  handleDeleteCategoryClose: () => void;
}) {
  const { mutate, isSuccess } = useDeleteCategory(category?.id);
  React.useMemo(() => {
    if (isSuccess) {
      handleDeleteCategoryClose();
    }
  }, [isSuccess]);
  return (
    <Dialog
      open={open}
      onClose={handleDeleteCategoryClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Dele Category</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Category ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCategoryClose}>Cancel</Button>
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
