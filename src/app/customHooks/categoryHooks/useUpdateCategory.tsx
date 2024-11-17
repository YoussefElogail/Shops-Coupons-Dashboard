"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import { categoryUrl } from "@/app/BackEnd/endPoints";
import { categoryType } from "@/app/types/categoryTypes";

const useUpdatedCategory = (id: number | undefined) => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const updateCategoryRequest = (categoryData: categoryType) => {
    return axios.put(`${categoryUrl}/${id}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: updateCategoryRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllCategory"] });
      } else {
        toast.error(`${data.data.message}`);
      }
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useUpdatedCategory;
