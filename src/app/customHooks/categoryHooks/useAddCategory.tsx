"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import { categoryUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { categoryType } from "@/app/types/categoryTypes";
const useAddCategory = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const addCategoryRequest = (categoryData: categoryType) => {
    return axios.post(categoryUrl, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: addCategoryRequest,
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

export default useAddCategory;
