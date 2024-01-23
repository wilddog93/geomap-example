import { SelectTypes } from "@/utils/propTypes";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { Fragment, Key } from "react";
import { MdInfo } from "react-icons/md";
import AreaCharts from "../AreaCharts";
import BarCharts from "../BarCharts";

type dataSetProps = {
  data: number[] | any[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number | 0.1;
  fill: boolean | false;
  label: string | "Label";
  borderRadius?: number | string
};

export type PropsChart = {
  labels: string[];
  datasets: dataSetProps[];
};

type ChartDataProps = {
  temperature: PropsChart;
  relativeHumidity: PropsChart;
  solarRadiation: PropsChart;
  windSpeed: PropsChart;
  gustSpeed: PropsChart;
  windDirection: PropsChart;
  rain: PropsChart;
};

type Props = {
  chartData: ChartDataProps;
  sidebar: boolean;
  landCoverKey: Key | null;
  periodeKey: Key | null;
  locationKey: Key | null;
};

export default function WeatherCharts({
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
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} ˚c`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: '(˚c) celcius',
        },
      },
    },
  };

  const optionsPercent = {
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
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} %`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: '(%) percent',
        },
      },
    },
  };

  const optionsRadiation = {
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
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} W/m²`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'W/m²',
        },
      },
    },
  };

  const optionsSpeed = {
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
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} mph`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'mph',
        },
      },
    },
  };

  const optionsDirection = {
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
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} ø`
          }
        }
      },
    },
  };

  const optionsRain = {
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
            return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} mm`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: 'mm',
        },
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
                <p className={`text-sm font-semibold`}>
                  Temperature <span>(˚C)</span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-2">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={optionsTemperature}
                data={chartData.temperature}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-2`}
            aria-label={`${landCoverKey}-2`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>
                  Relative Humidity <span>(%)</span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-2">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={optionsPercent}
                data={chartData.relativeHumidity}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-3`}
            aria-label={`${landCoverKey}-3`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>
                  Solar Radiation <span>(W/m<sup>2</sup>)</span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-2">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={optionsRadiation}
                data={chartData.solarRadiation}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-4`}
            aria-label={`${landCoverKey}-4`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>
                  Wind Speed <span>(mph)</span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-2">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={optionsSpeed}
                data={chartData.windSpeed}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-5`}
            aria-label={`${landCoverKey}-5`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>
                  Gust Speed <span>(mph)</span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-2">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={optionsSpeed}
                data={chartData.gustSpeed}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-7`}
            aria-label={`${landCoverKey}-7`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold`}>
                  Rainfall <span>(mm)</span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-2">{periodeKey}</h3>
              <BarCharts
                height="300"
                options={optionsRain}
                data={chartData.rain}
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
            <h3 className="font-semibold text-xs lg:text-sm -mb-2">Temperature <span>(˚C)</span></h3>
            <AreaCharts
              height="300"
              options={optionsTemperature}
              data={chartData.temperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-2">Relative Humidity <span>(%)</span></h3>
            <AreaCharts
              height="300"
              options={optionsPercent}
              data={chartData.relativeHumidity}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-2">Solar Radiation <span>(W/m<sup>2</sup>)</span></h3>
            <AreaCharts
              height="300"
              options={optionsRadiation}
              data={chartData.solarRadiation}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-2">Wind Speed <span>(mph)</span></h3>
            <AreaCharts
              height="300"
              options={optionsSpeed}
              data={chartData.windSpeed}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-2">Gust Speed <span>(mph)</span></h3>
            <AreaCharts
              height="300"
              options={optionsSpeed}
              data={chartData.gustSpeed}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-2">Rainfall <span>(mm)</span></h3>
            <BarCharts height="300" options={optionsRain} data={chartData.rain} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
