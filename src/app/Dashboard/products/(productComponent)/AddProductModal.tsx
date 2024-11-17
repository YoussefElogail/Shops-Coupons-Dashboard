"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Grid from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useGetStore from "@/app/customHooks/storeHooks/useGetStore";
import { ReceivedStoreType } from "@/app/types/storeTypes";
import { productType } from "@/app/types/productTypes";
import useAddProduct from "@/app/customHooks/productHooks/useAddProduct";

export default function AddProductModal({
  open,
  handleAddProductClose,
}: {
  open: boolean;
  handleAddProductClose: () => void;
}) {
  const { data } = useGetStore();
  const storesData: ReceivedStoreType[] = data?.data.data;
  const storeList = storesData?.map((store) => {
    return <MenuItem value={store.id}>{store.name_en}</MenuItem>;
  });
  const { register, control, handleSubmit, formState, watch, setValue } =
    useForm<productType>();
  const { errors, isSubmitting } = formState;
  const imageSrc = watch("image");
  const handleFilePondUpdate = (fileItems: any[]) => {
    setValue(
      "image",
      fileItems.map((fileItem) => fileItem.file),
      { shouldValidate: true }
    );
  };
  React.useEffect(() => {
    register("image", { required: "Image upload is required" });
  }, [register]);
  const { mutate, isSuccess } = useAddProduct();
  const onSubmit = (data: productType) => {
    const formData = new FormData();
    formData.append("title_en", data.title_en);
    formData.append("title_ar", data.title_ar);
    formData.append("description_en", data.description_en);
    formData.append("description_ar", data.description_ar);
    formData.append("link_en", data.link_en);
    formData.append("link_ar", data.link_ar);
    formData.append("store_id", data.store_id.toString());
    formData.append("image", data.image[0]);
    mutate(formData);
  };
  React.useMemo(() => {
    if (isSuccess) {
      handleAddProductClose();
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleAddProductClose} fullWidth>
        <DialogTitle sx={{ color: "primary.main" }}>
          Add New Product
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="product title in english"
                  label="product title in english"
                  type="text"
                  variant="outlined"
                  {...register("title_en", {
                    required: "product title  is required",
                  })}
                  error={!!errors.title_en}
                  helperText={errors.title_en?.message}
                />
              </Grid>
              <Grid xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="product title in arabic"
                  label="product title in arabic"
                  type="text"
                  variant="outlined"
                  {...register("title_ar", {
                    required: "product title  is required",
                  })}
                  error={!!errors.title_ar}
                  helperText={errors.title_ar?.message}
                />
              </Grid>
              <Grid xs={12} lg={6}>
                <TextField
                  fullWidth
                  multiline
                  id="product description in english"
                  label="product description in english"
                  type="text"
                  variant="outlined"
                  {...register("description_en", {
                    required: "product description  is required",
                    minLength: {
                      value: 20,
                      message: "minimum length is 20 character",
                    },
                  })}
                  error={!!errors.description_en}
                  helperText={errors.description_en?.message}
                />
              </Grid>{" "}
              <Grid xs={12} lg={6}>
                <TextField
                  fullWidth
                  multiline
                  id="product description in arabic"
                  label="product description in arabic"
                  type="text"
                  variant="outlined"
                  {...register("description_ar", {
                    required: "product description  is required",
                    minLength: {
                      value: 20,
                      message: "minimum length is 20 character",
                    },
                  })}
                  error={!!errors.description_ar}
                  helperText={errors.description_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="Store Link in english"
                  label="Store Link in english"
                  type="text"
                  variant="outlined"
                  {...register("link_en", {
                    required: "Store link is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  error={!!errors.link_ar}
                  helperText={errors.link_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <TextField
                  fullWidth
                  id="Store Link in arabic"
                  label="Store Link in arabic"
                  type="text"
                  variant="outlined"
                  {...register("link_ar", {
                    required: "Store link is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  error={!!errors.link_ar}
                  helperText={errors.link_ar?.message}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <FilePond
                  name="image"
                  files={imageSrc}
                  labelIdle={`Upload store image <span class="filepond--label-action"> Browse </span>`}
                  onupdatefiles={handleFilePondUpdate}
                />
                <FormHelperText error={!!errors.image}>
                  {errors.image?.message}
                </FormHelperText>
              </Grid>
              <Grid xs={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">store</InputLabel>
                  <Select
                    labelId="store-label"
                    id="store-select"
                    label="Store"
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddProductClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Add Product
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
