import axios, { AxiosRequestConfig } from "axios";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const endpoint = import.meta.env.VITE_SPOONACULAR_RECIPE_ENDPOINT || "";
if (!endpoint) throw Error("No Endpoint for recipes provided in .env file");

async function fetchRecipe(id: number) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/${id}`,
  };
  return axios(config);
}

function useRecipe() {
  const [favoriteState, setFavoriteState] = useState("loading");
  const [showModal, setShowModal] = useState(false);
  const { pageId } = useParams();
  const { data, isError, isSuccess } = useQuery(["recipe", pageId], () =>
    fetchRecipe(Number(pageId))
  );

  const modalKey = `modal_${Date.now()}`;

  const output = useMemo(() => {
    if (isSuccess)
      return {
        id: data?.data?.id || 0,
        title: data?.data?.title || "Title Not Found",
        imgUrl: data?.data?.image || "",
        readyInMinutes: data?.data?.readyInMinutes || 0,
        servings: data?.data?.servings || 0,
        sourceUrl: data?.data?.sourceUrl || "No Source Found",
        instructions: data?.data?.instructions || "No Instructions Found",
      };
    if (isError)
      return {
        id: 0,
        title: "Error: Title Not Found",
        imgUrl: "",
        readyInMinutes: 0,
        servings: 0,
        sourceUrl: "Error: No Source Found",
        instructions: "Error: No Instructions Found",
      };
    return {
      id: 0,
      title: "Loading...",
      imgUrl: "",
      readyInMinutes: 0,
      servings: 0,
      sourceUrl: "Loading...",
      instructions: "Loading...",
    };
  }, [
    data?.data?.id,
    data?.data?.image,
    data?.data?.instructions,
    data?.data?.readyInMinutes,
    data?.data?.servings,
    data?.data?.sourceUrl,
    data?.data?.title,
    isError,
    isSuccess,
  ]);

  return {
    ...output,
    modalKey,
    isError,
    favoriteState,
    setFavoriteState,
    showModal,
    setShowModal,
  };
}

export default useRecipe;
