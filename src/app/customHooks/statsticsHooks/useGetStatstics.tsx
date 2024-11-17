"use client";
import { statisticsUrl } from "@/app/BackEnd/endPoints";
import { useAuth } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetStatistics = () => {
  const { token, setToken } = useAuth();
  setToken(Cookies.get("token"));
  const getStatisticsRequest = () => {
    return axios.get(statisticsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["AllStatistics"],
    queryFn: getStatisticsRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetStatistics;
