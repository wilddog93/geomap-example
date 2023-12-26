import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

export interface WoodyTypes {
  id: string | number;
  date: string;
  region: string;
  landCover: string;
  site: string;
  plot: string;
  volumeRotten: number;
  volumeSound: number;
  volumeMedium: number;
  massRotten: number;
  massSound: number;
  massMedium: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface WoodyStatisticsProp {
  land_cover: string;
  datetime: string;
  site: string;
  sum_total: number;
  avg_total: number;
}

export const PREFIX_WOODY = "/carbon-stocks/woody-debris?cache=0";
export const PREFIX_WOODY_YEARLY = "/carbon-stocks/woody-debris/statistics/monthly";
export const PREFIX_WOODY_MONTHLY = "/carbon-stocks/woody-debris/statistics/daily";
// woody-debris
export function useWoodyApi() {
  const axios = useAxios();
  const [data, setData] = useState<WoodyTypes[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$get(
        PREFIX_WOODY,
        options
      );
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

export function useWoodyStatisticsYearlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<WoodyStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_WOODY_YEARLY,
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

export function useWoodyStatisticsMonthlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<WoodyStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_WOODY_MONTHLY,
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
// wwoody-debris end
