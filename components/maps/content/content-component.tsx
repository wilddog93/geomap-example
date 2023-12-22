import useGHGFluxApi from "@/api/ghg-flux.api";
import { SelectTypes } from "@/utils/propTypes";
import { splitStringTobeArray } from "@/utils/useFunction";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import {
  Autocomplete,
  AutocompleteItem,
  ScrollShadow,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subWeeks,
} from "date-fns";
import { id } from "date-fns/locale";
import React, {
  Fragment,
  Key,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MdCalendarToday } from "react-icons/md";
import HeaderGHGFlux from "./header/header-ghg-flux";
import useSoilsApi from "@/api/soils.api";
import HeaderSoils from "./header/header-soils";
import useWeatherApi from "@/api/weather.api";
import HeaderWeather from "./header/header-weather";
import { useGHGFluxStatisticsMonthlyApi, useGHGFluxStatisticsYearlyApi } from "@/api/ghg-flux-statistics.api";
import GHGChartYearly from "@/components/chart/GHGChart/GHGChartYearly";

type Props = {
  sidebar?: boolean;
  data?: any[] | any;
  locationKey: Key | null;
  locationOptions?: SelectTypes[] | any[];
  categoryKey: Key | null;
  landCoverOptions?: SelectTypes[] | any[];
  periodeKey: Key | null;
  onSelectionPeriodeChange: (key: Key) => void;
  onInputPeriodeChange: (value: string) => void;
  landCoverKey: Key | null;
  onSelectionLandCoverChange: (key: Key) => void;
  onInputLandCoverChange: (value: string) => void;
};

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

const periodeOptions = [
  { label: "Yearly", value: "Yearly" },
  { label: "Monthly", value: "Monthly" },
];

