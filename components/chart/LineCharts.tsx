import React from "react";

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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const customOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        boxWidth: 0,
      },
      display: true,
    },
  },
};

const labels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const customData = {
  labels,
  datasets: [
    {
      data: [10, 50, 100, 70, 20, 50, 80, 70, 15, 20, 10, 100],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.3)",
      tension: 0.4,
      fill: true,
    },
  ],
};

type LineProps = {
  data?: {
    labels: any;
    datasets: any;
  };
  options?: any;
  width?: string;
  height?: string;
  className?: string;
};

const LineCharts = ({ data, options, width, height, className }: LineProps) => {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-hidden overflow-y-auto">
      <Line
        data={data ? data : customData}
        height={height}
        width={width}
        options={options ? options : customOptions}
        className={className}
      />
    </div>
  );
};

export default LineCharts;
