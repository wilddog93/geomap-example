export type SelectTypes = {
    label?: any;
    value?: any
};

export type ColumnProps = {
    name?: string | any;
    uid?: string | any;
    sortable?:boolean
};

export interface GhgFluxTypes {
  id?: string | number;
  date?: string;
  plot?: string;
  landCover?: string
  type?: string;
  location?: string;
  airTemprature?: number | null;
  soilTemperature?: number | null;
  soilMoisture?: number | null;
  waterTable?: number | null;
  ch4?: number | null;
  co2?: number | null;
  heterothropic_co2?: number | null;
  createdAt?: string;
  updatedAt?: string;
}
