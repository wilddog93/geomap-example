"use client";

import { FC, Key, useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { generateConfig, options } from "../../chart-config";
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";
import { SoilsStatBoxPlotProps } from "@/api/soils.api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BoxPlotController,
  BoxAndWiskers
);

interface ChartDataProps {
  data: SoilsStatBoxPlotProps[];
  landCoverKey?: Key | string
}

const PHChartBoxPlot: FC<ChartDataProps> = ({ data, landCoverKey }) => {
  // const chartData = useMemo(() => generateConfig(
  //   data.map(d => d.land_cover),
  //   data.map(d => ({
  //     max: d.max_pH,
  //     min: d.min_pH,
  //     q1: d.q1_pH,
  //     median: d.q2_pH,
  //     q3: d.q3_pH,
  //     mean: d.avg_pH
  //   }))
  // ), [data])

  const groupedData = data.reduce((acc: any, item) => {
    const key = `${item.location}-${item.land_cover}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  // Extract unique regions and land_covers values
  const locations = Array.from(new Set(data.map((item) => item.location)));
  const landCovers = Array.from(new Set(data.map((item) => item.land_cover)));
  const newData = Array.from(
    new Set(
      data.map((item) => ({
        label: landCovers.toString(),
        max: item.max_pH,
        min: item.min_pH,
        q1: item.q1_pH,
        median: item.q2_pH,
        q3: item.q3_pH,
        mean: item.avg_pH,
      }))
    )
  );
  // Prepare datasets for stacked bar chart

  const chartData = useMemo(
    () => generateConfig(locations, newData),
    [locations, newData]
  );

  return (
    <div className="mx-auto w-full max-w-screen-lg p-5 bg-gray-800 rounded-md">
      <Chart height={"300"} type="boxplot" data={chartData} options={options} />
    </div>
  );
};

export default PHChartBoxPlot;
