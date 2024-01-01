import { GHGFlux } from "@/api/ghg-flux.api";
import { SoilsType } from "@/api/soils.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface WeatherProps {
  items: {
    totalTemperature?: number | any;
    totalRelativeHumidity?: number | any;
    totalSolarRadiation?: number | any;
    totalWindSpeed?: number | any;
    totalGustSpeed?: number | any;
    totalWindDirection?: number | any;
    totalRain?: number | any;
  };
  sidebar?: boolean;
}

export type MyUnionType = (
  callbackfn: (previousValue: any, currentValue: any) => any
) => any;

export default function HeaderWeather({ items, sidebar }: WeatherProps) {
  return (
    <Fragment>
      <div
        className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3`}
      >
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Temperature</p>
          <p className="font-bold text-lg">
            {items?.totalTemperature
              ? formatMoney({
                  amount: items?.totalTemperature,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm">
              {" "}
              <sup>o</sup>C
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Relative Humidity</p>
          <p className="font-bold text-lg">
            {items?.totalRelativeHumidity
              ? formatMoney({
                  amount: items?.totalRelativeHumidity,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> %</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Solar Radiation</p>
          <p className="font-bold text-lg">
            {items?.totalSolarRadiation
              ? formatMoney({
                  amount: items?.totalSolarRadiation,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> W/m²</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Wind Speed</p>
          <p className="font-bold text-lg">
            {items?.totalWindSpeed
              ? formatMoney({
                  amount: items?.totalWindSpeed,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> mph</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Gust Speed</p>
          <p className="font-bold text-lg">
            {items?.totalGustSpeed
              ? formatMoney({
                  amount: items?.totalGustSpeed,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm"> mph</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Sum Rainfall</p>
          <p className="font-bold text-lg">
            {items?.totalRain
              ? formatMoney({
                  amount: items?.totalRain,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm"> mm</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
