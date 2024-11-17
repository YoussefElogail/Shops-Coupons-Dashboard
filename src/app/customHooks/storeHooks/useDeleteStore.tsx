"use client";
import { storeUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const useDeleteStore = (id: number | undefined) => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const deleteStoreRequest = () => {
    return axios.delete(`${storeUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["deleteStore", id],
    mutationFn: deleteStoreRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllStore"] });
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

export default useDeleteStore;
