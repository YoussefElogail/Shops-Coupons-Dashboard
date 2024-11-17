"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";

import Grid from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import useGetStore from "@/app/customHooks/storeHooks/useGetStore";
import { ReceivedStoreType } from "@/app/types/storeTypes";
import { ReceivedCouponType, couponType } from "@/app/types/couponTypes";
import useUpdatedCoupon from "@/app/customHooks/couponHooks/useUpdateCoupon";

export default function UpdateCouponModal({
  coupon,
  open,
  handleUpdateCouponClose,
}: {
  coupon: ReceivedCouponType;
  open: boolean;
  handleUpdateCouponClose: () => void;
}) {
  const { data } = useGetStore();
  const storesData: ReceivedStoreType[] = data?.data.data;
  const storeList = storesData?.map((store) => {
    return <MenuItem value={store.id}>{store.name_en}</MenuItem>;
  });
  const countries: { flag_code: string }[] = [
    {
      flag_code: "EG",
    },
    {
      flag_code: "SA",
    },
    {
      flag_code: "QA",
    },
    {
      flag_code: "OM",
    },
    {
      flag_code: "KW",
    },
    {
      flag_code: "AE",
    },
    {
      flag_code: "BH",
    },
    {
      flag_code: "WW",
    },
  ];

  const flagList = countries.map((country) => {
    return <MenuItem value={country.flag_code}>{country.flag_code}</MenuItem>;
  });
  const { register, control, handleSubmit, formState, reset } =
    useForm<couponType>();
  const { errors, isSubmitting } = formState;
  const { mutate, isSuccess } = useUpdatedCoupon(coupon.id);
  const onSubmit = (data: couponType) => {
    mutate(data);
  };
  React.useEffect(() => {
    if (coupon) {
      reset({
        title_ar: coupon.title_ar,
        title_en: coupon.title_en,
        code: coupon.code,
        status: coupon.status,
        featured: coupon.featured,
        start_date: coupon.start_date,
        end_date: coupon.end_date,
        store_id: coupon.store_id,
      });
    }
    {
    }
  }, [reset, coupon]);
  React.useMemo(() => {
    if (isSuccess) {
      handleUpdateCouponClose();
    }
  }, [isSuccess]);
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleUpdateCouponClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>
          Update New Coupon
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                {" "}
                <TextField
                  fullWidth
                  multiline
                  id="coupon title in english"
                  label="coupon title in english"
                  type="text"
                  variant="outlined"
                  {...register("title_en", {
                    required: "category Name  is required",
                  })}
                  error={!!errors.title_en}
                  helperText={errors.title_en?.message}
                />
              </Grid>{" "}
              <Grid xs={12} md={6}>
                {" "}
                <TextField
                  fullWidth
                  multiline
                  id="coupon title in arabic"
                  label="coupon title in arabic"
                  type="text"
                  variant="outlined"
                  {...register("title_ar", {
                    required: "coupon Name  is required",
                  })}
                  error={!!errors.title_ar}
                  helperText={errors.title_ar?.message}
                />
              </Grid>{" "}
              <Grid xs={12}>
                <TextField
                  fullWidth
                  id="coupon code"
                  label="coupon code"
                  type="text"
                  variant="outlined"
                  {...register("code", {
                    required: "coupon code is required",
                  })}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Grid xs={12} md={6}></Grid>
                <input
                  type="date"
                  style={{ padding: "0.5rem", width: "100%" }}
                  {...register("start_date")}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <input
                  type="date"
                  style={{ padding: "0.5rem", width: "100%" }}
                  {...register("end_date")}
                />
              </Grid>
              <Grid xs={12}>
                {" "}
                <FormControl fullWidth>
                  <InputLabel id="category-label">store</InputLabel>
                  <Select
                    labelId="store-label"
                    id="store-select"
                    label="store"
                    defaultValue={coupon.store_id}
                    {...register("store_id", {
                      required: "Store  is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.store_id}
                  >
                    {storeList}
                  </Select>
                  <FormHelperText error>
                    {errors.store_id?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Controller
                    name="flag_code"
                    control={control}
                    defaultValue={coupon.flag_code}
                    render={({ field }) => (
                      <Select
                        labelId="country-label"
                        id="country-select"
                        multiple
                        label="Country"
                        {...field}
                        error={!!errors.flag_code}
                      >
                        {flagList}
                      </Select>
                    )}
                  />
                  <FormHelperText error>
                    {errors.flag_code?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked={coupon.status} />}
                  label="Status"
                  {...register("status")}
                />
              </Grid>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                  control={<Switch defaultChecked={coupon.featured} />}
                  label="Featured"
                  {...register("featured")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateCouponClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Update Coupon
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
