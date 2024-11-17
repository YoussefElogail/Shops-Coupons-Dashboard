"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReceivedCouponType } from "@/app/types/couponTypes";
import useDeleteCoupon from "@/app/customHooks/couponHooks/useDeleteCoupon";
export default function DeleteCouponModal({
  coupon,
  open,
  handleDeleteCouponClose,
}: {
    coupon: ReceivedCouponType;
  open: boolean;
  handleDeleteCouponClose: () => void;
}) {
  const { mutate, isSuccess } = useDeleteCoupon(coupon.id);
  React.useMemo(() => {
    if (isSuccess) {
      handleDeleteCouponClose();
    }
  }, [isSuccess]);
  return (
    <Dialog
      open={open}
      onClose={handleDeleteCouponClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Delete Coupon</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Coupon ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCouponClose}>Cancel</Button>
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
