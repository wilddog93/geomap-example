import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  import { faker } from "@faker-js/faker";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
  export const customOptions = {
    responsive: true,
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
  
  const labels = [
    "1 Oct",
    "2 Oct",
    "3 Oct",
    "4 Oct",
    "5 Oct",
    "6 Oct",
    "7 Oct",
    "8 Oct",
    "9 Oct",
    "10 Oct",
    "11 Oct",
    "12 Oct",
  ];
  
  export const customData = {
    labels,
    datasets: [
      // {
      //   fill: true,
      //   label: "Dataset",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   borderColor: ["rgb(250, 192, 2)"],
      //   backgroundColor: "rgba(250, 192, 2, 0.5)",
      //   tension: 0.4,
      // },
      {
        type: "line" as const,
        label: "Average",
        backgroundColor: "red",
        data: labels.map(() => faker.datatype.number({ min: 500, max: 500 })),
        borderColor: "red",
        borderWidth: 2,
        pointStyle: "line",
      },
      {
        type: "line" as const,
        label: "Temperature",
        borderColor: "rgb(250, 192, 2)",
        backgroundColor: "rgba(250, 192, 2, 0.2)",
        borderWidth: 2,
        fill: true,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        tension: 0.4,
      },
    ],
  };
  
  type AreaProps = {
    data?: {
      labels: any;
      datasets: any;
    };
    options?: any;
    width?: string;
    height?: string;
    className?: string;
  };
  
  const AreaChart = ({ data, options, width, height, className }: AreaProps) => {
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
  
  export default AreaChart;