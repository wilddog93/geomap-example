import { GHGFlux } from "@/api/ghg-flux.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

type GHGFluxProps = {
  items: GHGFlux[] | any[];
};

export default function HeaderGHGFlux({ items }: GHGFluxProps) {
  console.log(items, "result");
  const itemReduce = useMemo(() => {
    let airTemprature: number = 0;
    let soilTemperature: number = 0;
    let soilMoisture: number = 0;
    let waterTable: number = 0;
    let ch4: number = 0;
    let co2: number = 0;
    airTemprature = items?.reduce((acc, obj) => {
      return acc + obj?.airTemprature;
    }, 0);

    soilTemperature = items?.reduce((acc, obj) => {
      return acc + obj?.soilTemperature;
    }, 0);

    soilMoisture = items?.reduce((acc, obj) => {
      return acc + obj?.soilMoisture;
    }, 0);

    waterTable = items?.reduce((acc, obj) => {
      return acc + obj?.waterTable;
    }, 0);

    ch4 = items?.reduce((acc, obj) => {
      return acc + obj?.ch4;
    }, 0);

    co2 = items?.reduce((acc, obj) => {
      return acc + obj?.co2;
    }, 0);

    return {
      airTemprature,
      soilTemperature,
      soilMoisture,
      waterTable,
      ch4,
      co2,
    };
  }, [items]);

  console.log(itemReduce?.airTemprature, "value");

  return (
    <Fragment>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-3">
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Air Temperature</p>
          <p className="font-bold text-lg">
            {itemReduce?.airTemprature
              ? formatMoney({
                  amount: itemReduce?.airTemprature,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Soil Temperature</p>
          <p className="font-bold text-lg">
            {itemReduce?.soilTemperature
              ? formatMoney({
                  amount: itemReduce?.soilTemperature,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Soil Moisture</p>
          <p className="font-bold text-lg">
            {itemReduce?.soilMoisture
              ? formatMoney({
                  amount: itemReduce?.soilMoisture,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Water Table</p>
          <p className="font-bold text-lg">
            {itemReduce?.waterTable
              ? formatMoney({
                  amount: itemReduce?.waterTable,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">
            Ch <sup>4</sup>
          </p>
          <p className="font-bold text-lg">
            {itemReduce?.ch4
              ? formatMoney({
                  amount: itemReduce?.ch4,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">
            Co <sup>2</sup>
          </p>
          <p className="font-bold text-lg">
            {itemReduce?.co2
              ? formatMoney({
                  amount: itemReduce?.co2,
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
