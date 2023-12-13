import LineCharts from "@/components/chart/LineCharts";
import { Input } from "@nextui-org/input";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import React, { ChangeEvent, useState } from "react";
import { MdInfo, MdSearch } from "react-icons/md";

const dataSelectContent = [
    { label: "Sublocation", value: "sublocation" },
    { label: "Location", value: "location" },
  ];

function ContentComponent() {
  const [value, setValue] = useState<string>("sublocation");

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
      legend: {
        display: true,
        position: "top" as const,
        align: "end" as const,
        labels: {
          borderRadius: 4,
          boxWidth: 16,
          useBorderRadius: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
        position: "top" as const,
        text: "Arrival Weekly",
        align: "start" as const,
        font: {
          size: 16,
          weight: "normal",
        },
      },
    },
  };

  const dataYearly = {
    labels: [
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
    ],
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

  return (
    <div className="w-full flex flex-col gap-3 mt-5">
      <div className="w-full flex items-center gap-1">
        <Select
          radius="full"
          label=""
          className="w-full max-w-xs shadow-sm rounded-full bg-white dark:bg-default/60 backdrop-blur-xl backdrop-saturate-200 hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
          labelPlacement="outside"
          variant="bordered"
          listboxProps={{
            itemClasses: {
              base: [
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          color="primary"
          selectedKeys={[value]}
          onChange={handleSelectionChange}
        >
          {dataSelectContent.map((data) => (
            <SelectItem key={data.value} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          color="primary"
          placeholder="Search"
          radius="full"
          labelPlacement="outside"
          variant="bordered"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => console.log("search")}
            >
              <MdSearch className="w-5 h-5 text-default-400 pointer-events-none" />
            </button>
          }
          type="text"
          className="w-full max-w-md"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60 py-2",
            ],
            innerWrapper: "bg-transparent py-1.5",
            inputWrapper: [
              "shadow-sm",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
              "py-4 bg-white",
            ],
          }}
        />
      </div>

      {/* accordion */}
      {/* <Accordion defaultExpandedKeys={["parameter-1"]}> */}
      <div className={`w-full `}></div>
      <Accordion>
        <AccordionItem
          key="parameter-0"
          aria-label="parameter-0"
          title={
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold">Data Group Name</h3>
            </div>
          }
          indicator={<MdInfo className="w-3 h-4" />}
          disableIndicatorAnimation
        />
        <AccordionItem
          hideIndicator
          key="parameter-1"
          aria-label="parameter-1"
          title={
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Parameter 1</h3>
              <p className="text-xs">data 1</p>
            </div>
          }
        >
          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">Yearly Chart</h3>
            <LineCharts options={options} data={dataYearly} />
          </div>
        </AccordionItem>
        <AccordionItem
          hideIndicator
          key="parameter-2"
          aria-label="parameter-2"
          title={
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Parameter 2</h3>
              <p className="text-xs">data 2</p>
            </div>
          }
        >
          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">Monthly Chart</h3>
            <LineCharts options={options} data={dataMonthly} />
          </div>
        </AccordionItem>
        <AccordionItem
          hideIndicator
          key="parameter-3"
          aria-label="parameter-3"
          title={
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Parameter 3</h3>
              <p className="text-xs">data 3</p>
            </div>
          }
        >
          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs -mb-5">Weekly Chart</h3>
            <LineCharts options={options} data={dataWeekly} />
          </div>
        </AccordionItem>
        <AccordionItem
          hideIndicator
          key="parameter-4"
          aria-label="parameter-4"
          title={
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Parameter 4</h3>
              <p className="text-xs">data 4</p>
            </div>
          }
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ContentComponent;
