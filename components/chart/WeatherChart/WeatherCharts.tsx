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
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Temperature
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.temperature}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-2`}
            aria-label={`${landCoverKey}-2`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Relative Humidity
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.relativeHumidity}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-3`}
            aria-label={`${landCoverKey}-3`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Solar Radiation
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.solarRadiation}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-4`}
            aria-label={`${landCoverKey}-4`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Wind Speed
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.windSpeed}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-5`}
            aria-label={`${landCoverKey}-5`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Gust Speed
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.gustSpeed}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-6`}
            aria-label={`${landCoverKey}-6`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Wind Direction
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={chartData.windDirection}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            key={`${landCoverKey}-7`}
            aria-label={`${landCoverKey}-7`}
            title={
              <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold ${landCoverKey ? "" : "hidden"}`}>
                  Rain
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
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
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Temperature</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.temperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Relative Humidity</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.relativeHumidity}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Solar Radiation</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.solarRadiation}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Wind Speed</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.windSpeed}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Gust Speed</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.gustSpeed}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Wind Direction</h3>
            <AreaCharts
              height="300"
              options={options}
              data={chartData.windDirection}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">Rain</h3>
            <AreaCharts height="300" options={options} data={chartData.rain} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
