import { GHGFlux } from "@/api/ghg-flux.api";
import { formatMoney } from "@/utils/useFunction";
import React, { Fragment, useMemo } from "react";

interface GHGFluxProps {
  items: {
    totalAirTemperature?: number | any;
    totalSoilTemperature?: number | any;
    totalSoilMoisture?: number | any;
    totalWaterTable?: number | any;
    totalCh4?: number | any;
    totalCo2?: number | any;
  };
  sidebar?: boolean;
}

export default function HeaderGHGFlux({ items, sidebar }: GHGFluxProps) {
  return (
    <Fragment>
      <div
        className={`w-full grid grid-cols-1 gap-4 py-3 ${
          sidebar
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-3 lg:grid-cols-6"
        }`}
      >
        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Air Temperature (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalAirTemperature
              ? formatMoney({
                  amount: items?.totalAirTemperature,
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
          <p className="text-xs mb-2">Soil Temperature (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalSoilTemperature
              ? formatMoney({
                  amount: items?.totalSoilTemperature,
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
          <p className="text-xs mb-2">Soil Moisture (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalSoilMoisture
              ? formatMoney({
                  amount: items?.totalSoilMoisture,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm">
              {" "}
              (m<sup>3</sup>/m<sup>3</sup>)
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">Water Table (AVG)</p>
          <p className="font-bold text-lg">
            {items?.totalWaterTable
              ? formatMoney({
                  amount: items?.totalWaterTable,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm"> cm</span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">
            Ch <sup>4</sup> (AVG)
          </p>
          <p className="font-bold text-lg">
            {items?.totalCh4
              ? formatMoney({
                  amount: items?.totalCh4,
                  decimalCount: 2,
                })
              : 0}
            <span className="text-sm">
              {"  "} (tCO<sub>2</sub> ha<sup>-1</sup> yr<sup>-1</sup>)
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs mb-2">
            Co <sup>2</sup> (AVG)
          </p>
          <p className="font-bold text-lg">
            {items?.totalCo2
              ? formatMoney({
                  amount: items?.totalCo2,
                  decimalCount: 2,
                })
              : 0}
              <span className="text-sm">
              {"  "} (tCO<sub>2</sub>e ha<sup>-1</sup> yr<sup>-1</sup>)
            </span>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
