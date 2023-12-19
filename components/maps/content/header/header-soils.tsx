import { GHGFlux } from "@/api/ghg-flux.api";
import { SoilsType } from "@/api/soils.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface SoilsProps {
  items: SoilsType[] | any[];
  sidebar?: boolean;
};

export default function HeaderSoils({ items, sidebar }: SoilsProps) {
  const itemReduce = useMemo(() => {
    let gravimetricWaterContent: number = 0;
    let bulkDensity: number = 0;
    let volumetricWaterContent: number = 0;
    gravimetricWaterContent = items?.reduce((acc, obj) => {
      return acc + obj?.values?.gravimetricWaterContent;
    }, 0);

    bulkDensity = items?.reduce((acc, obj) => {
      return acc + obj?.values?.bulkDensity;
    }, 0);

    volumetricWaterContent = items?.reduce((acc, obj) => {
      return acc + obj?.values?.volumetricWaterContent;
    }, 0);

    return {
      gravimetricWaterContent,
      bulkDensity,
      volumetricWaterContent
    };
  }, [items]);


  return (
    <Fragment>
      <div className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3`}>
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Air Temperature</p>
          <p className="font-bold text-lg">
            {itemReduce?.gravimetricWaterContent
              ? formatMoney({
                  amount: itemReduce?.gravimetricWaterContent,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Soil Temperature</p>
          <p className="font-bold text-lg">
            {itemReduce?.bulkDensity
              ? formatMoney({
                  amount: itemReduce?.bulkDensity,
                  decimalCount: 2,
                })
              : 0}
          </p>
          <p className="text-xs">Condition/status</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Soil Moisture</p>
          <p className="font-bold text-lg">
            {itemReduce?.volumetricWaterContent
              ? formatMoney({
                  amount: itemReduce?.volumetricWaterContent,
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
