import { GHGFlux } from "@/api/ghg-flux.api";
import { WeatherTypes } from "@/api/weather.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface WeatherProps {
  items: WeatherTypes[];
  sidebar?: boolean;
}

export default function HeaderWeather({ items, sidebar }: WeatherProps) {
  const itemReduce = useMemo(() => {
    let temperature: number = 0,
      relativeHumidity: number = 0,
      solarRadiation: number = 0,
      windSpeed: number = 0,
      gustSpeed: number = 0,
      windDirection: number = 0,
      rain: number = 0;
    
      if(items?.length > 0) {
        temperature = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.temperature;
        }, 0);
    
        relativeHumidity = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.relativeHumidity;
        }, 0);
    
        solarRadiation = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.solarRadiation;
        }, 0);
    
        windSpeed = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.windSpeed;
        }, 0);
    
        gustSpeed = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.gustSpeed;
        }, 0);
    
        windDirection = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.windDirection;
        }, 0);
    
        rain = items.reduce((previousValue: any, currentValue: any, currentIndex: number, array: any[]) => {
          return previousValue + currentValue?.rain;
        }, 0);
      }

    return {
      temperature,
      relativeHumidity,
      solarRadiation,
      windSpeed,
      gustSpeed,
      windDirection,
      rain
    };
  }, [items]);

  return (
    <Fragment>
      <div
        className={`w-full grid grid-cols-1 gap-4 py-3 ${sidebar ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}
      >
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Temperature</p>
          <p className="font-bold text-lg">
            {itemReduce?.temperature
              ? formatMoney({
                  amount: itemReduce?.temperature,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Relative Humidity</p>
          <p className="font-bold text-lg">
            {itemReduce?.relativeHumidity
              ? formatMoney({
                  amount: itemReduce?.relativeHumidity,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Solar Radiation</p>
          <p className="font-bold text-lg">
            {itemReduce?.solarRadiation
              ? formatMoney({
                  amount: itemReduce?.solarRadiation,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Wind Speed</p>
          <p className="font-bold text-lg">
            {itemReduce?.windSpeed
              ? formatMoney({
                  amount: itemReduce?.windSpeed,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Gust Speed</p>
          <p className="font-bold text-lg">
            {itemReduce?.gustSpeed
              ? formatMoney({
                  amount: itemReduce?.gustSpeed,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Wind Direction</p>
          <p className="font-bold text-lg">
            {itemReduce?.windDirection
              ? formatMoney({
                  amount: itemReduce?.windDirection,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Rain</p>
          <p className="font-bold text-lg">
            {itemReduce?.rain
              ? formatMoney({
                  amount: itemReduce?.rain,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>
      </div>
    </Fragment>
  );
}
