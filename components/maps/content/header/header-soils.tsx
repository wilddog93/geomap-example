import { GHGFlux } from "@/api/ghg-flux.api";
import { SoilsType } from "@/api/soils.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface SoilsProps {
  items: {
    totalBulkDensity?: number | any;
    totalGravimetricWaterContent?: number | any;
    totalVolumetricWaterContent?: number | any;
  };
  sidebar?: boolean;
};

export type MyUnionType = (callbackfn: (previousValue: any, currentValue: any) => any) => any;


export default function HeaderSoils({ items, sidebar }: SoilsProps) {
  return (
    <Fragment>
      <div className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3`}>
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Bulk Density <span>(AVG)</span> </p>
          <p className="font-bold text-lg">
            {items?.totalBulkDensity
              ? formatMoney({
                  amount: items?.totalBulkDensity,
                  decimalCount: 2,
                })
              : 0}
              <span>{" "}<sup>o</sup>C</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Gravimetric Water Content <span>(AVG)</span> </p>
          <p className="font-bold text-lg">
            {items?.totalGravimetricWaterContent
              ? formatMoney({
                  amount: items?.totalGravimetricWaterContent,
                  decimalCount: 2,
                })
              : 0}
              <span>{" "}<sup>o</sup>C</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Volumetric Water Content <span>(AVG)</span> </p>
          <p className="font-bold text-lg">
            {items?.totalVolumetricWaterContent
              ? formatMoney({
                  amount: items?.totalVolumetricWaterContent,
                  decimalCount: 2,
                })
              : 0}
              <span>{" "}<sup>o</sup>C</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
