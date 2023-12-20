import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

export interface PropertyTypes {
  id?: number;
  name?: string;
  description?: string | null;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const PREFIX = "/properties";

export default function usePropsApi() {
  const axios = useAxios();
  const [data, setData] = useState<PropertyTypes[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$get(PREFIX, options);
      setData(lists);
      setMeta(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}
