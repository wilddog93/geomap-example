import { SelectTypes } from "@/utils/propTypes";
import { Accordion, AccordionItem, Tab, Tabs } from "@nextui-org/react";
import React, { Fragment, Key, useEffect, useMemo } from "react";
import { MdInfo } from "react-icons/md";
import { SoilsStatisticsProp } from "@/api/soils.api";
import PHCharts from "./PHCharts/PHCharts";
import RedoxCharts from "./RedoxCharts/RedoxCharts";
import KaliumCharts from "./KaliumCharts/KaliumCharts";
import CationExCharts from "./CationExCharts/CationExCharts";
import PhosporousCharts from "./PhosporousCharts/PhosporousCharts";
import CarbonCharts from "./CarbonCharts/CarbonCharts";

type Props = {
  chartData: SoilsStatisticsProp[];
  sidebar: boolean;
};

export default function SoilChemChar2({ chartData, sidebar }: Props) {
  // cchart

  // carbon-stock

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

          <AccordionItem
            key={`chem-3`}
            aria-label={`chem-3`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>Kalium Content</p>
              </div>
            }
            aria-selected="true"
          >
            <div className="w-full flex flex-col relative">
              <KaliumCharts data={chartData} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`chem-4`}
            aria-label={`chem-4`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>Cation Exchange Capacity</p>
              </div>
            }
            aria-selected="true"
          >
            <div className="w-full flex flex-col relative">
              <CationExCharts data={chartData} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`chem-5`}
            aria-label={`chem-5`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>Phosporous Pentoxide Content</p>
              </div>
            }
            aria-selected="true"
          >
            <div className="w-full flex flex-col relative">
              <PhosporousCharts data={chartData} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`chem-6`}
            aria-label={`chem-6`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>Carbon Content</p>
              </div>
            }
            aria-selected="true"
          >
            <div className="w-full flex flex-col relative">
              <CarbonCharts data={chartData} />
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
            <RedoxCharts data={chartData} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Kalium Content
            </h3>
            <KaliumCharts data={chartData} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Cation Exchange Capacity
            </h3>
            <CationExCharts data={chartData} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Phosporous Pentoxide Content
            </h3>
            <PhosporousCharts data={chartData} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Carbon Content
            </h3>
            <CarbonCharts data={chartData} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
