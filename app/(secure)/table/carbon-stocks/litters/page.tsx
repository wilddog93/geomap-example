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
import { sortByArr, splitStringTobeArray } from "@/utils/useFunction";
import LittersTables from "@/components/tables/carbon-stocks/litters-tables";

export default function TablePage(props: any) {
  // data-location
  const locationApi = useLocationApi();
  const propertyApi = usePropsApi();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string | any>("");
  let router = useRouter();
  const pathname = usePathname();

  const [location, setLocation] = useState<string>("");
  const [locationKey, setLocationKey] = useState<React.Key | null>("");

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

  const filterByUniqueKey = (
    arr: SelectTypes[],
    key: keyof SelectTypes
  ): SelectTypes[] => {
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
          categories: splitStringTobeArray(
            (loc.optionalDescription as string) || (loc.description as string)
          ),
          landCoverOptions: splitStringTobeArray(loc.landCover as string),
        });
      });
    }
    const filteredArray = filterByUniqueKey(location, "value");
    return filteredArray;
  }, [locationApi?.data]);

  // landcover options
  const landCoverOptions = useMemo(() => {
    let shortLocation = splitStringTobeArray(locationKey as string);
    let newShortLocation = shortLocation[shortLocation.length - 1];

    let locationSelected = newShortLocation?.trim();
    let newLandCover: SelectTypes[] = [];

    let filter = locationSelected
      ? locationOptions?.filter((loc: any) => {
          return loc?.state == locationSelected;
        })
      : locationOptions;

    filter?.map((item: any) => {
      item?.landCoverOptions?.map((land: any) => {
        newLandCover.push({
          value: land?.trim(),
          label: land?.trim(),
        });
      });
    });

    let result = Array.from(
      new Set(newLandCover.map((item) => item?.value))
    ).map((value) => newLandCover.find((item: any) => item?.value === value));

    const getValue = (o: any) => {
      return o?.value;
    };
    let sortByValue = sortByArr(getValue, true);
    let sortResult = result.sort(sortByValue);

    return sortResult;
  }, [locationKey, locationOptions]);

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
            <LittersTables
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
