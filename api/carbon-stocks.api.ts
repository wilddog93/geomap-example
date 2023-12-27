import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

export interface CarbonWoodyTypes {
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

export interface CarbonLittersTypes {
  id: string | number;
  region: string;
  landCover: string;
  site: string;
  bag: string;
  litterMas: number;
  wetWt: number;
  dryWt: number;
  totalSampleDryMass: number;
  minusPlasticBag: number;
  sampleWet: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarbonWoodyStatisticsProp {
  land_cover: string;
  datetime: string;
  site: string;
  sum_total: number;
  avg_total: number;
}

export interface CarbonLittersStatisticsProp {
  land_cover: string;
  site: string;
  sum_litterMas: number;
  avg_litterMas: number;
}

export const PREFIX_WOODY = "/carbon-stocks/woody-debris?cache=0";
export const PREFIX_WOODY_YEARLY =
  "/carbon-stocks/woody-debris/statistics/monthly";
export const PREFIX_WOODY_MONTHLY =
  "/carbon-stocks/woody-debris/statistics/daily";

export const PREFIX_LITTERS = "/carbon-stocks/litters?cache=0";
export const PREFIX_LITTERS_YEARLY =
  "/carbon-stocks/litters/statistics/monthly";
export const PREFIX_LITTERS_MONTHLY = "/carbon-stocks/litters/statistics/daily";

// woody-debris
export function useCarbonWoodyApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonWoodyTypes[]>([]);
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

export function useCarbonWoodyStatisticsYearlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonWoodyStatisticsProp[]>([]);
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

export function useCaarbonWoodyStatisticsMonthlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonWoodyStatisticsProp[]>([]);
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

// litters
export function useCarbonLittersApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonLittersTypes[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$get(
        PREFIX_LITTERS,
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

export function useCarbonLittersStatisticsYearlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonLittersStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_LITTERS_YEARLY,
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

export function useCarbonLittersStatisticsMonthlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonLittersStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_LITTERS_MONTHLY,
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
// ltters-end