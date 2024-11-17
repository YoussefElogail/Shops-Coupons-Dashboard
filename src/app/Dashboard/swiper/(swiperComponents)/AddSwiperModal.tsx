"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Grid from "@mui/material/Unstable_Grid2";
import { FormHelperText } from "@mui/material";
import useAddSwiper from "@/app/customHooks/swiperHooks/useAddSwiper";
import { Swiper } from "@/app/types/swiperTypes";

export default function AddSwiperModal({
  open,
  handleAddSwiperClose,
}: {
  open: boolean;
  handleAddSwiperClose: () => void;
}) {
  const { handleSubmit, formState, watch, setValue } = useForm<Swiper>();
  const imageSrcAr = watch("image_ar");
  const imageSrcEn = watch("image_en");

  const handleFilePondArabicUpdate = (fileItems: any[]) => {
    setValue(
      "image_ar",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };

  const handleFilePondEnglishUpdate = (fileItems: any[]) => {
    setValue(
      "image_en",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };

  const { mutate, isSuccess } = useAddSwiper();

  const { errors, isSubmitting } = formState;

  React.useMemo(() => {
    if (isSuccess) {
      handleAddSwiperClose();
    }
  }, [isSuccess, handleAddSwiperClose]);

  const onSubmit = (data: Swiper) => {
    const formData = new FormData();
    formData.append("image_ar", data.image_ar[0]);
    formData.append("image_en", data.image_en[0]);
    mutate(formData);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddSwiperClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>Add New Image</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <FilePond
                  name="image_en"
                  files={imageSrcEn}
                  labelIdle={`Upload English image <span class="filepond--label-action"> Browse </span>`}
                  onupdatefiles={handleFilePondEnglishUpdate}
                />
                <FormHelperText error={!!errors.image_en}>
                  {errors.image_en?.message}
                </FormHelperText>
              </Grid>
              <Grid xs={12}>
                <FilePond
                  name="image_ar"
                  files={imageSrcAr}
                  labelIdle={`Upload Arabic image <span class="filepond--label-action"> Browse </span>`}
                  onupdatefiles={handleFilePondArabicUpdate}
                />
                <FormHelperText error={!!errors.image_ar}>
                  {errors.image_ar?.message}
                </FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddSwiperClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add Image
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
