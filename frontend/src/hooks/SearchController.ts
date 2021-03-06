import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

interface SpoonacularSearchParams {
  query: string;
  number: number;
  offset: number;
}

const endpoint = import.meta.env.VITE_SPOONACULAR_SEARCH_ENDPOINT || "";
if (!endpoint) throw Error("No Endpoint for searching provided in .env file");

async function spoonacularSearch(
  spoonacularSearchParams: SpoonacularSearchParams
) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: endpoint,
    params: spoonacularSearchParams,
  };
  return axios(config);
}

function useSearch() {
  const [searchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get("query") || "", [searchParams]);
  const page = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const [pageChange, setPageChange] = useState(true);

  const spoonacularSearchParams: SpoonacularSearchParams = useMemo(
    () => ({
      query,
      number: 12,
      offset: (page - 1) * 12,
    }),
    [page, query]
  );

  const reactQueryObj = useQuery(
    ["search", `${page}-${spoonacularSearchParams.query}`],
    () => spoonacularSearch(spoonacularSearchParams),
    {
      enabled: pageChange,
    }
  );

  useEffect(() => {
    setPageChange(true);
  }, [page, query]);

  useEffect(() => {
    if (reactQueryObj.isLoading) {
      setPageChange(false);
    }
  }, [reactQueryObj]);

  return {
    ...spoonacularSearchParams,
    ...reactQueryObj,
  };
}

export default useSearch;
