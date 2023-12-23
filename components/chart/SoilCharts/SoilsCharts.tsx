import { SelectTypes } from "@/utils/propTypes";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { Fragment, Key } from "react";
import { MdInfo } from "react-icons/md";
import AreaCharts from "../AreaCharts";

type dataSetProps = {
  data: number[] | any[];
  borderColor?: string;
  backgroundColor?: string;
  tension: number | 0.1;
  fill: boolean | false;
  label: string | "Label";
};

export type PropsChart = {
  labels: string[];
  datasets: dataSetProps[];
};

type ChartDataProps = {
  bulkDensity: PropsChart;
  gravimetricWaterContent: PropsChart;
  volumetricWaterContent: PropsChart;
};

type Props = {
  chartData: ChartDataProps;
  sidebar: boolean;
  landCoverKey: Key | null;
  periodeKey: Key | null;
  locationKey: Key | null;
};

export default function SoilsCharts({
  chartData,
  sidebar,
  landCoverKey,
  periodeKey,
}: Props) {
  // cchart

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "end" as const,
        labels: {
          borderRadius: 3,
          boxWidth: 16,
          useBorderRadius: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
        position: "top" as const,
        text: "Chart.js Line Chart",
        align: "start" as const,
      },
    },
  };
  return (
    <Fragment>
      <div className={`w-full ${sidebar ? "" : "hidden"}`}>
        <Accordion>
          <AccordionItem
            key="parameter-0"
            aria-label="parameter-0"
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold">Latest Record</h3>
              </div>
            }
            indicator={<MdInfo className="w-3 h-4" />}
            disableIndicatorAnimation
          />
          <AccordionItem
            hideIndicator={landCoverKey ? true : false}
            key={`${landCoverKey}-1`}
            aria-label={`${landCoverKey}-1`}
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {landCoverKey ? landCoverKey : "Parameter 1"}
                </h3>
                <p className={`text-xs ${landCoverKey ? "" : "hidden"}`}>
                  Bulk Density
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.bulkDensity}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            hideIndicator={landCoverKey ? true : false}
            key={`${landCoverKey}-2`}
            aria-label={`${landCoverKey}-2`}
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {landCoverKey ? landCoverKey : "Parameter 2"}
                </h3>
                <p className={`text-xs ${landCoverKey ? "" : "hidden"}`}>
                  Gravimetric Water Content
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.gravimetricWaterContent}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            hideIndicator={landCoverKey ? true : false}
            key={`${landCoverKey}-3`}
            aria-label={`${landCoverKey}-3`}
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {landCoverKey ? landCoverKey : "Parameter 3"}
                </h3>
                <p className={`text-xs ${landCoverKey ? "" : "hidden"}`}>
                  volumetric Water Content
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.volumetricWaterContent}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full flex flex-col gap-3 mt-5">
        <div
          className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-2 py-5 ${
            sidebar ? "hidden" : ""
          }`}
        >
          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.bulkDensity}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.gravimetricWaterContent}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.volumetricWaterContent}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
