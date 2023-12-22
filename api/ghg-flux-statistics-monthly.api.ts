import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

export interface GHGFluxStatisticsProp {
  land_cover: string;
  datetime: string;
  avg_airTemperature: number;
  avg_soilTemperature: number;
  avg_soilMoisture: number;
  avg_waterTable: number;
  avg_ch4: number;
  avg_co2: number;
}

export const PREFIX = "/ghg-flux/statistics/daily";

export default function useGHGFluxStatisticsYearlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<GHGFluxStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(PREFIX, options);
      setData(lists);
    } catch (err: any) {
      setError(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}
