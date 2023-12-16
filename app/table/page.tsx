"use client";

import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import CarbonTables from "@/components/tables/carbon-tables";
import FluxTables from "@/components/tables/flux-tables";
import { Button, ButtonGroup, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Fragment, Key, useState } from "react";
import { MdPlace } from "react-icons/md";

const itemTabs = [
  {
    id: "ghg-flux",
    label: "GHG Flux",
    value: "ghg-flux",
  },
  {
    id: "carbon",
    label: "Carbon Stock",
    value: "carbon-stock",
  },
  {
    id: "weather",
    label: "Weather Data",
    value: "weather-data",
  },
  {
    id: "soil",
    label: "Soil Psycochemical",
    value: "soil-psycochemical",
  },
];

export default function BlogPage(props: any) {
  const [selected, setSelected] = useState("ghg-flux");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string | any>("")
  let router = useRouter();

  const handleChange = (key: Key) => {
    setSelected(key as any);
    setPage(1)
    setLimit(5)
  };

  console.log(selected, "data-selected");
  return (
    <Fragment>
      <Navbar />
      <section className="relative overflow-y-auto w-full h-full flex flex-col items-center gap-4">
        <div className="flex w-full flex-col">
          <div className="w-full flex overflow-y-hidden overflow-x-auto items-center p-2 bg-primary gap-4">
            <div>select props here</div>

            <div className="bg-primary inline-flex items-center gap-2">
              {itemTabs.map((tab) => {
                return (
                  <Button
                    radius="full"
                    onClick={() => handleChange(tab.id)}
                    className="relative group box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden outline-none max-w-fit h-9 px-4 bg-transparent text-default-300"
                  >
                    {selected == tab.id ? (
                      <span
                        className={`absolute z-0 inset-0 dark:bg-default shadow-small w-full bg-[#23487a]/40 border-2 border-[#23487a]/10 rounded-full text-white 
                        transition ease-in-out delay-150 
                        ${selected == tab.id ? "" : ""}
                        `}
                        style={{
                          transformOrigin: "50% 50% 0px",
                        }}
                      ></span>
                    ) : null}
                    <div
                      className={`relative z-10 whitespace-nowrap transition-colors text-default-300 ${
                        selected === tab.id ? "text-white font-bold" : ""
                      }`}
                      data-slot="tabContent"
                    >
                      {tab.label}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className={`w-full p-4 ${selected == "ghg-flux" ? "" : "hidden"}`}>
            <FluxTables 
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
            />
          </div>

          <div className={`w-full p-4 ${selected == "carbon" ? "" : "hidden"}`}>
            <CarbonTables 
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
            />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
