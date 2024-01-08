import { ChartConfiguration } from "chart.js";

export const options = {
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
        size: 14,
      },
      bodyFont: {
        size: 14,
      },
      // callbacks: {
      //   label: function (item: any) {
      //     return `${item?.dataset?.label} : ${item?.raw?.toFixed(2)} %`;
      //   },
      // },
    },
  },
  barThickness: 80,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export interface BoxplotData {
  label: string;
  min: number;
  max: number;
  q1: number;
  median: number;
  q3: number;
  mean: number;
}

export const generateConfig = (
  labels: string[],
  data: BoxplotData[]
): ChartConfiguration<"boxplot">["data"] => {
  return {
    labels,
    datasets: [
      {
        data,
        label: Array.from(new Set(data.map((item) => item.label))).toString(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};
