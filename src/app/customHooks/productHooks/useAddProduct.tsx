"use client";
import { productUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}
const useAddProduct = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const addProductRequest = (productData: FormData) => {
    return axios.post(productUrl, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProductRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllProducts"] });
      } else {
        toast.error(`${data.data.message}`);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useAddProduct;
