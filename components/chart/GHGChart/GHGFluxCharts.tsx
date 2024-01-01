import { SelectTypes } from "@/utils/propTypes";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { Fragment, Key } from "react";
import { MdInfo } from "react-icons/md";
import AreaCharts from "../AreaCharts";

type dataSetProps = {
  data: number[] | any[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number | 0.1;
  fill: boolean | false;
  label: string | "Label";
  borderRadius?: number | string;
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
  heterothropicCo2: PropsChart;
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

  const optionsTemperature = {
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
      tooltip: {
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function (item: any) {
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} ˚C`
          }
        }
      },
    },
  };

  const optionsSoil = {
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
      tooltip: {
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function (item: any) {
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} m³/m³`
          }
        }
      },
    },
  };

  const optionsWater = {
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
      tooltip: {
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function (item: any) {
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} cm`
          }
        }
      },
    },
  };

  const optionsCo2 = {
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
      tooltip: {
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function (item: any) {
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} tCO₂ ha⁻¹ yr⁻¹`
          }
        }
      },
    },
  };

  const optionsCh4 = {
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
      tooltip: {
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function (item: any) {
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} tCO₂e ha⁻¹ yr⁻¹`
          }
        }
      },
    },
  };

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
      tooltip: {
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function (item: any) {
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} Total`
          }
        }
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
                  className={`text-sm font-semibold`}
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
                options={optionsTemperature}
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
                  className={`text-sm font-semibold`}
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
                options={optionsTemperature}
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
                  className={`text-sm font-semibold`}
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
                options={optionsSoil}
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
                  className={`text-sm font-semibold`}
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
                options={optionsWater}
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
                  className={`text-sm font-semibold`}
                >
                  <span>
                    {/* CH<sub>4</sub> */}
                    Methane Flux
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts height="300" options={optionsCh4} data={chartData.ch4} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-6`}
            aria-label={`${landCoverKey}-6`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold`}
                >
                  <span>
                    {/* CO<sub>2</sub> */}
                    Total Respiration
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts height="300" options={optionsCo2} data={chartData.co2} />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-7`}
            aria-label={`${landCoverKey}-7`}
            title={
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-semibold`}
                >
                  <span>
                    {/* CO<sub>2</sub> */}
                    Heterothropic Respiration
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts height="300" options={optionsCo2} data={chartData.co2} />
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
              options={optionsTemperature}
              data={chartData.airTemperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soil Temperature
            </h3>
            <AreaCharts
              height="300"
              options={optionsTemperature}
              data={chartData.soilTemperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soil Moisture
            </h3>
            <AreaCharts
              height="300"
              options={optionsSoil}
              data={chartData.soilMoisture}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Water Table
            </h3>
            <AreaCharts
              height="300"
              options={optionsWater}
              data={chartData.waterTable}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              {/* Ch<sup>4</sup> */}
              Methane Flux
            </h3>
            <AreaCharts height="300" options={optionsCh4} data={chartData.ch4} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              {/* Co<sup>2</sup> */}
              Total Respiration
            </h3>
            <AreaCharts height="300" options={optionsCo2} data={chartData.co2} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              {/* Co<sup>2</sup> */}
              Heterothropic Respiration
            </h3>
            <AreaCharts height="300" options={optionsCo2} data={chartData.heterothropicCo2} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
