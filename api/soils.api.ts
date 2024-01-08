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
  plotCode: string | any;
  sampleCode: string | any;
  landCover: string | any;
  type: "Heterothropic" | "Total";
  location: string | any;
  values: ValuesType;
  soilType: "physical" | "chemChar1" | "chemChar2" | "chemChar3";
  pH: number;
  redox: number;
  k: number;
  ktk: number;
  p2O5: number;
  n: number;
  carbon: number;
  gravimetricWaterContent: number;
  volumetricWaterContent: number;
  bulkDensity: number;
  createdAt: string;
  updatedAt: string;
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

export interface SoilsStatBoxPlotProps {
  land_cover: string;
  soil_type: string;
  location: string;
  min_redox: 0;
  max_redox: 0;
  avg_redox: 0;
  std_redox: 0;
  q1_redox: 0;
  q2_redox: 0;
  q3_redox: 0;
  min_pH: 0;
  max_pH: 0;
  avg_pH: 0;
  std_pH: 0;
  q1_pH: 0;
  q2_pH: 0;
  q3_pH: 0;
  min_k: 0;
  max_k: 0;
  avg_k: 0;
  std_k: 0;
  q1_k: 0;
  q2_k: 0;
  q3_k: 0;
  min_ktk: 0;
  max_ktk: 0;
  avg_ktk: 0;
  std_ktk: 0;
  q1_ktk: 0;
  q2_ktk: 0;
  q3_ktk: 0;
  min_p2O5: 0;
  max_p2O5: 0;
  avg_p2O5: 0;
  std_p2O5: 0;
  q1_p2O5: 0;
  q2_p2O5: 0;
  q3_p2O5: 0;
  min_n: 0;
  max_n: 0;
  avg_n: 0;
  std_n: 0;
  q1_n: 0;
  q2_n: 0;
  q3_n: 0;
  min_carbon: 0;
  max_carbon: 0;
  avg_carbon: 0;
  std_carbon: 0;
  q1_carbon: 0;
  q2_carbon: 0;
  q3_carbon: 0;
  min_gravimetricWaterContent: 0;
  max_gravimetricWaterContent: 0;
  avg_gravimetricWaterContent: 0;
  std_gravimetricWaterContent: 0;
  q1_gravimetricWaterContent: 0;
  q2_gravimetricWaterContent: 0;
  q3_gravimetricWaterContent: 0;
  min_volumetricWaterContent: 0;
  max_volumetricWaterContent: 0;
  avg_volumetricWaterContent: 0;
  std_volumetricWaterContent: 0;
  q1_volumetricWaterContent: 0;
  q2_volumetricWaterContent: 0;
  q3_volumetricWaterContent: 0;
  min_bulkDensity: 0;
  max_bulkDensity: 0;
  avg_bulkDensity: 0;
  std_bulkDensity: 0;
  q1_bulkDensity: 0;
  q2_bulkDensity: 0;
  q3_bulkDensity: 0;
}

export const PREFIX = "/soils";
export const PREFIX_YEARLY = "/soils/statistics/monthly";
export const PREFIX_MONTHLY = "/soils/statistics/daily";
export const PREFIX_BOXPLOT = "/soils/statistics/boxPlot";

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

export function useSoilsBoxPlotApi() {
  const axios = useAxios();
  const [data, setData] = useState<SoilsStatBoxPlotProps[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_BOXPLOT,
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
