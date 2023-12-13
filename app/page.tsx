"use client";

import { ChangeEvent, useEffect, useState } from "react";
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

export default function Home() {
  const [sidebar, setSidebar] = useState(true);
  const [items, setItems] = useState<any>(null);
  const [isSelected, setIsSelected] = useState<string | any>("yearly");

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsSelected(e.target.value);
  };

  const sideFunction = () => {
    setSidebar((state) => !state);
  };

  console.log(items, "items");

  const dataSelects = [
    { label: "Yearly", value: "yearly" },
    { label: "Monthly", value: "monthly" },
    { label: "Weekly", value: "weekly" },
    { label: "Daily", value: "daily" },
  ];

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
            <MapComponent items={items} setItems={setItems} />
          </ScrollShadow>
        </div>

        <div
          className={`relative w-full p-4 shadow ${
            sidebar ? "lg:w-1/2" : ""
          }`}
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
          <ScrollShadow hideScrollBar className="w-full h-full">
            <div
              className={`w-full flex items-center px-4 mb-5 ${
                !sidebar ? "mt-10" : "mt-5"
              }`}
            >
              <div className="w-full flex flex-col gap-3 lg:1/2">
                <h3 className="font-bold text-xl">
                  {items?.locationName || ""}
                </h3>
                <ul className="list-disc text-sm">
                  {items?.description || items?.description?.length > 0
                    ? items?.description?.map((desc: any) => {
                        return <li key={desc}>{desc}</li>;
                      })
                    : null}
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
                <Select
                  radius="full"
                  label=""
                  className="w-full shadow-sm rounded-full bg-white dark:bg-default/60 backdrop-blur-xl backdrop-saturate-200 hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
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
                  selectedKeys={[isSelected]}
                  onChange={handleSelectionChange}
                >
                  {dataSelects.map((data) => (
                    <SelectItem key={data.value} value={data.value}>
                      {data.label}
                    </SelectItem>
                  ))}
                </Select>
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

            <ContentComponent sidebar={sidebar} />
          </ScrollShadow>
        </div>
      </section>
      <Footer />
    </main>
  );
}
