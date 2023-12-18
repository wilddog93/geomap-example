import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

type ValuesType = {
    sampleCode: string | any;
    gravimetricWaterContent: number | null;
    bulkDensity: number | null;
    volumetricWaterContent: number | null;
}

export interface SoilsType {
  id: number;
  date: string | any;
  plot: string | any;
  landCover: string | any;
  type: "Heterothropic" | "Total";
  soilType: string | any;
  location: string | any;
  values: ValuesType;
}

export const PREFIX = "/soils";

export default function useSoilsApi() {
  const axios = useAxios();
  const [data, setData] = useState<SoilsType[]>([]);
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
