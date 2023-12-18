"use client";

import useLocationApi, { LocationTypes } from "@/api/location-properties.api";
import Footer from "@/components/footer";
import { SearchIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import CarbonTables from "@/components/tables/carbon-tables";
import FluxTables from "@/components/tables/flux-tables";
import WeatherTables from "@/components/tables/weather-tables";
import { SelectTypes } from "@/utils/propTypes";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Fragment, Key, useEffect, useMemo, useState } from "react";
import { MdPlace } from "react-icons/md";

const itemTabs = [
  {
    id: "ghg",
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

export default function TablePage(props: any) {
  // data-location
  const { fetch, data, meta, fetching } = useLocationApi();

  const [selected, setSelected] = useState("ghg");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string | any>("");
  let router = useRouter();

  const handleChange = (key: Key) => {
    setSelected(key as any);
    setPage(1);
  };

  const [location, setLocation] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<React.Key | null>("Mempawah");

  const onSelectionChange = (key: React.Key) => {
    setSelectedKey(key);
  };

  const onInputChange = (value: string) => {
    setLocation(value);
  };

  const filterLocation = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search = {
      $and: [],
    };

    qb.search(search);
    qb.sortBy({
      field: `name`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, []);

  const getLocation = async (params: any) => {
    await fetch({ params: params.queryObject });
  };

  useEffect(() => {
    if (filterLocation) getLocation(filterLocation);
  }, [filterLocation]);

  const optionsSelect = useMemo(() => {
    let location: SelectTypes[] | any[] = [];
    let landCover: SelectTypes[] | any[] = [];
    if (data?.length > 0) {
      location = data
        ?.filter((e) => e.type == "location")
        .map((x) => ({
          ...x,
          label: x.name,
          value: x.name,
        }));
      landCover = data
        ?.filter((e) => e.type == "landCover")
        .map((x) => ({
          ...x,
          label: x.name,
          value: x.name,
        }));
    }
    return { location, landCover };
  }, [data]);

  console.log({location, selectedKey}, "data-selected");
  return (
    <Fragment>
      <Navbar />
      <section className="relative overflow-y-auto w-full h-full flex flex-col items-center gap-4">
        <div className="flex w-full flex-col">
          <div className="w-full flex overflow-y-hidden overflow-x-auto items-center p-2 bg-primary gap-4">
            <div>
              <Autocomplete
                radius="full"
                labelPlacement="outside"
                placeholder="Search location"
                defaultItems={optionsSelect.location}
                startContent={<SearchIcon className="text-xl" />}
                defaultSelectedKey="Mempawah"
                variant="faded"
                color="primary"
                className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                allowsCustomValue={false}
                onSelectionChange={onSelectionChange}
                onInputChange={onInputChange}
              >
                {(item) => (
                  <AutocompleteItem
                    startContent={
                      <MdPlace className="w-4 h-4 text-default-500" />
                    }
                    key={item.value}
                  >
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <div className="bg-primary inline-flex items-center gap-2">
              {itemTabs.map((tab) => {
                return (
                  <Button
                    key={tab.id}
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

          <div
            className={`w-full mt-5 p-4 ${
              selected == "ghg" ? "" : "hidden"
            }`}
          >
            <FluxTables
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
              landCoverOptions={optionsSelect.landCover}
              locationKey={selectedKey}
            />
          </div>

          <div className={`w-full mt-5 p-4 ${selected == "carbon" ? "" : "hidden"}`}>
            <CarbonTables
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
              landCoverOptions={optionsSelect.landCover}
              locationKey={selectedKey}
            />
          </div>

          <div className={`w-full mt-5 p-4 ${selected == "weather" ? "" : "hidden"}`}>
            <WeatherTables
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
              landCoverOptions={optionsSelect.landCover}
              locationKey={selectedKey}
            />
          </div>

          <div className={`w-full mt-5 p-4 ${selected == "soil" ? "" : "hidden"}`}>
            <WeatherTables
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
              landCoverOptions={optionsSelect.landCover}
              locationKey={selectedKey}
            />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