function ContentComponent({
  sidebar,
  data,
  locationKey,
  locationOptions,
  categoryKey,
  landCoverOptions,
  periodeKey,
  landCoverKey,
  onInputPeriodeChange,
  onSelectionPeriodeChange,
  onInputLandCoverChange,
  onSelectionLandCoverChange,
}: Props) {
  const GHGFlux = useGHGFluxApi();
  const Soils = useSoilsApi();
  const Weather = useWeatherApi();

  // chart
  const GHGFluxYearly = useGHGFluxStatisticsYearlyApi();
  const GHGFluxMonthly = useGHGFluxStatisticsMonthlyApi();

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

  // filter periode
  const periodeFilterred = useMemo(() => {
    const currentDate = new Date();
    let start: string | null | any = "";
    let end: string | null | any = "";
    if (periodeKey == "Monthly") {
      start = format(startOfMonth(currentDate), "yyyy-MM-dd");
      end = format(endOfMonth(currentDate), "yyyy-MM-dd");
    } else {
      start = format(startOfYear(currentDate), "yyyy-MM-dd");
      end = format(endOfYear(currentDate), "yyyy-MM-dd");
    }

    return { start, end };
  }, [periodeKey]);
  // filter perioded end

  const getQuery = useMemo(() => {
    let location: string | any = "";
    let landCover: string | any = "";

    if (locationKey) location = getFilterLocation(locationKey as any).state;
    if (landCoverKey) landCover = landCoverKey as any;

    return { location, landCover };
  }, [locationKey, landCoverKey, getFilterLocation]);

  const filterItems = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [
        { location: { $cont: getQuery.location } },
        { type: { $eq: "Total" } },
      ],
    };

    // if (getQuery.location && categoryKey !== "weather data")
    //   search.$and.push({ location: { $cont: getQuery.location } });
    if (periodeKey)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred.start,
          $lte: periodeFilterred.end,
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

  const getGHGFluxAPI = async (params: any) => {
    let newParams = {
      ...params,
      limit: 1000,
    };
    await GHGFlux.fetch({ params: newParams });
  };

  const getSoilsAPI = async (params: any) => {
    let newParams = {
      ...params,
      limit: 1000,
    };
    await Soils.fetch({ params: newParams });
  };

  const getWeatherAPI = async (params: any) => {
    let newParams = {
      ...params,
      limit: 1000,
    };
    await Weather.fetch({ params: newParams });
  };

  useEffect(() => {
    getGHGFluxAPI(filterItems?.queryObject);
    getSoilsAPI(filterItems?.queryObject);
  }, [filterItems]);

  useEffect(() => {
    if (categoryKey == "Weather data (AWS)") {
      getWeatherAPI(filterItems?.queryObject);
    }

    // console.log(categoryKey, "categoryKey")
  }, [landCoverKey, filterItems, categoryKey]);

  // CHART GHG FLUX
  // filter-chart-yearly
  const filterCharts = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ location: { $cont: getQuery.location } }],
    };
    if (periodeKey)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred.start,
          $lte: periodeFilterred.end,
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
    await GHGFluxMonthly.fetch({ params: params });
  };

  useEffect(() => {
    getGHGFluxChart(filterCharts?.queryObject);
  }, [filterCharts]);

  const getChartDataGHGFlux = useMemo(() => {
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
          label: (landCoverKey as string) || "Land cover",
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
          label: (landCoverKey as string) || "Land cover",
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
          label: (landCoverKey as string) || "Land cover",
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
          label: (landCoverKey as string) || "Land cover",
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
          label: (landCoverKey as string) || "Land cover",
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
          label: (landCoverKey as string) || "Land cover",
        },
      ],
    };

    if (GHGFluxYearly.data.length > 0 && landCoverKey && periodeKey == "Yearly") {
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
    } else if (GHGFluxMonthly.data.length > 0 && landCoverKey && periodeKey == "Monthly") {
      GHGFluxMonthly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "yyyy-MM-dd", { locale: id });
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
    } else if (GHGFluxYearly.data.length > 0 && landCoverKey && !periodeKey) {
      GHGFluxYearly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "yyyy-MM-dd", { locale: id });
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
  }, [GHGFluxYearly.data, landCoverKey, GHGFluxMonthly.data, periodeKey]);
  // filter-chart-yearly-end

  return (
    <Fragment>
      <div className="w-full h-full overflow-auto flex flex-col gap-3 mt-5">
        <ScrollShadow hideScrollBar className="w-full h-full">
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-2 items-center px-4 mb-5 gap-2 ${
              !sidebar ? "mt-10" : "mt-5"
            }`}
          >
            <div className="w-full flex flex-col gap-3">
              <h3 className="font-bold text-xl">{data?.location || ""}</h3>
              <ul className="list-disc text-sm">{data?.description || "-"}</ul>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-2">
              <div
                className={`w-full max-w-[12rem] items-center gap-1 ${
                  sidebar ? "hidden" : ""
                }`}
              >
                <Autocomplete
                  radius="full"
                  labelPlacement="outside"
                  placeholder="Select land cover"
                  defaultItems={landCoverOptions}
                  defaultSelectedKey={landCoverKey as Key}
                  variant="faded"
                  color="primary"
                  className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                  allowsCustomValue={true}
                  onSelectionChange={onSelectionLandCoverChange}
                  onInputChange={onInputLandCoverChange}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>

              <div className={`w-full max-w-[12rem] justify-end`}>
                <Autocomplete
                  radius="full"
                  labelPlacement="outside"
                  placeholder="Select periode"
                  defaultItems={periodeOptions}
                  defaultSelectedKey={periodeKey as Key}
                  variant="faded"
                  color="primary"
                  className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                  allowsCustomValue={true}
                  onSelectionChange={onSelectionPeriodeChange}
                  onInputChange={onInputPeriodeChange}
                  startContent={<MdCalendarToday className="w-5 h-5" />}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            </div>
          </div>

          <div
            className={`w-full ${
              !sidebar ? "lg:border-y-2 lg:border-default-300" : ""
            }`}
          >
            {categoryKey == "GHG Fluxes & other variables" ? (
              <HeaderGHGFlux items={GHGFlux?.data} sidebar={sidebar} />
            ) : categoryKey == "Soil psychochemical properties" ? (
              <HeaderSoils items={Soils?.data} sidebar={sidebar} />
            ) : categoryKey == "Weather data (AWS)" ? (
              <HeaderWeather items={Weather?.data} sidebar={sidebar} />
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="w-full flex flex-col">
                  <p className="text-xs mb-2">Parameter 1</p>
                  <p className="font-bold text-lg">55.92</p>
                  <p className="text-xs">Condition/status</p>
                </div>

                <div className="w-full flex flex-col">
                  <p className="text-xs mb-2">Parameter 2</p>
                  <p className="font-bold text-lg">55.92</p>
                  <p className="text-xs">Condition/status</p>
                </div>

                <div className="w-full flex flex-col">
                  <p className="text-xs mb-2">Parameter 3</p>
                  <p className="font-bold text-lg">55.92</p>
                  <p className="text-xs">Condition/status</p>
                </div>

                <div className="w-full flex flex-col">
                  <p className="text-xs mb-2">Parameter 4</p>
                  <p className="font-bold text-lg">55.92</p>
                  <p className="text-xs">Condition/status</p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`w-full items-center gap-1 grid grid-cols-1 my-5 ${
              sidebar ? "lg:grid-cols-3" : "lg:grid-cols-5 hidden"
            }`}
          >
            <Autocomplete
              radius="full"
              labelPlacement="outside"
              placeholder="Select land cover"
              defaultItems={landCoverOptions}
              defaultSelectedKey={landCoverKey as Key}
              variant="faded"
              color="primary"
              className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
              allowsCustomValue={true}
              onSelectionChange={onSelectionLandCoverChange}
              onInputChange={onInputLandCoverChange}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          {categoryKey == "GHG Fluxes & other variables" ? (
            <GHGChartYearly
              chartData={getChartDataGHGFlux}
              sidebar={sidebar as boolean}
              landCoverKey={landCoverKey}
              locationKey={locationKey}
              periodeKey={periodeKey}
            />
          ) : null}
        </ScrollShadow>
      </div>
    </Fragment>
  );
}

export default ContentComponent;
