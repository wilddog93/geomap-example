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
};

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

export interface SoilsStatisticsProp {
  land_cover: string;
  soil_type: string;
  location: string;
  datetime: string;
  avg_redox: number;
  avg_pH: number;
  avg_k: number;
  avg_ktk: number;
  avg_p2O5: number;
  avg_n: number;
  avg_carbon: number;
  avg_gravimetricWaterContent: number;
  avg_volumetricWaterContent: number;
  avg_bulkDensity: number;
  sum_redox: number;
  sum_pH: number;
  sum_k: number;
  sum_ktk: number;
  sum_p2O5: number;
  sum_n: number;
  sum_carbon: number;
  sum_gravimetricWaterContent: number;
  sum_volumetricWaterContent: number;
  sum_bulkDensity: number;
}

export const PREFIX = "/soils";
export const PREFIX_YEARLY = "/soils/statistics/monthly";
export const PREFIX_MONTHLY = "/soils/statistics/daily";

export function useSoilsApi() {
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

export function useSoilsStatisticsYearlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<SoilsStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_YEARLY,
        options
      );
      setData(lists);
    } catch (err: any) {
      setError(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}

export function useSoilsStatisticsMonthlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<SoilsStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_MONTHLY,
        options
      );
      setData(lists);
    } catch (err: any) {
      setError(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}
