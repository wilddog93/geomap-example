import { GHGFlux } from "@/api/ghg-flux.api";
import { SoilsType } from "@/api/soils.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface CarbonProps {
  items: {
    totalWoodyDebris?: number;
    totalLitterMass?: number;
    totalNSoils?: number;
    totalCSoils?: number;
    totalNMGSoils?: number;
    totalCMGSoils?: number;
    totalDBHTrees?: number;
    totalTAGBTrees?: number;
    totalNotesTrees?: number;
    totalPlotTrees?: number;
    totalPlotRadiusTrees?: number;
    totalWoodDensityTrees?: number;
  };
  sidebar?: boolean;
}

export type MyUnionType = (
  callbackfn: (previousValue: any, currentValue: any) => any
) => any;

export default function HeaderCarbon({ items, sidebar }: CarbonProps) {
  return (
    <Fragment>
      <div
        className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-3 lg:grid-cols-4`}
      >
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Woody Debris (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalWoodyDebris
              ? formatMoney({
                  amount: items?.totalWoodyDebris,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Litter Mass (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalLitterMass
              ? formatMoney({
                  amount: items?.totalLitterMass,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">%N (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalNSoils
              ? formatMoney({
                  amount: items?.totalNSoils,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> %</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">%C (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalCSoils
              ? formatMoney({
                  amount: items?.totalCSoils,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> %</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">N (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalNMGSoils
              ? formatMoney({
                  amount: items?.totalNMGSoils,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">C (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalCMGSoils
              ? formatMoney({
                  amount: items?.totalCMGSoils,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">TAGB Trees (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalTAGBTrees
              ? formatMoney({
                  amount: items?.totalTAGBTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Notes Trees (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalNotesTrees
              ? formatMoney({
                  amount: items?.totalNotesTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Plot Trees (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalPlotTrees
              ? formatMoney({
                  amount: items?.totalPlotTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Plot Radius Trees (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalPlotRadiusTrees
              ? formatMoney({
                  amount: items?.totalPlotRadiusTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> Mg/ha</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">DBH Trees (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalDBHTrees
              ? formatMoney({
                  amount: items?.totalDBHTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> g/cm<sup>3</sup></span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Wood Density Trees (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalWoodDensityTrees
              ? formatMoney({
                  amount: items?.totalWoodDensityTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> g/cm<sup>3</sup></span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
