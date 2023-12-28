import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";

// woody-props
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

export interface CarbonWoodyStatisticsProp {
  region: string;
  land_cover: string;
  datetime: string;
  site: string;
  sum_total: number;
  avg_total: number;
}

// litter-props
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

export interface CarbonLittersStatisticsProp {
  region: string;
  land_cover: string;
  site: string;
  sum_litterMas: number;
  avg_litterMas: number;
}

// soil-props
export interface CarbonSoilsTypes {
  id: string | number;
  region: string;
  landCover: string;
  site: string;
  c: number;
  n: number;
  sampleDepthRange: string | any;
  substrate: string | any;
  depthOfSample: number;
  bd: number;
  cMgHa: number;
  nMgHa: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarbonSoilsStatisticsProp {
  region: string;
  land_cover: string;
  site: string;
  avg_c: number;
  avg_n: number;
  avg_cMgHa: number;
  avg_nMgHa: number;
  sum_c: number;
  sum_n: number;
  sum_cMgHa: number;
  sum_nMgHa: number;
}

// trees-props
export interface CarbonTreesTypes {
  id: string | number;
  region: string;
  landCover: string;
  site: string;
  type: string;
  sppSci: string;
  fam: string;
  sourceForAllometry: string;
  remarks: string;
  plotRadius: number;
  plot: number;
  dbh: number;
  notes: number;
  woodDensity: number;
  tagb: number;
  yearPlant: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarbonTreesStatisticsProp {
  land_cover: string;
  site: string;
  avg_plot: number;
  avg_dbh: number;
  avg_notes: number;
  avg_tagb: number;
  avg_plotRadius: number;
  avg_woodDensity: number;
  sum_plot: number;
  sum_dbh: number;
  sum_notes: number;
  sum_tagb: number;
  sum_plotRadius: number;
  sum_woodDensity: number;
}

// woody
export const PREFIX_WOODY = "/carbon-stocks/woody-debris?cache=0";
export const PREFIX_WOODY_YEARLY =
  "/carbon-stocks/woody-debris/statistics/monthly";
export const PREFIX_WOODY_MONTHLY =
  "/carbon-stocks/woody-debris/statistics/daily";

// litters
export const PREFIX_LITTERS = "/carbon-stocks/litters?cache=0";
export const PREFIX_LITTERS_STATS = "/carbon-stocks/litters/statistics";

// soils
export const PREFIX_SOILS = "/carbon-stocks/soils?cache=0";
export const PREFIX_SOILS_STATS = "/carbon-stocks/soils/statistics";

// trees
export const PREFIX_TREES = "/carbon-stocks/trees?cache=0";
export const PREFIX_TREES_STATS = "/carbon-stocks/trees/statistics";

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

export function useCarbonWoodyStatisticsMonthlyApi() {
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

export function useCarbonLittersStatisticsApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonLittersStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_LITTERS_STATS,
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

// soils
export function useCarbonSoilsApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonSoilsTypes[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$get(
        PREFIX_SOILS,
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

export function useCarbonSoilsStatisticsApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonSoilsStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_SOILS_STATS,
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
// soils-end

// trees
export function useCarbonTreesApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonTreesTypes[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$get(
        PREFIX_TREES,
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

export function useCarbonTreesStatisticsApi() {
  const axios = useAxios();
  const [data, setData] = useState<CarbonTreesStatisticsProp[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$getByObject(
        PREFIX_TREES_STATS,
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
// trees-end
