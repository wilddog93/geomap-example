import { SelectTypes } from "@/utils/propTypes";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import {
  Autocomplete,
  AutocompleteItem,
  ScrollShadow,
} from "@nextui-org/react";
import { endOfYear, format, startOfYear } from "date-fns";
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

// API
import {
  useGHGFluxStatisticsMonthlyApi,
  useGHGFluxStatisticsYearlyApi,
} from "@/api/ghg-flux.api";
import {
  useSoilsStatisticsMonthlyApi,
  useSoilsStatisticsYearlyApi,
} from "@/api/soils.api";
import {
  useWeatherStatisticsMonthlyApi,
  useWeatherStatisticsYearlyApi,
} from "@/api/weather.api";

// component
import GHGFluxCharts from "@/components/chart/GHGChart/GHGFluxCharts";
import SoilsCharts from "@/components/chart/SoilCharts/SoilsCharts";
import WeatherCharts from "@/components/chart/WeatherChart/WeatherCharts";
// component-header
import HeaderWeather from "./header/header-weather";
import HeaderGHGFlux from "./header/header-ghg-flux";
import HeaderSoils from "./header/header-soils";
import {
  useCarbonLittersStatisticsApi,
  useCarbonSoilsStatisticsApi,
  useCarbonTreesStatisticsApi,
  useCarbonWoodyStatisticsMonthlyApi,
  useCarbonWoodyStatisticsYearlyApi,
} from "@/api/carbon-stocks.api";
import CarbonStockCharts from "@/components/chart/CarbonStockChart/CarbonStockCharts";
import HeaderCarbon from "./header/header-carbon";

// date-piceker
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import SoilChemChar1 from "@/components/chart/SoilChemCharts/SoilChemChart1";
import SoilChemChar2 from "@/components/chart/SoilChemCharts/SoilChemChart2";
import SoilChemChar3 from "@/components/chart/SoilChemCharts/SoilChemChart3";

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
  tension?: number | 0.1;
  fill: boolean | false;
  label: string | "Label";
  borderRadius?: number | string;
};

export type PropsChart = {
  labels: string[];
  datasets: dataSetProps[];
};

