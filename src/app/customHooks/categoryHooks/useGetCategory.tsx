"use client";
import { categoryUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const useGetCategory = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getCategoryRequest = () => {
    return axios.get(categoryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: getCategoryRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetCategory;
