"use client";

import { Key, useEffect, useMemo, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import Footer from "@/components/footer";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { SelectTypes } from "@/utils/propTypes";
import { redirect } from "next/navigation";
import {
  replaceStringNoSpace,
  sortByArr,
  splitStringTobeArray,
} from "@/utils/useFunction";
// api
import { useAuth } from "@/stores/auth";
import { LocationTypes, useLocationApi, usePropsApi } from "@/api/properties.api";
// component
import MapComponent from "@/components/maps/MapComponent";
import { Navbar } from "@/components/navbar";
import ContentComponent from "@/components/maps/content/content-component";
import { getCookie, getCookies } from "cookies-next";

export default function Home() {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [items, setItems] = useState<any>(null);

  const auth = useAuth();
  const token = getCookie("token");

  console.log(token, "token", auth.isAuth);

  // filter-map
  const [location, setLocation] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [locationKey, setLocationKey] = useState<Key | null>("");
  const [categoryKey, setCategoryKey] = useState<Key | null>(
    "GHG Fluxes & other variables"
  );
  const [periodeKey, setPeriodeKey] = useState<Key | null>("");
  const [periodeFilter, setPeriodeFilter] = useState("");
  const [landCoverKey, setLandCoverKey] = useState<Key | null>("");
  const [landCoverFilter, setLandCoverFilter] = useState("");

  // function
  // location-search
  const onSelectionLocationChange = (key: Key) => {
    setLocationKey(key);
  };

  const onInputLocationChange = (value: string) => {
    setLocation(value);
  };

  // select ghg
  const onSelectionCategoryChange = (key: Key) => {
    setCategoryKey(key);
  };

  const onInputCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

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
  // filter-map-end

  const sideFunction = () => {
    setSidebar((state) => !state);
  };

  // data-location
  const locationApi = useLocationApi();

  const filterLocation = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search = {
      $and: [],
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

  type locationProps = {
    
  }

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

  const filterByUniqueKeyPoint = (
    arr: LocationTypes[],
    key: keyof LocationTypes
  ): LocationTypes[] => {
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
      if(categoryKey == "Carbon Stock") {
        data.map((loc: any) => {
          let shortLocation = splitStringTobeArray(loc.location);
          let newShortLocation = shortLocation[shortLocation.length - 1];
          location.push({
            ...loc,
            label: newShortLocation?.trim(),
            value: newShortLocation?.trim(),
            state: newShortLocation?.trim(),
            // @ts-ignore
            categories: splitStringTobeArray((loc.optionalDescription as string) || (loc.description as string)),
            landCoverOptions: splitStringTobeArray((loc.landCover as string))
          });
        });
      } else {
        data.map((loc: any) => {
          let shortLocation = splitStringTobeArray(loc.location);
          let newShortLocation = shortLocation[shortLocation.length - 1];
          location.push({
            ...loc,
            label: loc.location,
            value: loc.location,
            state: newShortLocation?.trim(),
            // @ts-ignore
            categories: splitStringTobeArray((loc.optionalDescription as string) || (loc.description as string)),
            landCoverOptions: splitStringTobeArray((loc.landCover as string))
          });
        });
      }
    }
    console.log(location, "location-value")
    const filteredArray = filterByUniqueKey(location, "value");
    // const filteredArray = location
    return filteredArray;
  }, [locationApi?.data , categoryKey]);

  const locationPoint = useMemo(() => {
    const { data } = locationApi;
    let location: any[] | SelectTypes[] = [];
    data.map((loc: any) => {
      let shortLocation = splitStringTobeArray(loc.location);
      let newShortLocation = shortLocation[shortLocation.length - 1];
      location.push({
        ...loc,
        state: newShortLocation?.trim(),
        // @ts-ignore
        categories: splitStringTobeArray((loc.optionalDescription as string) || (loc.description as string)),
        landCoverOptions: splitStringTobeArray((loc.landCover as string))
      });
    });
    console.log(location, "location-value")
    const filteredArray = filterByUniqueKeyPoint(location as LocationTypes[], "location");
    // const filteredArray = location
    return filteredArray;
  }, [locationApi?.data , categoryKey]);

  // lcoation to be map data poin
  const mapData = useMemo(() => {
    let points: any[] = [];
    let categories: any[] = [];
    let newCat: SelectTypes[] = [];
    let landCovers: any[] = [];
    let newLandCover: SelectTypes[] = [];
    if (locationPoint.length > 0) {
      locationPoint.map((items: any) => {
        items?.categories?.map((x: any) => {
          points.push({
            ...items,
            lat: replaceStringNoSpace(items?.lat as string),
            long: replaceStringNoSpace(items?.long as string),
            category: x?.trim(),
          });
          categories.push({
            label: x?.trim(),
            value: x?.trim(),
          });
        });
        items?.landCoverOptions?.map((t:any) => {
          landCovers.push({
            value: t?.trim(),
            label: t?.trim(),
          })
        })
      });
      newCat = Array.from(new Set(categories.map((item) => item?.value))).map(
        (value) => categories.find((item: any) => item?.value === value)
      );

      newLandCover = Array.from(new Set(landCovers.map((item) => item?.value))).map(
        (value) => landCovers.find((item: any) => item?.value === value)
      );
    }
    return { points, categories: newCat, landCovers: newLandCover };
  }, [locationPoint]);

  // console.log({locationOptions , mapData}, 'locationOptions')

  // land-cover options
  const landCoverOptions = useMemo(() => {
    let shortLocation = splitStringTobeArray(locationKey as string);
    let newShortLocation = shortLocation[shortLocation.length - 1];

    let locationSelected = newShortLocation?.trim()
    let newLandCover: SelectTypes[] = [];

    let filter = locationSelected ? locationOptions?.filter((loc:any) => {
      return loc?.state == locationSelected
    }) : locationOptions;

    filter?.map((item:any) => {
      item?.landCoverOptions?.map((land:any) => {
        newLandCover.push({
          value: land?.trim(),
          label: land?.trim(),
        })
      })
    })

    let result = Array.from(new Set(newLandCover.map((item) => item?.value))).map(
      (value) => newLandCover.find((item: any) => item?.value === value)
    );

    const getValue = (o: any) => {
      return o?.value;
    };
    let sortByValue = sortByArr(getValue, true);
    let sortResult = result.sort(sortByValue);

    return sortResult;
  }, [locationKey, locationOptions]);

  return (
    <main className="relative w-full h-full flex-grow text-default-500">
      <Navbar />
      <section className="relative overflow-y-auto w-full h-full flex">
        <div
          className={`absolute inset-y-0 h-full left-0 z-10 flex flex-col overflow-y-hidden bg-gray-4 duration-300 ease-in-out lg:static lg:translate-x-0 ${
            sidebar ? "translate-x-0  w-full lg:w-1/2" : "-translate-x-full w-0"
          }`}
        >
          <ScrollShadow hideScrollBar className="w-full h-full">
            <button
              type="button"
              className="inline-flex lg:hidden absolute z-10 right-1 mt-1 p-1 rounded-sm bg-white shadow"
              onClick={sideFunction}
            >
              <MdClose className="w-4 h-4" />
            </button>
            <MapComponent
              mapData={mapData}
              items={items}
              setItems={setItems}
              locationOptions={locationOptions}
              locationKey={locationKey}
              onInputLocationChange={onInputLocationChange}
              onSelectionLocationChange={onSelectionLocationChange}
              categoryKey={categoryKey}
              onInputCategoryChange={onInputCategoryChange}
              onSelectionCategoryChange={onSelectionCategoryChange}
            />
          </ScrollShadow>
        </div>

        <div
          className={`relative overflow-auto w-full h-full px-6 lg:px-8 shadow ${
            sidebar ? "lg:w-1/2" : ""
          }`}
        >
          {/* <button
            type="button"
            className={`fixed lg:absolute z-10 rounded-l-lg px-1 py-2 bg-white shadow group group-hover:bg-white 
              ${
                !sidebar
                  ? "left-5 top-20 lg:top-5 rounded-r-lg"
                  : "-left-[1.5rem] top-6 rounded-r-none"
              }
              `}
            onClick={sideFunction}
          >
            {!sidebar ? (
              <div className="w-full max-w-max flex items-center gap-1">
                <span className="duration-300 text-sm text-default-500">
                  Map
                </span>
                <MdChevronRight className="w-4 h-4" />
              </div>
            ) : (
              <MdChevronLeft className="w-4 h-4" />
            )}
          </button> */}

          <ContentComponent
            data={items}
            sidebar={sidebar}
            locationKey={locationKey}
            locationOptions={locationOptions}
            categoryKey={categoryKey}
            landCoverOptions={landCoverOptions}
            landCoverKey={landCoverKey}
            periodeKey={periodeKey}
            onInputLandCoverChange={onInputLandCoverChange}
            onSelectionPeriodeChange={onSelectionPeriodeChange}
            onInputPeriodeChange={onInputPeriodeChange}
            onSelectionLandCoverChange={onSelectionLandCoverChange}
          />
        </div>

        <button
          type="button"
          className={`fixed lg:absolute z-10 rounded-l-lg px-1 py-2 bg-white shadow group group-hover:bg-white 
              ${
                !sidebar
                  ? "left-5 top-20 lg:top-5 rounded-r-lg"
                  : "inset-x-[48.3%] top-6 rounded-r-none"
              }
              `}
          onClick={sideFunction}
        >
          {!sidebar ? (
            <div className="w-full max-w-max flex items-center gap-1">
              <span className="duration-300 text-sm text-default-500">Map</span>
              <MdChevronRight className="w-4 h-4" />
            </div>
          ) : (
            <MdChevronLeft className="w-4 h-4" />
          )}
        </button>
      </section>
      <Footer />
    </main>
  );
}