const soilTypeOptions: SelectTypes[] = [
  {
    value: "physical",
    label: "Physical",
  },
  {
    value: "chemChar1",
    label: "Chemistry Char 1",
  },
  {
    value: "chemChar2",
    label: "Chemistry Char 2",
  },
  {
    value: "chemChar3",
    label: "Chemistry Char 3",
  },
];

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
  // chart
  const GHGFluxYearly = useGHGFluxStatisticsYearlyApi();
  const GHGFluxMonthly = useGHGFluxStatisticsMonthlyApi();
  const SoilsYearly = useSoilsStatisticsYearlyApi();
  const SoilsMonthly = useSoilsStatisticsMonthlyApi();
  const WeatherYearly = useWeatherStatisticsYearlyApi();
  const WeatherMonthly = useWeatherStatisticsMonthlyApi();

  // carbon-stock
  const WoodyYearly = useCarbonWoodyStatisticsYearlyApi();
  const LitterChartApi = useCarbonLittersStatisticsApi();
  const SoilChartApi = useCarbonSoilsStatisticsApi();
  const TreesChartApi = useCarbonTreesStatisticsApi();

  const now = new Date();
  const [periodeDate, setPeriodeDate] = useState(new Date());
  const [start, setStart] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const [end, setEnd] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0)
  );
  const [dateRange, setDateRange] = useState<Date[] | any[]>([start, end]);
  const [startDate, endDate] = dateRange;

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
    let start: string | null | any = "";
    let end: string | null | any = "";
    if (periodeKey == "Monthly") {
      start = startDate ? format(new Date(startDate), "yyyy-MM-dd") : "";
      end = endDate ? format(new Date(endDate), "yyyy-MM-dd") : "";
    } else if (periodeKey == "Yearly") {
      start = periodeDate ? format(startOfYear(periodeDate), "yyyy-MM-dd") : "";
      end = periodeDate ? format(endOfYear(periodeDate), "yyyy-MM-dd") : "";
    }

    return { start, end };
  }, [periodeKey, periodeDate, startDate, endDate]);
  // filter perioded end

  const getQuery = useMemo(() => {
    let location: string | any = "";
    let landCover: string | any = "";

    if (locationKey) location = getFilterLocation(locationKey as any).state;
    if (landCoverKey) landCover = landCoverKey as any;

    return { location, landCover };
  }, [locationKey, landCoverKey, getFilterLocation]);

  // chart
  // filter
  const filterChartsGHG = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ location: { $cont: getQuery.location } }],
    };
    if (periodeKey && periodeFilterred.start)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred.start,
          $lte: periodeFilterred.end,
        },
      });
    if (getQuery.landCover)
      search?.$and?.push({ landCover: { $eq: getQuery.landCover } });

    qb.search(search);
    qb.sortBy({
      field: `date`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery, periodeFilterred, categoryKey, periodeKey]);

  const filterChartWeather = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ location: { $cont: getQuery.location } }],
    };
    if (periodeKey && periodeFilterred.start)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred?.start || "",
          $lte: periodeFilterred?.end || "",
        },
      });

    qb.search(search);
    qb.sortBy({
      field: `date`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery, periodeFilterred, periodeKey]);
  // filter-end

  // console.log(periodeFilterred, "result-periode");

  // funcction sum average
  const getSums = (value: number[]) => {
    return value.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  };

  const getGHGFluxChart = async (params: any) => {
    await GHGFluxYearly.fetch({ params: params });
    await GHGFluxMonthly.fetch({ params: params });
  };

  useEffect(() => {
    if (categoryKey == "GHG Fluxes & other variables")
      getGHGFluxChart(filterChartsGHG.queryObject);
  }, [filterChartsGHG, categoryKey]);

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
    let heterothropicCo2: PropsChart = {
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

    if (
      GHGFluxYearly.data.length > 0 &&
      periodeKey == "Yearly" &&
      landCoverKey
    ) {
      GHGFluxYearly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "MMM yy");
        airTemperature.labels.push(date);
        airTemperature.datasets[0].data.push(item.avg_airTemperature);
        airTemperature.datasets[0].label = item.land_cover;

        soilTemperature.labels.push(date);
        soilTemperature.datasets[0].data.push(item.avg_soilTemperature);
        soilTemperature.datasets[0].label = item.land_cover;

        soilMoisture.labels.push(date);
        soilMoisture.datasets[0].data.push(item.avg_soilMoisture);
        soilMoisture.datasets[0].label = item.land_cover;

        waterTable.labels.push(date);
        waterTable.datasets[0].data.push(item.avg_waterTable);
        waterTable.datasets[0].label = item.land_cover;

        ch4.labels.push(date);
        ch4.datasets[0].data.push(item.avg_ch4);
        ch4.datasets[0].label = item.land_cover;

        co2.labels.push(date);
        co2.datasets[0].data.push(item.avg_co2);
        co2.datasets[0].label = item.land_cover;

        heterothropicCo2.labels.push(date);
        heterothropicCo2.datasets[0].data.push(item.avg_heterothropic_co2);
        heterothropicCo2.datasets[0].label = item.land_cover;
      });
    } else if (
      GHGFluxMonthly.data.length > 0 &&
      periodeKey == "Monthly" &&
      landCoverKey
    ) {
      GHGFluxMonthly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "dd MMM yy", {
          locale: id,
        });
        airTemperature.labels.push(date);
        airTemperature.datasets[0].data.push(item.avg_airTemperature);
        airTemperature.datasets[0].label = item.land_cover;

        soilTemperature.labels.push(date);
        soilTemperature.datasets[0].data.push(item.avg_soilTemperature);
        soilTemperature.datasets[0].label = item.land_cover;

        soilMoisture.labels.push(date);
        soilMoisture.datasets[0].data.push(item.avg_soilMoisture);
        soilMoisture.datasets[0].label = item.land_cover;

        waterTable.labels.push(date);
        waterTable.datasets[0].data.push(item.avg_waterTable);
        waterTable.datasets[0].label = item.land_cover;

        ch4.labels.push(date);
        ch4.datasets[0].data.push(item.avg_ch4);
        ch4.datasets[0].label = item.land_cover;

        co2.labels.push(date);
        co2.datasets[0].data.push(item.avg_co2);
        co2.datasets[0].label = item.land_cover;

        heterothropicCo2.labels.push(date);
        heterothropicCo2.datasets[0].data.push(item.avg_heterothropic_co2);
        heterothropicCo2.datasets[0].label = item.land_cover;
      });
    } else if (GHGFluxYearly.data.length > 0 && landCoverKey && !periodeKey) {
      GHGFluxYearly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "MMM yy", {
          locale: id,
        });
        airTemperature.labels.push(date);
        airTemperature.datasets[0].data.push(item.avg_airTemperature);
        airTemperature.datasets[0].label = item.land_cover;

        soilTemperature.labels.push(date);
        soilTemperature.datasets[0].data.push(item.avg_soilTemperature);
        soilTemperature.datasets[0].label = item.land_cover;

        soilMoisture.labels.push(date);
        soilMoisture.datasets[0].data.push(item.avg_soilMoisture);
        soilMoisture.datasets[0].label = item.land_cover;

        waterTable.labels.push(date);
        waterTable.datasets[0].data.push(item.avg_waterTable);
        waterTable.datasets[0].label = item.land_cover;

        ch4.labels.push(date);
        ch4.datasets[0].data.push(item.avg_ch4);
        ch4.datasets[0].label = item.land_cover;

        co2.labels.push(date);
        co2.datasets[0].data.push(item.avg_co2);
        co2.datasets[0].label = item.land_cover;
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

      heterothropicCo2.labels = chartLabel;
      heterothropicCo2.datasets[0].data = chartData;
    }

    // airTemperature = dataYearly;
    return {
      airTemperature,
      soilTemperature,
      soilMoisture,
      waterTable,
      ch4,
      co2,
      heterothropicCo2,
    };
  }, [
    GHGFluxYearly.data,
    landCoverKey,
    GHGFluxMonthly.data,
    periodeKey,
    categoryKey,
  ]);

  const getSumChartDataGHGFlux = useMemo(() => {
    let totalAirTemperature: number = 0;
    let totalSoilTemperature: number = 0;
    let totalSoilMoisture: number = 0;
    let totalWaterTable: number = 0;
    let totalCh4: number = 0;
    let totalCo2: number = 0;
    let totalHeterothropicCo2: number = 0;

    if (landCoverKey) {
      if (GHGFluxYearly.data.length > 0 && periodeKey == "Yearly") {
        totalAirTemperature =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_airTemperature)) /
          GHGFluxYearly.data?.map((e) => e.avg_airTemperature).length;
        totalSoilTemperature =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_soilTemperature)) /
          GHGFluxYearly.data?.map((e) => e.avg_soilTemperature).length;
        totalSoilMoisture =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_soilMoisture)) /
          GHGFluxYearly.data?.map((e) => e.avg_soilMoisture).length;
        totalWaterTable =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_waterTable)) /
          GHGFluxYearly.data?.map((e) => e.avg_waterTable).length;
        totalCh4 =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_ch4)) /
          GHGFluxYearly.data?.map((e) => e.avg_ch4).length;
        totalCo2 =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_co2)) /
          GHGFluxYearly.data?.map((e) => e.avg_co2).length;
        totalHeterothropicCo2 =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_heterothropic_co2)) /
          GHGFluxYearly.data?.map((e) => e.avg_heterothropic_co2).length;
      } else if (GHGFluxMonthly.data.length > 0 && periodeKey == "Monthly") {
        totalAirTemperature =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_airTemperature)) /
          GHGFluxMonthly.data?.map((e) => e.avg_airTemperature).length;
        totalSoilTemperature =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_soilTemperature)) /
          GHGFluxMonthly.data?.map((e) => e.avg_soilTemperature).length;
        totalSoilMoisture =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_soilMoisture)) /
          GHGFluxMonthly.data?.map((e) => e.avg_soilMoisture).length;
        totalWaterTable =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_waterTable)) /
          GHGFluxMonthly.data?.map((e) => e.avg_waterTable).length;
        totalCh4 =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_ch4)) /
          GHGFluxMonthly.data?.map((e) => e.avg_ch4).length;
        totalCo2 =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_co2)) /
          GHGFluxMonthly.data?.map((e) => e.avg_co2).length;
        totalHeterothropicCo2 =
          getSums(GHGFluxMonthly.data?.map((e) => e.avg_heterothropic_co2)) /
          GHGFluxMonthly.data?.map((e) => e.avg_heterothropic_co2).length;
      } else if(GHGFluxYearly.data.length > 0 && !periodeKey) {
        totalAirTemperature =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_airTemperature)) /
          GHGFluxYearly.data?.map((e) => e.avg_airTemperature).length;
        totalSoilTemperature =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_soilTemperature)) /
          GHGFluxYearly.data?.map((e) => e.avg_soilTemperature).length;
        totalSoilMoisture =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_soilMoisture)) /
          GHGFluxYearly.data?.map((e) => e.avg_soilMoisture).length;
        totalWaterTable =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_waterTable)) /
          GHGFluxYearly.data?.map((e) => e.avg_waterTable).length;
        totalCh4 =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_ch4)) /
          GHGFluxYearly.data?.map((e) => e.avg_ch4).length;
        totalCo2 =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_co2)) /
          GHGFluxYearly.data?.map((e) => e.avg_co2).length;
        totalHeterothropicCo2 =
          getSums(GHGFluxYearly.data?.map((e) => e.avg_heterothropic_co2)) /
          GHGFluxYearly.data?.map((e) => e.avg_heterothropic_co2).length;
      }
    }

    return {
      totalAirTemperature,
      totalSoilTemperature,
      totalSoilMoisture,
      totalWaterTable,
      totalCh4,
      totalCo2,
      totalHeterothropicCo2,
    };
  }, [
    GHGFluxYearly.data,
    landCoverKey,
    GHGFluxMonthly.data,
    periodeKey,
    categoryKey,
  ]);

  // soils
  const [soilTypeKey, setSoilTypeKey] = useState<Key | null>("physical");
  const [soilTypeInput, setSoilTypeInput] = useState<string>("");

  const onSelectionSoilTypeChange = (key: Key) => {
    setSoilTypeKey(key);
  };

  const onInputSoilTypeChange = (value: string) => {
    setSoilTypeInput(value);
  };

  const filterChartsSoilsPhysical = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ location: { $cont: getQuery.location } }],
    };
    if (periodeKey && periodeFilterred.start)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred.start,
          $lte: periodeFilterred.end,
        },
      });

    if (soilTypeKey == "physical")
      search?.$and?.push({ soilType: { $eq: soilTypeKey as string } });

    if (getQuery.landCover)
      search?.$and?.push({ landCover: { $eq: getQuery.landCover } });

    qb.search(search);
    qb.sortBy({
      field: `date`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery, periodeFilterred, categoryKey, periodeKey, soilTypeKey]);

  const filterChartsSoilsChemChar = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ location: { $cont: getQuery.location } }],
    };

    if (soilTypeKey && soilTypeKey !== "physical")
      search?.$and?.push({ soilType: { $eq: soilTypeKey as string } });

    if (getQuery.landCover)
      search?.$and?.push({ landCover: { $eq: getQuery.landCover } });

    qb.search(search);
    qb.sortBy({
      field: `date`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery, categoryKey, soilTypeKey]);

  const getSoilsChartPhysical = async (params: any) => {
    await SoilsYearly.fetch({ params: params });
    await SoilsMonthly.fetch({ params: params });
  };

  const getSoilsChartChem = async (params: any) => {
    await SoilsYearly.fetch({ params: params });
  };

  useEffect(() => {
    if (
      categoryKey == "Soil psychochemical properties" &&
      soilTypeKey == "physical"
    ) {
      getSoilsChartPhysical(filterChartsSoilsPhysical?.queryObject);
    } else if (
      categoryKey == "Soil psychochemical properties" &&
      soilTypeKey &&
      soilTypeKey !== "physical"
    ) {
      getSoilsChartChem(filterChartsSoilsChemChar?.queryObject);
    }
  }, [
    filterChartsSoilsPhysical,
    filterChartsSoilsChemChar,
    soilTypeKey,
    categoryKey,
  ]);

  const getChartDataSoils = useMemo(() => {
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

    let bulkDensity: PropsChart = {
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
    let gravimetricWaterContent: PropsChart = {
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
    let volumetricWaterContent: PropsChart = {
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

    let pH: PropsChart = {
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

    let redox: PropsChart = {
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

    if (landCoverKey && soilTypeKey) {
      if (SoilsYearly.data.length > 0 && periodeKey == "Yearly") {
        SoilsYearly.data.map((item, i) => {
          let date = format(new Date(item.datetime), "MMM yy", { locale: id });
          bulkDensity.labels.push(date);
          bulkDensity.datasets[0].data.push(item.avg_bulkDensity);

          gravimetricWaterContent.labels.push(date);
          gravimetricWaterContent.datasets[0].data.push(
            item.avg_gravimetricWaterContent
          );

          volumetricWaterContent.labels.push(date);
          volumetricWaterContent.datasets[0].data.push(
            item.avg_volumetricWaterContent
          );

          pH.labels.push(date);
          pH.datasets[0].data.push(item.avg_pH);

          redox.labels.push(date);
          redox.datasets[0].data.push(item.avg_redox);
        });
      } else if (SoilsMonthly.data.length > 0 && periodeKey == "Monthly") {
        SoilsMonthly.data.map((item, i) => {
          let date = format(new Date(item.datetime), "yyyy-MM-dd", {
            locale: id,
          });
          bulkDensity.labels.push(date);
          bulkDensity.datasets[0].data.push(item.avg_bulkDensity);

          gravimetricWaterContent.labels.push(date);
          gravimetricWaterContent.datasets[0].data.push(
            item.avg_gravimetricWaterContent
          );

          volumetricWaterContent.labels.push(date);
          volumetricWaterContent.datasets[0].data.push(
            item.avg_volumetricWaterContent
          );

          pH.labels.push(date);
          pH.datasets[0].data.push(item.avg_pH);

          redox.labels.push(date);
          redox.datasets[0].data.push(item.avg_redox);
        });
      } else if (SoilsYearly.data.length > 0 && !periodeKey) {
        SoilsYearly.data.map((item, i) => {
          let date = format(new Date(item.datetime), "MMM yy", {
            locale: id,
          });
          bulkDensity.labels.push(date);
          bulkDensity.datasets[0].data.push(item.avg_bulkDensity);

          gravimetricWaterContent.labels.push(date);
          gravimetricWaterContent.datasets[0].data.push(
            item.avg_gravimetricWaterContent
          );

          volumetricWaterContent.labels.push(date);
          volumetricWaterContent.datasets[0].data.push(
            item.avg_volumetricWaterContent
          );
        });
      } else {
        bulkDensity.labels = chartLabel;
        bulkDensity.datasets[0].data = chartData;

        gravimetricWaterContent.labels = chartLabel;
        gravimetricWaterContent.datasets[0].data = chartData;

        volumetricWaterContent.labels = chartLabel;
        volumetricWaterContent.datasets[0].data = chartData;

        pH.labels = chartLabel;
        pH.datasets[0].data = chartData;

        redox.labels = chartLabel;
        redox.datasets[0].data = chartData;
      }
    }

    console.log(SoilsYearly.data, "result-data");

    // airTemperature = dataYearly;
    return {
      bulkDensity,
      gravimetricWaterContent,
      volumetricWaterContent,
      pH,
      redox,
    };
  }, [
    SoilsYearly.data,
    landCoverKey,
    SoilsMonthly.data,
    periodeKey,
    soilTypeKey,
  ]);

  const getSumChartDataSoils = useMemo(() => {
    let totalBulkDensity: number = 0;
    let totalGravimetricWaterContent: number = 0;
    let totalVolumetricWaterContent: number = 0;
    let totalPh: number = 0;
    let totalRedox: number = 0;
    let totalK: number = 0;
    let totalKtk: number = 0;
    let totalP205: number = 0;
    let totalCarbon: number = 0;
    let totalN: number = 0;
    if (landCoverKey && soilTypeKey) {
      if (SoilsYearly.data.length > 0 && periodeKey == "Yearly") {
        totalBulkDensity =
          getSums(SoilsYearly.data.map((item) => item.avg_bulkDensity)) /
          SoilsYearly.data.map((item) => item.avg_bulkDensity).length;
        totalGravimetricWaterContent =
          getSums(
            SoilsYearly.data.map((item) => item.avg_gravimetricWaterContent)
          ) / SoilsYearly.data.map((item) => item.avg_gravimetricWaterContent).length;
        totalVolumetricWaterContent =
          getSums(
            SoilsYearly.data.map((item) => item.avg_volumetricWaterContent)
          ) / SoilsYearly.data.map((item) => item.avg_volumetricWaterContent).length;
        totalPh =
          getSums(SoilsYearly.data.map((item) => item.avg_pH)) /
          SoilsYearly.data.map((item) => item.avg_pH).length;
        totalRedox =
          getSums(SoilsYearly.data.map((item) => item.avg_redox)) /
          SoilsYearly.data.map((item) => item.avg_redox).length;
        totalK =
          getSums(SoilsYearly.data.map((item) => item.avg_k)) /
          SoilsYearly.data.map((item) => item.avg_k).length;
        totalKtk =
          getSums(SoilsYearly.data.map((item) => item.avg_ktk)) /
          SoilsYearly.data.map((item) => item.avg_ktk).length;
        totalP205 =
          getSums(SoilsYearly.data.map((item) => item.avg_p2O5)) /
          SoilsYearly.data.map((item) => item.avg_p2O5).length;
        totalCarbon =
          getSums(SoilsYearly.data.map((item) => item.avg_carbon)) /
          SoilsYearly.data.map((item) => item.avg_carbon).length;
        totalN =
          getSums(SoilsYearly.data.map((item) => item.avg_n)) /
          SoilsYearly.data.map((item) => item.avg_n).length;
      } else if (SoilsMonthly.data.length > 0 && periodeKey == "Monthly") {
        totalBulkDensity =
          getSums(SoilsMonthly.data.map((item) => item.avg_bulkDensity)) /
          SoilsMonthly.data.map((item) => item.avg_bulkDensity).length;
        totalGravimetricWaterContent =
          getSums(
            SoilsMonthly.data.map((item) => item.avg_gravimetricWaterContent)
          ) / SoilsMonthly.data.map((item) => item.avg_gravimetricWaterContent).length;
        totalVolumetricWaterContent =
          getSums(
            SoilsMonthly.data.map((item) => item.avg_volumetricWaterContent)
          ) / SoilsMonthly.data.map((item) => item.avg_volumetricWaterContent).length;
        totalPh =
          getSums(SoilsMonthly.data.map((item) => item.avg_pH)) /
          SoilsMonthly.data.map((item) => item.avg_pH).length;
        totalRedox =
          getSums(SoilsMonthly.data.map((item) => item.avg_redox)) /
          SoilsMonthly.data.map((item) => item.avg_redox).length;
        totalK =
          getSums(SoilsMonthly.data.map((item) => item.avg_k)) /
          SoilsMonthly.data.map((item) => item.avg_k).length;
        totalKtk =
          getSums(SoilsMonthly.data.map((item) => item.avg_ktk)) /
          SoilsMonthly.data.map((item) => item.avg_ktk).length;
        totalP205 =
          getSums(SoilsMonthly.data.map((item) => item.avg_p2O5)) /
          SoilsMonthly.data.map((item) => item.avg_p2O5).length;
        totalCarbon =
          getSums(SoilsMonthly.data.map((item) => item.avg_carbon)) /
          SoilsMonthly.data.map((item) => item.avg_carbon).length;
        totalN =
          getSums(SoilsMonthly.data.map((item) => item.avg_n)) /
          SoilsMonthly.data.map((item) => item.avg_n).length;
      } else {
        totalBulkDensity =
          getSums(SoilsYearly.data.map((item) => item.avg_bulkDensity)) /
          SoilsYearly.data.map((item) => item.avg_bulkDensity).length;
        totalGravimetricWaterContent =
          getSums(
            SoilsYearly.data.map((item) => item.avg_gravimetricWaterContent)
          ) / SoilsYearly.data.map((item) => item.avg_gravimetricWaterContent).length;
        totalVolumetricWaterContent =
          getSums(
            SoilsYearly.data.map((item) => item.avg_volumetricWaterContent)
          ) / SoilsYearly.data.map((item) => item.avg_volumetricWaterContent).length;
        totalPh =
          getSums(SoilsYearly.data.map((item) => item.avg_pH)) /
          SoilsYearly.data.map((item) => item.avg_pH).length;
        totalRedox =
          getSums(SoilsYearly.data.map((item) => item.avg_redox)) /
          SoilsYearly.data.map((item) => item.avg_redox).length;
        totalK =
          getSums(SoilsYearly.data.map((item) => item.avg_k)) /
          SoilsYearly.data.map((item) => item.avg_k).length;
        totalKtk =
          getSums(SoilsYearly.data.map((item) => item.avg_ktk)) /
          SoilsYearly.data.map((item) => item.avg_ktk).length;
        totalP205 =
          getSums(SoilsYearly.data.map((item) => item.avg_p2O5)) /
          SoilsYearly.data.map((item) => item.avg_p2O5).length;
        totalCarbon =
          getSums(SoilsYearly.data.map((item) => item.avg_carbon)) /
          SoilsYearly.data.map((item) => item.avg_carbon).length;
        totalN =
          getSums(SoilsYearly.data.map((item) => item.avg_n)) /
          SoilsYearly.data.map((item) => item.avg_n).length;
      }
    }
    return {
      totalBulkDensity,
      totalGravimetricWaterContent,
      totalVolumetricWaterContent,
      totalPh,
      totalRedox,
      totalK,
      totalKtk,
      totalP205,
      totalCarbon,
      totalN
    };
  }, [
    SoilsYearly.data,
    landCoverKey,
    SoilsMonthly.data,
    periodeKey,
    soilTypeKey,
  ]);

  // soil-cchem
  const getChartDataSoilsChem = useMemo(() => {
    return SoilsYearly.data;
  }, [SoilsYearly?.data]);

  // weather
  const getWeatherChart = async (params: any) => {
    await WeatherYearly.fetch({ params: params });
    await WeatherMonthly.fetch({ params: params });
  };

  useEffect(() => {
    if (categoryKey == "Weather data (AWS)") {
      getWeatherChart(filterChartWeather?.queryObject);
    }
  }, [filterChartWeather, categoryKey]);

  const getChartDataWeather = useMemo(() => {
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

    let temperature: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
        },
      ],
    };
    let relativeHumidity: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
        },
      ],
    };
    let solarRadiation: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
        },
      ],
    };
    let windSpeed: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
        },
      ],
    };
    let gustSpeed: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
        },
      ],
    };
    let windDirection: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
        },
      ],
    };
    let rain: PropsChart = {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235)",
          tension: 0.4,
          fill: true,
          label: (locationKey as string) || "Land cover",
          borderRadius: "4",
        },
      ],
    };

    if (WeatherYearly.data.length > 0 && periodeKey == "Yearly") {
      WeatherYearly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "MMM yy", { locale: id });
        temperature.labels.push(date);
        temperature.datasets[0].data.push(item.avg_temperature);
        temperature.datasets[0].label = item.location;

        relativeHumidity.labels.push(date);
        relativeHumidity.datasets[0].data.push(item.avg_relativeHumidity);
        relativeHumidity.datasets[0].label = item.location;

        solarRadiation.labels.push(date);
        solarRadiation.datasets[0].data.push(item.avg_solarRadiation);
        solarRadiation.datasets[0].label = item.location;

        windSpeed.labels.push(date);
        windSpeed.datasets[0].data.push(item.avg_windSpeed);
        windSpeed.datasets[0].label = item.location;

        gustSpeed.labels.push(date);
        gustSpeed.datasets[0].data.push(item.avg_gustSpeed);
        gustSpeed.datasets[0].label = item.location;

        windDirection.labels.push(date);
        windDirection.datasets[0].data.push(item.avg_windDirection);
        windDirection.datasets[0].label = item.location;

        rain.labels.push(date);
        rain.datasets[0].data.push(item.avg_rain);
        rain.datasets[0].label = item.location;
      });
    } else if (WeatherMonthly.data.length > 0 && periodeKey == "Monthly") {
      WeatherMonthly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "dd MMM yy", {
          locale: id,
        });
        temperature.labels.push(date);
        temperature.datasets[0].data.push(item.avg_temperature);
        temperature.datasets[0].label = item.location;

        relativeHumidity.labels.push(date);
        relativeHumidity.datasets[0].data.push(item.avg_relativeHumidity);
        relativeHumidity.datasets[0].label = item.location;

        solarRadiation.labels.push(date);
        solarRadiation.datasets[0].data.push(item.avg_solarRadiation);
        solarRadiation.datasets[0].label = item.location;

        windSpeed.labels.push(date);
        windSpeed.datasets[0].data.push(item.avg_windSpeed);
        windSpeed.datasets[0].label = item.location;

        gustSpeed.labels.push(date);
        gustSpeed.datasets[0].data.push(item.avg_gustSpeed);
        gustSpeed.datasets[0].label = item.location;

        windDirection.labels.push(date);
        windDirection.datasets[0].data.push(item.avg_windDirection);
        windDirection.datasets[0].label = item.location;

        rain.labels.push(date);
        rain.datasets[0].data.push(item.avg_rain);
        rain.datasets[0].label = item.location;
      });
    } else if (WeatherYearly.data.length > 0 && !periodeKey) {
      WeatherYearly.data.map((item, i) => {
        let date = format(new Date(item.datetime), "MMM yy", {
          locale: id,
        });
        temperature.labels.push(date);
        temperature.datasets[0].data.push(item.avg_temperature);
        temperature.datasets[0].label = item.location;

        relativeHumidity.labels.push(date);
        relativeHumidity.datasets[0].data.push(item.avg_relativeHumidity);
        relativeHumidity.datasets[0].label = item.location;

        solarRadiation.labels.push(date);
        solarRadiation.datasets[0].data.push(item.avg_solarRadiation);
        solarRadiation.datasets[0].label = item.location;

        windSpeed.labels.push(date);
        windSpeed.datasets[0].data.push(item.avg_windSpeed);
        windSpeed.datasets[0].label = item.location;

        gustSpeed.labels.push(date);
        gustSpeed.datasets[0].data.push(item.avg_gustSpeed);
        gustSpeed.datasets[0].label = item.location;

        windDirection.labels.push(date);
        windDirection.datasets[0].data.push(item.avg_windDirection);
        windDirection.datasets[0].label = item.location;

        rain.labels.push(date);
        rain.datasets[0].data.push(item.avg_rain);
        rain.datasets[0].label = item.location;
      });
    } else {
      temperature.labels = chartLabel;
      temperature.datasets[0].data = chartData;
      temperature.datasets[0].label = locationKey as string;

      relativeHumidity.labels = chartLabel;
      relativeHumidity.datasets[0].data = chartData;
      relativeHumidity.datasets[0].label = locationKey as string;

      solarRadiation.labels = chartLabel;
      solarRadiation.datasets[0].data = chartData;
      solarRadiation.datasets[0].label = locationKey as string;

      windSpeed.labels = chartLabel;
      windSpeed.datasets[0].data = chartData;
      windSpeed.datasets[0].label = locationKey as string;

      gustSpeed.labels = chartLabel;
      gustSpeed.datasets[0].data = chartData;
      gustSpeed.datasets[0].label = locationKey as string;

      windDirection.labels = chartLabel;
      windDirection.datasets[0].data = chartData;
      windDirection.datasets[0].label = locationKey as string;

      rain.labels = chartLabel;
      rain.datasets[0].data = chartData;
      rain.datasets[0].label = locationKey as string;
    }

    // airTemperature = dataYearly;
    return {
      temperature,
      relativeHumidity,
      solarRadiation,
      windSpeed,
      gustSpeed,
      windDirection,
      rain,
    };
  }, [WeatherYearly.data, locationKey, WeatherMonthly.data, periodeKey]);

  const getSumChartDataWeather = useMemo(() => {
    let totalTemperature: number = 0;
    let totalRelativeHumidity: number = 0;
    let totalSolarRadiation: number = 0;
    let totalWindSpeed: number = 0;
    let totalGustSpeed: number = 0;
    let totalWindDirection: number = 0;
    let totalRain: number = 0;

    if (WeatherYearly.data.length > 0 && periodeKey == "Yearly") {
      totalTemperature =
        getSums(WeatherYearly.data.map((item) => item.avg_temperature)) /
        WeatherYearly.data.length;
      totalRelativeHumidity =
        getSums(WeatherYearly.data.map((item) => item.avg_relativeHumidity)) /
        WeatherYearly.data.length;
      totalSolarRadiation =
        getSums(WeatherYearly.data.map((item) => item.avg_solarRadiation)) /
        WeatherYearly.data.length;
      totalWindSpeed =
        getSums(WeatherYearly.data.map((item) => item.avg_windSpeed)) /
        WeatherYearly.data.length;
      totalGustSpeed =
        getSums(WeatherYearly.data.map((item) => item.avg_gustSpeed)) /
        WeatherYearly.data.length;
      totalWindDirection =
        getSums(WeatherYearly.data.map((item) => item.avg_windDirection)) /
        WeatherYearly.data.length;
      totalRain = getSums(WeatherYearly.data.map((item) => item.sum_rain));
    } else if (WeatherMonthly.data.length > 0 && periodeKey == "Monthly") {
      totalTemperature =
        getSums(WeatherMonthly.data.map((item) => item.avg_temperature)) /
        WeatherMonthly.data.length;
      totalRelativeHumidity =
        getSums(WeatherMonthly.data.map((item) => item.avg_relativeHumidity)) /
        WeatherMonthly.data.length;
      totalSolarRadiation =
        getSums(WeatherMonthly.data.map((item) => item.avg_solarRadiation)) /
        WeatherMonthly.data.length;
      totalWindSpeed =
        getSums(WeatherMonthly.data.map((item) => item.avg_windSpeed)) /
        WeatherMonthly.data.length;
      totalGustSpeed =
        getSums(WeatherMonthly.data.map((item) => item.avg_gustSpeed)) /
        WeatherMonthly.data.length;
      totalWindDirection =
        getSums(WeatherMonthly.data.map((item) => item.avg_windDirection)) /
        WeatherMonthly.data.length;
      totalRain = getSums(WeatherMonthly.data.map((item) => item.sum_rain));
    } else if (WeatherYearly.data.length > 0 && !periodeKey) {
      totalTemperature =
        getSums(WeatherYearly.data.map((item) => item.avg_temperature)) /
        WeatherYearly.data.length;
      totalRelativeHumidity =
        getSums(WeatherYearly.data.map((item) => item.avg_relativeHumidity)) /
        WeatherYearly.data.length;
      totalSolarRadiation =
        getSums(WeatherYearly.data.map((item) => item.avg_solarRadiation)) /
        WeatherYearly.data.length;
      totalWindSpeed =
        getSums(WeatherYearly.data.map((item) => item.avg_windSpeed)) /
        WeatherYearly.data.length;
      totalGustSpeed =
        getSums(WeatherYearly.data.map((item) => item.avg_gustSpeed)) /
        WeatherYearly.data.length;
      totalWindDirection =
        getSums(WeatherYearly.data.map((item) => item.avg_windDirection)) /
        WeatherYearly.data.length;
      totalRain = getSums(WeatherYearly.data.map((item) => item.sum_rain));
    }
    return {
      totalTemperature,
      totalRelativeHumidity,
      totalSolarRadiation,
      totalWindSpeed,
      totalGustSpeed,
      totalWindDirection,
      totalRain,
    };
  }, [WeatherYearly.data, locationKey, WeatherMonthly.data, periodeKey]);

  // carbon
  const filterChartCarbon = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search = {
      $and: [{ region: { $cont: getQuery?.location } }],
    };

    qb.search(search);
    qb.sortBy({
      field: `region`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery]);

  console.log(getQuery, "query-data");

  const getWoodyChart = async (params: any) => {
    console.log(params, "paramss");
    await WoodyYearly.fetch({ params });
  };

  const getLitterChart = async (params: any) => {
    await LitterChartApi.fetch({ params });
  };

  const getSoilChart = async (params: any) => {
    await SoilChartApi.fetch({ params });
  };

  const getTreesChart = async (params: any) => {
    await TreesChartApi.fetch({ params });
  };

  useEffect(() => {
    if (categoryKey == "Carbon Stock") {
      getWoodyChart(filterChartCarbon?.queryObject);
      getLitterChart(filterChartCarbon?.queryObject);
      getSoilChart(filterChartCarbon?.queryObject);
      getTreesChart(filterChartCarbon?.queryObject);
    }
  }, [categoryKey, filterChartCarbon, categoryKey]);

  console.log(filterChartCarbon, "filter-carbon");

  const getChartDataCarbon = useMemo(() => {
    return {
      woody: WoodyYearly.data,
      litter: LitterChartApi.data,
      soils: SoilChartApi.data,
      trees: TreesChartApi.data,
    };
  }, [WoodyYearly, LitterChartApi, SoilChartApi, TreesChartApi]);

  const getSumChartDataCarbon = useMemo(() => {
    let totalWoodyDebris: number = 0;
    let totalLitterMass: number = 0;
    let totalNSoils: number = 0;
    let totalCSoils: number = 0;
    let totalNMGSoils: number = 0;
    let totalCMGSoils: number = 0;
    let totalDBHTrees: number = 0;
    let totalTAGBTrees: number = 0;
    let totalNotesTrees: number = 0;
    let totalPlotTrees: number = 0;
    let totalPlotRadiusTrees: number = 0;
    let totalWoodDensityTrees: number = 0;

    totalWoodyDebris =
      getSums(WoodyYearly.data.map((item) => item.avg_total)) /
      WoodyYearly.data.map((item) => item.avg_total).length;
    totalLitterMass =
      getSums(LitterChartApi.data.map((item) => item.avg_litterMas)) /
      LitterChartApi.data.map((item) => item.avg_litterMas).length;

    totalNSoils =
      getSums(SoilChartApi.data.map((item) => item.avg_n)) /
      SoilChartApi.data.map((item) => item.avg_n).length;
    totalCSoils =
      getSums(SoilChartApi.data.map((item) => item.avg_c)) /
      SoilChartApi.data.map((item) => item.avg_c).length;
    totalNMGSoils =
      getSums(SoilChartApi.data.map((item) => item.avg_nMgHa)) /
      SoilChartApi.data.map((item) => item.avg_nMgHa).length;
    totalCMGSoils =
      getSums(SoilChartApi.data.map((item) => item.avg_cMgHa)) /
      SoilChartApi.data.map((item) => item.avg_cMgHa).length;

    totalDBHTrees =
      getSums(TreesChartApi.data.map((item) => item.avg_dbh)) /
      TreesChartApi.data.map((item) => item.avg_dbh).length;
    totalTAGBTrees =
      getSums(TreesChartApi.data.map((item) => item.avg_tagb)) /
      TreesChartApi.data.map((item) => item.avg_tagb).length;
    totalNotesTrees =
      getSums(TreesChartApi.data.map((item) => item.avg_notes)) /
      TreesChartApi.data.map((item) => item.avg_notes).length;
    totalPlotTrees =
      getSums(TreesChartApi.data.map((item) => item.avg_plot)) /
      TreesChartApi.data.map((item) => item.avg_plot).length;
    totalPlotRadiusTrees =
      getSums(TreesChartApi.data.map((item) => item.avg_plotRadius)) /
      TreesChartApi.data.map((item) => item.avg_plotRadius).length;
    totalWoodDensityTrees =
      getSums(TreesChartApi.data.map((item) => item.avg_woodDensity)) /
      TreesChartApi.data.map((item) => item.avg_woodDensity).length;

    return {
      totalWoodyDebris,
      totalLitterMass,
      totalNSoils,
      totalCSoils,
      totalNMGSoils,
      totalCMGSoils,
      totalDBHTrees,
      totalTAGBTrees,
      totalNotesTrees,
      totalPlotTrees,
      totalPlotRadiusTrees,
      totalWoodDensityTrees,
    };
  }, [
    WoodyYearly.data,
    LitterChartApi.data,
    SoilChartApi.data,
    TreesChartApi.data,
  ]);

  return (
    <Fragment>
      <div className="w-full h-full overflow-auto flex flex-col gap-3 mt-5">
        <ScrollShadow hideScrollBar className="w-full h-full">
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-3 items-center px-4 mb-5 gap-2 ${
              !sidebar ? "mt-10" : "mt-5"
            }`}
          >
            <div className="w-full flex flex-col gap-3">
              <h3 className="font-bold text-xl">{data?.location || ""}</h3>
              <ul className="list-disc text-sm">{data?.description || "-"}</ul>
            </div>

            <div className="lg:col-span-2 w-full flex flex-col lg:flex-row items-start justify-end gap-2">
              <div className={`w-full max-w-[12rem] items-center gap-1`}>
                <Autocomplete
                  radius="full"
                  labelPlacement="outside"
                  placeholder="Select land cover"
                  defaultItems={landCoverOptions}
                  defaultSelectedKey={landCoverKey as Key}
                  variant="faded"
                  color="primary"
                  className={`w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60 ${
                    categoryKey === "Carbon Stock" ||
                    categoryKey === "Weather data (AWS)"
                      ? "hidden"
                      : ""
                  }`}
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

                <Autocomplete
                  radius="full"
                  labelPlacement="outside"
                  placeholder="Select land cover"
                  defaultItems={soilTypeOptions}
                  defaultSelectedKey={soilTypeKey as Key}
                  variant="faded"
                  color="primary"
                  className={`w-full max-w-xs mt-3 rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60 ${
                    categoryKey !== "Soil psychochemical properties" ||
                    !landCoverKey
                      ? "hidden"
                      : ""
                  }`}
                  allowsCustomValue={true}
                  onSelectionChange={onSelectionSoilTypeChange}
                  onInputChange={onInputSoilTypeChange}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>

              <div
                className={`w-full max-w-[12rem] justify-end pr-4 ${
                  categoryKey === "Carbon Stock" ||
                  categoryKey === "Soil psychochemical propertiesn " && soilTypeKey == "chemChar1" ||
                  categoryKey === "Soil psychochemical propertiesn " && soilTypeKey == "chemChar2" ||
                  categoryKey === "Soil psychochemical propertiesn " && soilTypeKey == "chemChar3"
                    ? "hidden"
                    : ""
                }
                `}
              >
                <Autocomplete
                  radius="full"
                  labelPlacement="outside"
                  placeholder="Select periode"
                  defaultItems={periodeOptions}
                  defaultSelectedKey={periodeKey as Key}
                  variant="faded"
                  color="primary"
                  className={`w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60`}
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

                <div className={`w-full my-3 ${!periodeKey ? "hidden" : ""}`}>
                  <div
                    className={`w-full ${
                      periodeKey !== "Yearly" ? "hidden" : ""
                    }`}
                  >
                    <label className="w-full text-gray-5 overflow-hidden">
                      <DatePicker
                        selected={periodeDate}
                        onChange={(date: any) => setPeriodeDate(date)}
                        showYearPicker
                        dateFormat="yyyy"
                        yearItemNumber={6}
                        showIcon
                        icon={
                          (
                            <MdCalendarToday className="h-3 w-3 text-gray-5 m-auto top-1" />
                          ) as any
                        }
                        isClearable
                        className="text-sm w-full text-gray-5 rounded-full border-2 border-stroke bg-transparent py-3 pl-8 pr-6 outline-none focus:border-primary focus-visible:shadow-none"
                      />
                    </label>
                  </div>

                  <div
                    className={`w-full ${
                      periodeKey !== "Monthly" ? "hidden" : ""
                    }`}
                  >
                    <label className="w-full text-gray-5 overflow-hidden">
                      <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(dates: any) => {
                          setDateRange(dates);
                        }}
                        dateFormat="dd/MM-yy"
                        monthsShown={2}
                        placeholderText={"Select date"}
                        // todayButton={"Today"}
                        dropdownMode="select"
                        peekNextMonth={true}
                        dateFormatCalendar="MMM yyyy"
                        showMonthDropdown
                        showYearDropdown
                        calendarClassName="-left-10"
                        clearButtonClassName="p-1"
                        className="text-sm w-full text-gray-5 rounded-full border-2 border-stroke bg-transparent py-1.5 pl-8 pr-6 outline-none focus:border-primary focus-visible:shadow-none "
                        isClearable
                        showIcon
                        icon={
                          (
                            <MdCalendarToday className="h-3 w-3 text-gray-5 m-auto top-1" />
                          ) as any
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-full ${
              !sidebar ? "lg:border-y-2 lg:border-default-300" : ""
            }`}
          >
            {
              categoryKey == "GHG Fluxes & other variables" && landCoverKey ? (
                <HeaderGHGFlux
                  items={getSumChartDataGHGFlux}
                  sidebar={sidebar}
                />
              ) : categoryKey == "Soil psychochemical properties" &&
                landCoverKey &&
                soilTypeKey ? (
                <HeaderSoils items={getSumChartDataSoils} sidebar={sidebar} />
              ) : categoryKey == "Weather data (AWS)" ? (
                <HeaderWeather
                  items={getSumChartDataWeather}
                  sidebar={sidebar}
                />
              ) : categoryKey == "Carbon Stock" ? (
                <HeaderCarbon items={getSumChartDataCarbon} sidebar={sidebar} />
              ) : null
              // <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              //   <div className="w-full flex flex-col">
              //     <p className="text-xs mb-2">Parameter 1</p>
              //     <p className="font-bold text-lg">0</p>
              //     <p className="text-xs">Condition/status</p>
              //   </div>

              //   <div className="w-full flex flex-col">
              //     <p className="text-xs mb-2">Parameter 2</p>
              //     <p className="font-bold text-lg">0</p>
              //     <p className="text-xs">Condition/status</p>
              //   </div>

              //   <div className="w-full flex flex-col">
              //     <p className="text-xs mb-2">Parameter 3</p>
              //     <p className="font-bold text-lg">0</p>
              //     <p className="text-xs">Condition/status</p>
              //   </div>

              //   <div className="w-full flex flex-col">
              //     <p className="text-xs mb-2">Parameter 4</p>
              //     <p className="font-bold text-lg">0</p>
              //     <p className="text-xs">Condition/status</p>
              //   </div>
              // </div>
            }
          </div>

          {categoryKey == "GHG Fluxes & other variables" && landCoverKey ? (
            <GHGFluxCharts
              chartData={getChartDataGHGFlux}
              sidebar={sidebar as boolean}
              landCoverKey={landCoverKey}
              locationKey={locationKey}
              periodeKey={periodeKey}
            />
          ) : categoryKey == "Soil psychochemical properties" &&
            landCoverKey &&
            soilTypeKey == "physical" ? (
            <SoilsCharts
              chartData={getChartDataSoils}
              sidebar={sidebar as boolean}
              landCoverKey={landCoverKey}
              locationKey={locationKey}
              periodeKey={periodeKey}
            />
          ) : categoryKey == "Soil psychochemical properties" &&
            landCoverKey &&
            soilTypeKey == "chemChar1" ? (
            <SoilChemChar1
              chartData={getChartDataSoilsChem}
              sidebar={sidebar as boolean}
            />
          ) : categoryKey == "Soil psychochemical properties" &&
            landCoverKey &&
            soilTypeKey == "chemChar2" ? (
            <SoilChemChar2
              chartData={getChartDataSoilsChem}
              sidebar={sidebar as boolean}
            />
          ) : categoryKey == "Soil psychochemical properties" &&
            landCoverKey &&
            soilTypeKey == "chemChar3" ? (
            <SoilChemChar3
              chartData={getChartDataSoilsChem}
              sidebar={sidebar as boolean}
            />
          ) : categoryKey == "Weather data (AWS)" ? (
            <WeatherCharts
              chartData={getChartDataWeather}
              sidebar={sidebar as boolean}
              landCoverKey={landCoverKey}
              locationKey={locationKey}
              periodeKey={periodeKey}
            />
          ) : categoryKey == "Carbon Stock" ? (
            <CarbonStockCharts
              chartData={getChartDataCarbon}
              sidebar={sidebar as boolean}
              query={getQuery}
              categoryKey={categoryKey}
              locationKey={locationKey}
            />
          ) : // <BoxPlotCharts />
          null}
        </ScrollShadow>
      </div>
    </Fragment>
  );
}

export default ContentComponent;
