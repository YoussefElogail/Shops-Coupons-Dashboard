"use client";
import { couponUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const useGetCoupon = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getCouponRequest = () => {
    return axios.get(couponUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllCoupons"],
    queryFn: getCouponRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetCoupon;
