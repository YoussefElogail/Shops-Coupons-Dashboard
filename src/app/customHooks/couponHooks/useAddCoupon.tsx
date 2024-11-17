"use client";
import { couponUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { couponType } from "@/app/types/couponTypes";
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
const useAddCoupon = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const addCouponRequest = (couponData: couponType) => {
    return axios.post(couponUrl, couponData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addCoupon"],
    mutationFn: addCouponRequest,
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success(`${data.data.message}`);
        queryClient.invalidateQueries({ queryKey: ["AllCoupons"] });
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

export default useAddCoupon;
