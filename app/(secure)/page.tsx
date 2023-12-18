"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import {
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdSearch,
} from "react-icons/md";
import MapComponent from "@/components/maps/MapComponent";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Navbar } from "@/components/navbar";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import ContentComponent from "@/components/maps/content/content-component";
import Footer from "@/components/footer";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import useLocationApi from "@/api/location-properties.api";
import { SelectTypes } from "@/utils/propTypes";
import { useAuth } from "@/stores/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const [sidebar, setSidebar] = useState(true);
  const [items, setItems] = useState<any>(null);

  const auth = useAuth();

  console.log(auth.isAuth, "auth");

  const sideFunction = () => {
    setSidebar((state) => !state);
  };

  // data-location
  const { fetch, data, meta, fetching } = useLocationApi();

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

  console.log(items, "items");

  const isLogin = true

  if (!isLogin) {
    // const returnUrl = encodeURIComponent(headers().get("x-invoke-path") || "/");
    redirect(`/login`);
  }

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
              items={items}
              setItems={setItems}
              locationOptions={optionsSelect.location}
            />
          </ScrollShadow>
        </div>

        <div
          className={`relative w-full p-4 shadow ${sidebar ? "lg:w-1/2" : ""}`}
        >
          <button
            type="button"
            className={`fixed lg:absolute z-10 rounded-l-lg px-1 py-2 bg-white shadow group group-hover:bg-white 
              ${
                !sidebar
                  ? "left-5 top-20 lg:top-5 rounded-r-lg"
                  : "-left-[1.6rem] top-6 rounded-r-none"
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
          </button>

          <ContentComponent
            data={items}
            sidebar={sidebar}
            landCoverOptions={optionsSelect.landCover}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
