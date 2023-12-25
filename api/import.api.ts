import useAxios from "@/hooks/use-axios";
import type { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Meta from "./meta.interface";
import defaultMeta from "./utils";
import { toast } from "react-toastify";

export interface Files {
  file: File[];
}

export const PREFIX_GHG = "/ghg-flux/export";
export const PREFIX_SOILS = "/soils/export";
export const PREFIX_CARBON = "/carbon-stock/export";
export const PREFIX_WEATHER = "/weather/export";
export const PREFIX_LOCATION = "/locations/export";

export function useGHGFilesApi() {
  const axios = useAxios();
  const [data, setData] = useState<Files[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (body?: any, options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$post(
        PREFIX_GHG,
        body,
        options
      );
      setData(lists);
      setMeta(result);
      toast.info("GHG Fluxes Document has been imported!");
    } catch (err: any) {
      setError(err);
      toast.error(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}

export function useSoilsFilesApi() {
  const axios = useAxios();
  const [data, setData] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (body?: any, options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$post(
        PREFIX_SOILS,
        body,
        options
      );
      setData(lists);
      setMeta(result);
      toast.info("Soils Document has been imported!");
    } catch (err: any) {
      setError(err);
      toast.error(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}

export function useCarbonFilesApi() {
  const axios = useAxios();
  const [data, setData] = useState<Files[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (body?: any, options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$post(
        PREFIX_CARBON,
        body,
        options
      );
      setData(lists);
      setMeta(result);
      toast.info("Carbon Stock Document has been imported!");
    } catch (err: any) {
      setError(err);
      toast.error(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}

export function useWeatherFilesApi() {
  const axios = useAxios();
  const [data, setData] = useState<Files[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (body?: any, options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$post(
        PREFIX_WEATHER,
        body,
        options
      );
      setData(lists);
      setMeta(result);
      toast.info("AWS Document has been imported!");
    } catch (err: any) {
      setError(err);
      toast.error(err);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}

export function useLocationFilesApi() {
  const axios = useAxios();
  const [data, setData] = useState<Files[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (body?: any, options?: AxiosRequestConfig) => {
    try {
      setFetching(true);
      const { data: lists, ...result } = await axios.$post(
        PREFIX_LOCATION,
        body,
        options
      );
      setData(lists);
      setMeta(result);
      toast.info("NCS Location Document has been imported!");
    } catch (err: any) {
      setError(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setFetching(false);
    }
  };

  return { fetch, data, meta, error, fetching };
}
