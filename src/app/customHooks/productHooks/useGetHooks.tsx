"use client";
import { productUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetProduct = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getProductRequest = () => {
    return axios.get(productUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllProducts"],
    queryFn: getProductRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetProduct;
