import AreaCharts from "@/components/chart/AreaCharts";
import { SelectTypes } from "@/utils/propTypes";
import { getYearly } from "@/utils/useFunction";
import { Input } from "@nextui-org/input";
import {
  Accordion,
  AccordionItem,
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
import React, { ChangeEvent, Fragment, Key, useMemo, useState } from "react";
import { MdCalendarToday, MdInfo, MdSearch } from "react-icons/md";

const dataSelectContent = [
  { label: "Sublocation", value: "sublocation" },
  { label: "Location", value: "location" },
];

type Props = {
  sidebar?: boolean;
  data?: any[] | any;
  landCoverOptions?: SelectTypes[] | any[];
};

const periodeOptions = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "montly" },
];

function ContentComponent({ sidebar, data, landCoverOptions }: Props) {
  const [isSelected, setIsSelected] = useState<string | any>("yearly");
  const [value, setValue] = useState<string>("sublocation");
  const [periodeKey, setPeriodeKey] = useState<Key | null>("Yearly");
  const [periodeFilter, setPeriodeFilter] = useState("Yearly");
  const [landCoverKey, setLandCoverKey] = useState<Key | null>(
    "Secondary Forest"
  );
  const [landCoverFilter, setLandCoverFilter] = useState("Secondary Forest");

  // console.log(data, 'data-component')

  const handleSelectionChangePeriode = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsSelected(e.target.value);
  };

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  // function-dropdown
  const onSelectionPeriodeChange = (key: Key) => {
    setPeriodeKey(key);
  };

  const onInputPeriodeChange = (value: string) => {
    setPeriodeFilter(value);
  };

  const onSelectionLandCoverChange = (key: Key) => {
    setLandCoverKey(key);
  };

  const onInputLandCoverChange = (value: string) => {
    setLandCoverFilter(value);
  };
  // end function dropdown key

  // filter periode
  const periodeFilterred = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const today = new Date();
    let start: string | null | any = "";
    let end: string | null | any = "";
    if (periodeKey == "Monthly") {
      start = format(startOfMonth(currentDate), "yyyy-MM-dd");
      end = format(endOfMonth(currentDate), "yyyy-MM-dd");
    } else {
      start = format(startOfYear(currentDate), "yyyy-MM-dd");
      end = format(endOfYear(currentDate), "yyyy-MM-dd");
    }

    // console.log({start, end}, "periode")

    return { start, end };
  }, [periodeKey]);
  // filter perioded end

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

  // console.log("year get by month:", getYearly(new Date(), 1));
  // console.log(
  //   "monthly by week:",
  //   `${subWeeks(new Date(), 2)} to ${new Date()}`
  // );

  return (
    <Fragment>
      <div className="w-full flex flex-col gap-3 mt-5">
        {/* accordion */}
        {/* <Accordion defaultExpandedKeys={["parameter-1"]}> */}
        <ScrollShadow hideScrollBar className="w-full h-full">
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-2 items-center px-4 mb-5 gap-2 ${
              !sidebar ? "mt-10" : "mt-5"
            }`}
          >
            <div className="w-full flex flex-col gap-3">
              <h3 className="font-bold text-xl">{data?.location || ""}</h3>
              <ul className="list-disc text-sm">
                {data?.description || data?.description?.length > 0
                  ? data?.description?.map((desc: any) => {
                      return <li key={desc}>{desc}</li>;
                    })
                  : null}
              </ul>
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
                  defaultSelectedKey="Secondary Forest"
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
                  defaultSelectedKey="Yearly"
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
              defaultSelectedKey="Secondary Forest"
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

          <div className={`w-full ${sidebar ? "" : "hidden"}`}>
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
                  <AreaCharts
                    height="300"
                    options={options}
                    data={dataYearly}
                  />
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
                  <AreaCharts
                    height="300"
                    options={options}
                    data={dataMonthly}
                  />
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
                  <AreaCharts
                    height="300"
                    options={options}
                    data={dataWeekly}
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
                <h3 className="font-semibold text-xs -mb-5">Yearly Chart</h3>
                <AreaCharts height="300" options={options} data={dataYearly} />
              </div>

              <div className="w-full flex flex-col relative">
                <h3 className="font-semibold text-xs -mb-5">Monthly Chart</h3>
                <AreaCharts height="300" options={options} data={dataMonthly} />
              </div>

              <div className="w-full flex flex-col relative">
                <h3 className="font-semibold text-xs -mb-5">Weekly Chart</h3>
                <AreaCharts height="300" options={options} data={dataWeekly} />
              </div>
            </div>
          </div>
        </ScrollShadow>
      </div>
    </Fragment>
  );
}

export default ContentComponent;
