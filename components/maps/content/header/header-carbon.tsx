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
      <h3 className="text-default-700 font-bold mt-3">Aboveground Stock</h3>
      <div
        className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-3 ${!sidebar ? "lg:grid-cols-5" : ""}`}
      >
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Litter Mass</p>
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
          <p className="text-xs mb-2">Average Woody Debris</p>
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
          <p className="text-xs mb-2">
            Average Total Aboveground Biomass Trees
          </p>
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
          <p className="text-xs mb-2">Average Diameter Breast Height Trees</p>
          <p className="font-bold text-lg">
            {items?.totalDBHTrees
              ? formatMoney({
                  amount: items?.totalDBHTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm">
              {" "}
              g/cm<sup>3</sup>
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average Wood Density Trees</p>
          <p className="font-bold text-lg">
            {items?.totalWoodDensityTrees
              ? formatMoney({
                  amount: items?.totalWoodDensityTrees,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm">
              {" "}
              g/cm<sup>3</sup>
            </span>
          </p>
        </div>
      </div>

      <div className="w-full border-b-2 border-default-300 my-3"></div>

      <h3 className="text-default-700 font-bold">Belowground Stock</h3>
      <div
        className={`w-full grid grid-cols-1 gap-4 py-3 sm:grid-cols-3 ${!sidebar ? "lg:grid-cols-5" : ""}`}
      >
        {/* lowground */}
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Average % Nitrogen (Soils)</p>
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
          <p className="text-xs mb-2">Average % Carbon (Soils)</p>
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
          <p className="text-xs mb-2">Average Nitrogen (Soils)</p>
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
          <p className="text-xs mb-2">Average Carbon (Soils)</p>
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
      </div>
    </Fragment>
  );
}
