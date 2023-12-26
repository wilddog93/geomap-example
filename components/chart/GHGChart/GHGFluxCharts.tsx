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
  airTemperature: PropsChart;
  soilTemperature: PropsChart;
  soilMoisture: PropsChart;
  waterTable: PropsChart;
  ch4: PropsChart;
  co2: PropsChart;
};

type Props = {
  chartData: ChartDataProps;
  sidebar: boolean;
  landCoverKey: Key | null;
  periodeKey: Key | null;
  locationKey: Key | null;
};

export default function GHGFluxCharts({
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
            key={`${landCoverKey}-1`}
            aria-label={`${landCoverKey}-1`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    landCoverKey ? "" : "hidden"
                  }`}
                >
                  Air Temperature
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.airTemperature}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-2`}
            aria-label={`${landCoverKey}-2`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    landCoverKey ? "" : "hidden"
                  }`}
                >
                  Soil Temperature
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.soilTemperature}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-3`}
            aria-label={`${landCoverKey}-3`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    landCoverKey ? "" : "hidden"
                  }`}
                >
                  Soil Moisture
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.soilMoisture}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-4`}
            aria-label={`${landCoverKey}-4`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    landCoverKey ? "" : "hidden"
                  }`}
                >
                  Water Table
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.waterTable}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-5`}
            aria-label={`${landCoverKey}-5`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    landCoverKey ? "" : "hidden"
                  }`}
                >
                  <span>
                    Ch<sup>4</sup>
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts height="300" options={options} data={chartData.ch4} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-6`}
            aria-label={`${landCoverKey}-6`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold ${
                    landCoverKey ? "" : "hidden"
                  }`}
                >
                  <span>
                    Co<sup>2</sup>
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts height="300" options={options} data={chartData.co2} />
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
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Air Temperature
            </h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.airTemperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soil Temperature
            </h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.soilTemperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soil Moisture
            </h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.soilMoisture}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Water Table
            </h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.waterTable}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Ch<sup>4</sup>
            </h3>
            <AreaCharts height="300" options={options} data={chartData.ch4} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Co<sup>2</sup>
            </h3>
            <AreaCharts height="300" options={options} data={chartData.co2} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
