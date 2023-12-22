import useGHGFluxStatisticsYearlyApi from "@/api/ghg-flux-statistics-yearly.api";
import { SelectTypes } from "@/utils/propTypes";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { Fragment, Key, useCallback, useEffect, useMemo } from "react";
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

type Props = {
  sidebar: boolean;
  locationKey: Key | null;
  landCoverKey: Key | null;
  categoryKey: Key | null;
  periodeKey: Key | null;
  locationOptions?: SelectTypes[] | any[];
  periodeFilterred: {
    start: string;
    end: string;
  };
};

export default function GHGChartYearly({
  sidebar,
  locationKey,
  landCoverKey,
  categoryKey,
  periodeKey,
  locationOptions,
  periodeFilterred,
}: Props) {
  // cchart
  const GHGFluxYearly = useGHGFluxStatisticsYearlyApi();

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

  const dataYearly = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agt",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        tension: 0.4,
        fill: true,
        label: landCoverKey as string,
      },
    ],
  };

  const dataMonthly = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [10, 50, 100, 70, 20, 50, 80, 70, 15, 20, 10, 100],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        tension: 0.4,
        fill: true,
        label: "Grapic Chart",
      },
    ],
  };

  const dataWeekly = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Friday", "Sat"],
    datasets: [
      {
        data: [10, 50, 100, 70, 20, 50, 80],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        tension: 0.4,
        fill: true,
        label: "Grapic Chart",
      },
    ],
  };

  const getFilterLocation = useCallback(
    (key: Key) => {
      let state = locationOptions
        ?.filter((item) => item.location == key)
        .map((item) => item.state)
        .toString();
      return { state };
    },
    [locationOptions]
  );

  const getQuery = useMemo(() => {
    let location: string | any = "";
    let landCover: string | any = "";

    if (locationKey) location = getFilterLocation(locationKey as any).state;
    if (landCoverKey) landCover = landCoverKey as any;

    return { location, landCover };
  }, [locationKey, landCoverKey, getFilterLocation]);

  // filter-chart
  const filterCharts = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ location: { $cont: getQuery.location } }],
    };
    if (periodeKey)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred?.start,
          $lte: periodeFilterred?.end,
        },
      });
    if (getQuery.landCover && categoryKey !== "Weather data (AWS)")
      search?.$and?.push({ landCover: { $eq: getQuery.landCover } });

    qb.search(search);
    qb.sortBy({
      field: `date`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery, periodeFilterred, categoryKey, periodeKey]);

  const getGHGFluxChart = async (params: any) => {
    await GHGFluxYearly.fetch({ params: params });
  };

  useEffect(() => {
    getGHGFluxChart(filterCharts?.queryObject);
  }, [filterCharts]);

  const getChartGHGFluxYearly = useMemo(() => {
    let chartLabel = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agt",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    let chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let airTemperature: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: "Air Temperature",
        },
      ],
    };
    let soilTemperature: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: "Soil Temperature",
        },
      ],
    };
    let soilMoisture: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: "Soil Moisture",
        },
      ],
    };
    let waterTable: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: "Water Table",
        },
      ],
    };
    let ch4: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: "CH4",
        },
      ],
    };
    let co2: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: "CO2",
        },
      ],
    };

    if (GHGFluxYearly.data.length > 0 && landCoverKey) {
      GHGFluxYearly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "LLL", { locale: id });
        airTemperature.labels.push(date);
        airTemperature.datasets[0].data.push(item.avg_airTemperature);

        soilTemperature.labels.push(date);
        soilTemperature.datasets[0].data.push(item.avg_soilTemperature);

        soilMoisture.labels.push(date);
        soilMoisture.datasets[0].data.push(item.avg_soilMoisture);

        waterTable.labels.push(date);
        waterTable.datasets[0].data.push(item.avg_waterTable);

        ch4.labels.push(date);
        ch4.datasets[0].data.push(item.avg_ch4);

        co2.labels.push(date);
        co2.datasets[0].data.push(item.avg_co2);
      });
    } else {
      airTemperature.labels = chartLabel;
      airTemperature.datasets[0].data = chartData;

      soilTemperature.labels = chartLabel;
      soilTemperature.datasets[0].data = chartData;

      soilMoisture.labels = chartLabel;
      soilMoisture.datasets[0].data = chartData;

      waterTable.labels = chartLabel;
      waterTable.datasets[0].data = chartData;

      ch4.labels = chartLabel;
      ch4.datasets[0].data = chartData;

      co2.labels = chartLabel;
      co2.datasets[0].data = chartData;
    }

    // airTemperature = dataYearly;
    return {
      airTemperature,
      soilTemperature,
      soilMoisture,
      waterTable,
      ch4,
      co2,
    };
  }, [GHGFluxYearly.data, landCoverKey]);
  // filter-chart-end
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
                data={getChartGHGFluxYearly.airTemperature}
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
                data={getChartGHGFluxYearly.soilTemperature}
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
                data={getChartGHGFluxYearly.soilMoisture}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            hideIndicator={landCoverKey ? true : false}
            key={`${landCoverKey}-4`}
            aria-label={`${landCoverKey}-4`}
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {landCoverKey ? landCoverKey : "Parameter 4"}
                </h3>
                <p className={`text-xs ${landCoverKey ? "" : "hidden"}`}>
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
                data={getChartGHGFluxYearly.waterTable}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            hideIndicator={landCoverKey ? true : false}
            key={`${landCoverKey}-5`}
            aria-label={`${landCoverKey}-5`}
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {landCoverKey ? landCoverKey : "Parameter 5"}
                </h3>
                <p className={`text-xs ${landCoverKey ? "" : "hidden"}`}>
                  <span>
                    Ch<sup>4</sup>
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={getChartGHGFluxYearly.ch4}
              />
            </div>
          </AccordionItem>

          <AccordionItem
            hideIndicator={landCoverKey ? true : false}
            key={`${landCoverKey}-6`}
            aria-label={`${landCoverKey}-6`}
            title={
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">
                  {landCoverKey ? landCoverKey : "Parameter 6"}
                </h3>
                <p className={`text-xs ${landCoverKey ? "" : "hidden"}`}>
                  <span>
                    Co<sup>2</sup>
                  </span>
                </p>
              </div>
            }
          >
            <div className="w-full flex flex-col relative">
              <h3 className="font-semibold text-xs -mb-5">{periodeKey}</h3>
              <AreaCharts
                height="300"
                options={options}
                data={getChartGHGFluxYearly.co2}
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
              data={getChartGHGFluxYearly.airTemperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={getChartGHGFluxYearly.soilTemperature}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={getChartGHGFluxYearly.soilMoisture}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={getChartGHGFluxYearly.waterTable}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={getChartGHGFluxYearly.ch4}
            />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">{landCoverKey}</h3>
            <AreaCharts
              height="300"
              options={options}
              data={getChartGHGFluxYearly.co2}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
