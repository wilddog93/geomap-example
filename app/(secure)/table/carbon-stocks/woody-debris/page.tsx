"use client";

import { siteConfig } from "@/config/site";
// api
import { useLocationApi, usePropsApi } from "@/api/properties.api";
// utils
import { SelectTypes } from "@/utils/propTypes";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
// component
import Footer from "@/components/footer";
import { SearchIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import CarbonTables from "@/components/tables/carbon-tables";
import FluxTables from "@/components/tables/flux-tables";
import SoilTables from "@/components/tables/soil-tables";
import WeatherTables from "@/components/tables/weather-tables";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, Key, useEffect, useMemo, useState } from "react";
import { MdPlace } from "react-icons/md";
import WoodyTables from "@/components/tables/woody-tables";
import { splitStringTobeArray } from "@/utils/useFunction";

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
    label: "Soil Physical Chemistry",
    value: "soil-physical-chemistry",
  },
];

export default function TablePage(props: any) {
  // data-location
  const locationApi = useLocationApi();
  const propertyApi = usePropsApi();

  const [selected, setSelected] = useState("ghg");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string | any>("");
  let router = useRouter();
  const pathname = usePathname();

  const handleChange = (key: Key) => {
    setSelected(key as any);
    setPage(1);
  };

  const [location, setLocation] = useState<string>("");
  const [locationKey, setLocationKey] = useState<React.Key | null>("Mempawah");

  const onSelectionLocationChange = (key: React.Key) => {
    setLocationKey(key);
  };

  const onInputLocaationChange = (value: string) => {
    setLocationKey(value);
  };

  const filterLocation = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search = {
      $and: [{ location: { $contL: location } }],
    };

    qb.search(search);
    qb.sortBy({
      field: `location`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [location]);

  const getLocations = async (params: any) => {
    await locationApi.fetch({ params: params });
  };

  useEffect(() => {
    if (filterLocation) getLocations(filterLocation.queryObject);
  }, [filterLocation]);

  const filterByUniqueKey = (arr: SelectTypes[], key: keyof SelectTypes): SelectTypes[] => {
    const uniqueValues = new Set<any>();
    return arr.filter((obj) => {
      const value = obj[key];
      if (uniqueValues.has(value)) {
        return false; // Duplicate key value, exclude from the result
      }
      uniqueValues.add(value);
      return true; // Unique key value, include in the result
    });
  };

  const locationOptions = useMemo(() => {
    const { data } = locationApi;
    let location: any[] | SelectTypes[] = [];
    if (data.length > 0) {
      data.map((loc: any) => {
        let shortLocation = splitStringTobeArray(loc.location);
        let newShortLocation = shortLocation[shortLocation.length - 1];
        location.push({
          ...loc,
          label: loc.location,
          value: loc.location,
          state: newShortLocation?.trim(),
          // @ts-ignore
          categories: splitStringTobeArray(loc.description as string),
        });
      });
    }
    const filteredArray = filterByUniqueKey(location, 'value');
    return filteredArray;
  }, [locationApi?.data]);


  const filterLandCover = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search = {
      $and: [{ type: { $contL: "landcover" } }],
    };

    qb.search(search);
    qb.sortBy({
      field: `name`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, []);

  const getLandCover = async (params: any) => {
    await propertyApi.fetch({ params: params });
  };

  useEffect(() => {
    if (filterLandCover) getLandCover(filterLandCover.queryObject);
  }, [filterLandCover]);

  const landCoverOptions = useMemo(() => {
    const { data } = propertyApi;
    let location: SelectTypes[] | any[] = [];
    let landCover: SelectTypes[] | any[] = [];
    if (data.length > 0) {
      data.map((prop) => {
        landCover.push({
          ...prop,
          label: prop.name,
          value: prop.name,
        });
      });
    }
    return landCover;
  }, [propertyApi?.data]);

  // console.log({pathname}, "data-selected");
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
                defaultItems={locationOptions}
                startContent={<SearchIcon className="text-xl" />}
                defaultSelectedKey={locationKey as Key}
                variant="faded"
                color="primary"
                className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                allowsCustomValue={false}
                onSelectionChange={onSelectionLocationChange}
                onInputChange={onInputLocaationChange}
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
              {siteConfig.navMenuTables.map((item, idx) => {
                let path = item.path.toLowerCase();
                return (
                  <Button
                    key={idx}
                    radius="full"
                    onClick={() => router.push(item.href)}
                    className="relative group box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden outline-none max-w-fit h-9 px-4 bg-transparent text-default-300"
                  >
                    {pathname == item.href || pathname.includes(path) ? (
                      <span
                        className={`absolute z-0 inset-0 dark:bg-default shadow-small w-full bg-[#23487a]/40 border-2 border-[#23487a]/10 rounded-full text-white 
                        transition ease-in-out delay-150
                        `}
                        style={{
                          transformOrigin: "50% 50% 0px",
                        }}
                      ></span>
                    ) : null}
                    <div
                      className={`relative z-10 whitespace-nowrap transition-colors text-default-300 ${
                        pathname == item.href || pathname.includes(path)
                          ? "text-white font-bold"
                          : ""
                      }`}
                      data-slot="tabContent"
                    >
                      {item.label}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 mt-3">
            <Tabs
              variant="underlined"
              selectedKey={pathname}
              aria-label="Tabs"
              color="primary"
            >
              {siteConfig.navTabCarbon.map((item, id) => {
                return (
                  <Tab
                    key={item.href}
                    id={item.href}
                    href={item.href}
                    title={item.label}
                  />
                );
              })}
            </Tabs>
          </div>

          <div className={`w-full p-4`}>
            <WoodyTables
              params={props?.searchParams}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              filterValue={search}
              setFilterValue={setSearch}
              landCoverOptions={landCoverOptions}
              locationKey={locationKey}
              locationOptions={locationOptions}
            />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
