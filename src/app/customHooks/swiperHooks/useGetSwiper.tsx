"use client";
import { getSwiper } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const useGetSwiper = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getSwiperRequest = () => {
    return axios.get(getSwiper, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllSwiper"],
    queryFn: getSwiperRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetSwiper;
