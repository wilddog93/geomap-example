import { SelectTypes } from "@/utils/propTypes";
import { Accordion, AccordionItem, Tab, Tabs } from "@nextui-org/react";
import React, { Fragment, Key, useEffect, useMemo } from "react";
import { MdInfo } from "react-icons/md";
import { SoilsStatBoxPlotProps, SoilsStatisticsProp } from "@/api/soils.api";
import PHCharts from "./PHCharts/PHCharts";
import RedoxCharts from "./RedoxCharts/RedoxCharts";
import PHChartBoxPlot from "./PHCharts/PHChartBoxPlot";

type PropsChart = {
  min_pH: number;
  max_pH: number,
  std_pH: number,
  q1_pH: number,
  q2_pH: number,
  q3_pH: number,
  avg_pH: number;
  site: string;
}

type Props = {
  chartData: SoilsStatisticsProp[];
  sidebar: boolean;
  landCoverKey?: Key | string
};

export default function SoilChemChar1({ chartData, sidebar,landCoverKey }: Props) {

  return (
    <Fragment>
      <div className={`w-full mt-5 ${sidebar ? "" : "hidden"}`}>
        <div className="w-full flex flex-col gap-2 px-2">
          <div className="w-full flex justify-between items-center text-sm">
            <h3 className="text-default-700 font-bold">Latest Record</h3>
            <MdInfo className="w-3 h-4" />
          </div>
          <div className="border-1 border-b border-default-300 w-full"></div>
        </div>
        <Accordion>
          <AccordionItem
            key={`chem-1`}
            aria-label={`chem-1`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>PH</p>
              </div>
            }
            aria-selected="true"
          >
            <div className="w-full flex flex-col relative">
              <PHCharts data={chartData} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`chem-2`}
            aria-label={`chem-2`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>Redox Potential</p>
              </div>
            }
            aria-selected="true"
          >
            <div className="w-full flex flex-col relative">
              <RedoxCharts data={chartData} />
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div
        className={`w-full flex flex-col gap-3 mt-5 ${sidebar ? "hidden" : ""}`}
      >
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-sm">
            <h3 className="text-default-700 font-bold">Latest Record</h3>
            <MdInfo className="w-3 h-4" />
          </div>
          <div className="border-1 border-b border-default-300 w-full"></div>
        </div>

        <div
          className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5`}
        >
          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">PH</h3>
            <PHCharts data={chartData} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Redox Potential
            </h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
