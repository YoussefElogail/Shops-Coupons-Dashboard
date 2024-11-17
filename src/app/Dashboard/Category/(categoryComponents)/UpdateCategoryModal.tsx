"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import { categoryType } from "@/app/types/categoryTypes";
import useUpdatedCategory from "@/app/customHooks/categoryHooks/useUpdateCategory";
export default function UpdateCategoryModal({
  category,
  open,
  handleUpdateCategoryClose,
}: {
  category: categoryType | undefined;
  open: boolean;
  handleUpdateCategoryClose: () => void;
}) {
  const { register, control, handleSubmit, formState, reset } =
    useForm<categoryType>();
  const { errors, isSubmitting } = formState;
  const { mutate, isSuccess } = useUpdatedCategory(category?.id);
  const onSubmit = (data: categoryType) => {
    mutate(data);
  };
  React.useMemo(() => {
    if (isSuccess) {
      handleUpdateCategoryClose();
    }
  }, [isSuccess]);
  React.useEffect(() => {
    if (category) {
      reset({
        name_ar: category.name_ar,
        name_en: category.name_en,
        meta_title_ar: category.meta_title_ar,
        meta_title_en: category.meta_title_en,
        meta_description_en: category.meta_description_en,
        meta_description_ar: category.meta_description_ar,
        meta_keyword_ar: category.meta_keyword_ar,
        meta_keyword_en: category.meta_keyword_en,
      });
    }
    {
    }
  }, [reset, category]);
  return (
    <Dialog open={open} onClose={handleUpdateCategoryClose} fullWidth>
      <DialogTitle sx={{ color: "primary.main" }}>Update Category</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                id="category Name in english"
                label="category Name in english"
                type="text"
                variant="outlined"
                {...register("name_en", {
                  required: "category Name  is required",
                })}
                error={!!errors.name_en}
                helperText={errors.name_en?.message}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                id="category Name in arabic"
                label="category Name in arabic"
                type="text"
                variant="outlined"
                {...register("name_ar", {
                  required: "category Name  is required",
                })}
                error={!!errors.name_ar}
                helperText={errors.name_ar?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                multiline
                fullWidth
                id="meta-title-en"
                label="SEO Title in English"
                type="text"
                variant="outlined"
                {...register("meta_title_en", {
                  required: "SEO title is required",
                  minLength: {
                    value: 3,
                    message: "minimum length is 3 character",
                  },
                  maxLength: {
                    value: 63,
                    message: "maximum length is 63 character",
                  },
                })}
                error={!!errors.meta_title_en}
                helperText={errors.meta_title_en?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                multiline
                fullWidth
                id="meta-title-ar"
                label="SEO Title in Arabic"
                type="text"
                variant="outlined"
                {...register("meta_title_ar", {
                  required: "SEO title is required",
                  minLength: {
                    value: 3,
                    message: "minimum length is 3 character",
                  },
                  maxLength: {
                    value: 63,
                    message: "maximum length is 63 character",
                  },
                })}
                error={!!errors.meta_title_ar}
                helperText={errors.meta_title_ar?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                multiline
                fullWidth
                id="meta-description-en"
                label="Meta Description in English"
                type="text"
                variant="outlined"
                {...register("meta_description_en", {
                  required: "Meta description is required",
                  minLength: {
                    value: 20,
                    message: "minimum length is 20 character",
                  },
                  maxLength: {
                    value: 156,
                    message: "maximum length is 156 character",
                  },
                })}
                error={!!errors.meta_description_en}
                helperText={errors.meta_description_en?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                multiline
                fullWidth
                id="meta-description-ar"
                label="Meta Description in Arabic"
                type="text"
                variant="outlined"
                {...register("meta_description_ar", {
                  required: "Meta description is required",
                  minLength: {
                    value: 20,
                    message: "minimum length is 20 character",
                  },
                  maxLength: {
                    value: 156,
                    message: "maximum length is 156 character",
                  },
                })}
                error={!!errors.meta_description_ar}
                helperText={errors.meta_description_ar?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                multiline
                fullWidth
                id="meta-keyword-en"
                label="Meta Keywords in English"
                type="text"
                variant="outlined"
                {...register("meta_keyword_en", {
                  required: "Meta keywords are required",
                  minLength: {
                    value: 3,
                    message: "minimum length is 3 character",
                  },
                })}
                error={!!errors.meta_keyword_en}
                helperText={errors.meta_keyword_en?.message}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <TextField
                multiline
                fullWidth
                id="meta-keyword-ar"
                label="Meta Keywords in Arabic"
                type="text"
                variant="outlined"
                {...register("meta_keyword_ar", {
                  required: "Meta keywords are required",
                  minLength: {
                    value: 3,
                    message: "minimum length is 3 character",
                  },
                })}
                error={!!errors.meta_keyword_ar}
                helperText={errors.meta_keyword_ar?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCategoryClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            updated Category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
