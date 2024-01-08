import { GHGFlux } from "@/api/ghg-flux.api";
import { SoilsType } from "@/api/soils.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface SoilsProps {
  items: {
    totalBulkDensity?: number | any;
    totalGravimetricWaterContent?: number | any;
    totalVolumetricWaterContent?: number | any;
    totalPh?: number | any;
    totalRedox?: number | any;
    totalK?: number | any;
    totalKtk?: number | any;
    totalP205?: number | any;
    totalCarbon?: number | any;
    totalN?: number | any;
  };
  sidebar?: boolean;
};

export type MyUnionType = (callbackfn: (previousValue: any, currentValue: any) => any) => any;



export default function HeaderSoils({ items, sidebar }: SoilsProps) {
  console.log(formatMoney({ amount: items.totalK }), "result-2")
  return (
    <Fragment>
      <div className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3`}>
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Bulk Density</p>
          <p className="font-bold text-lg">
            {items?.totalBulkDensity
              ? formatMoney({
                  amount: items?.totalBulkDensity,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}g/cm<sup>3</sup></span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Gravimetric Water Content</p>
          <p className="font-bold text-lg">
            {items?.totalGravimetricWaterContent
              ? formatMoney({
                  amount: items?.totalGravimetricWaterContent,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}%</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Volumetric Water Content</p>
          <p className="font-bold text-lg">
            {items?.totalVolumetricWaterContent
              ? formatMoney({
                  amount: items?.totalVolumetricWaterContent,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}%</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average pH</p>
          <p className="font-bold text-lg">
            {items?.totalPh
              ? formatMoney({
                  amount: items?.totalPh,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}-</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Redox Potential</p>
          <p className="font-bold text-lg">
            {items?.totalRedox
              ? formatMoney({
                  amount: items?.totalRedox,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}%</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Kalium Content</p>
          <p className="font-bold text-lg">
            {items?.totalK
              ? formatMoney({
                  amount: items?.totalK,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "} cmol(+) kg<sup>-1</sup></span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Cation Exchange Capacity</p>
          <p className="font-bold text-lg">
            {items?.totalKtk
              ? formatMoney({
                  amount: items?.totalKtk,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}cmol(+) kg<sup>-1</sup></span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Phosporous Pentoxide Content</p>
          <p className="font-bold text-lg">
            {items?.totalP205
              ? formatMoney({
                  amount: items?.totalP205,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "}ppm</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Carbon Content</p>
          <p className="font-bold text-lg">
            {items?.totalCarbon
              ? formatMoney({
                  amount: items?.totalCarbon,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "} Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Nitrogen Content</p>
          <p className="font-bold text-lg">
            {items?.totalN
              ? formatMoney({
                  amount: items?.totalN,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">{" "} Mg/ha</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
