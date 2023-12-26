import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

export interface WeatherTypes {
  id: number;
  date: string | any;
  location: string | any;
  temperature: number | null,
  relativeHumidity: number | null,
  solarRadiation: number | null,
  windSpeed: number | null,
  gustSpeed: number | null,
  windDirection: number | null,
  rain: number | null,
}

export interface WeatherStatisticsProp {
  location: string;
  datetime: string;
  avg_temperature: number;
  avg_relativeHumidity: number;
  avg_solarRadiation: number;
  avg_windSpeed: number;
  avg_gustSpeed: number;
  avg_windDirection: number;
  avg_rain: number;
  sum_temperature: number;
  sum_relativeHumidity: number;
  sum_solarRadiation: number;
  sum_windSpeed: number;
  sum_gustSpeed: number;
  sum_windDirection: number;
  sum_rain: number;
}

export const PREFIX = "/weather";
export const PREFIX_YEARLY = "/wewather/statistics/monthly";
export const PREFIX_MONTHLY = "/wewather/statistics/daily";

export function useWeatherApi() {
  const axios = useAxios();
  const [data, setData] = useState<WeatherTypes[]>([]);
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

export function useWeatherStatisticsYearlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<WeatherStatisticsProp[]>([]);
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

export function useWeatherStatisticsMonthlyApi() {
  const axios = useAxios();
  const [data, setData] = useState<WeatherStatisticsProp[]>([]);
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