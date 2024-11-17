"use client";
import { usersUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetUsers = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getUsersRequest = () => {
    return axios.get(usersUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: getUsersRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetUsers;
