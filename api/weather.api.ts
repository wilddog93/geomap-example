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

export const PREFIX = "/weather";

export default function useWeatherApi() {
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
