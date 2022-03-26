import axios, { AxiosRequestConfig } from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import LoginContext from "../contexts/LoginContext";

const endpoint = import.meta.env.VITE_GET_FAVORITES_ENDPOINT || "";
if (!endpoint) throw new Error("VITE_GET_FAVORITES_ENDPOINT is not defined");

async function getFavorites(token: string) {
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: endpoint,
  };
  return axios(config);
}

function useGetFavorite() {
  const { isLoggedIn } = useContext(LoginContext);
  const token = localStorage.getItem("token") || "";
  const output = useQuery(["get_favorites", token], () => getFavorites(token), {
    enabled: isLoggedIn,
  });

  return output;
}

export default useGetFavorite;