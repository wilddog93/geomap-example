import { GHGFlux } from "@/api/ghg-flux.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface GHGFluxProps {
  items: GHGFlux[] | any[];
  sidebar?: boolean;
};

export default function HeaderGHGFlux({ items, sidebar }: GHGFluxProps) {
  const itemReduce = useMemo(() => {
    let airTemperature: any = 0;
    let soilTemperature: any = 0;
    let soilMoisture: any = 0;
    let waterTable: any = 0;
    let ch4: any = 0;
    let co2: any = 0;
    if(items?.length > 0) {
      airTemperature = items?.reduce((acc, obj) => {
        return acc + obj?.airTemperature;
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
    }

    return {
      airTemperature,
      soilTemperature,
      soilMoisture,
      waterTable,
      ch4,
      co2,
    };
  }, [items]);


  return (
    <Fragment>
      <div className={`w-full grid grid-cols-1 gap-4 py-3 ${sidebar ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-6"}`}>
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Air Temperature</p>
          <p className="font-bold text-lg">
            {itemReduce?.airTemperature
              ? formatMoney({
                  amount: itemReduce?.airTemperature,
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
