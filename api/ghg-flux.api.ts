import useAxios from "@/hooks/use-axios"
import type { AxiosRequestConfig } from "axios"
import { useState } from "react"
import Meta from "./meta.interface"
import defaultMeta from "./utils"

export interface GHGFlux {
  id: number
  date: string
  plot: string
  landCover: string
  type: 'Heterothropic' | 'Total'
  airTemperature?: number | null
  soilTemperature: number | null
  soilMoisture: number | null
  waterTable: number | null
  ch4: number | null
  co2: number | null
}

export const PREFIX = '/ghg-flux'

export default function useGHGFluxApi() {
  const axios = useAxios();
  const [data, setData] = useState<GHGFlux[]>([]);
  const [fetching, setFetching] = useState<boolean>(false)
  const [error, setError] = useState<any>();
  const [meta, setMeta] = useState<Meta>(defaultMeta());

  const fetch = async (options?: AxiosRequestConfig) => {
    try {
      setFetching(true)
      const { data: lists, ...result } = await axios.$get(PREFIX, options)
      setData(lists)
      setMeta(result)
    } catch (err: any) {
      setError(err)
    } finally {
      setFetching(false)
    }
  }

  return { fetch, data, meta, error, fetching }
}