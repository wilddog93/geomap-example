import { SelectTypes } from "@/utils/propTypes";
import { Accordion, AccordionItem, Tab, Tabs } from "@nextui-org/react";
import React, { Fragment, Key, useEffect, useMemo } from "react";
import { MdInfo } from "react-icons/md";
import AreaCharts from "../AreaCharts";
import {
  useCarbonLittersStatisticsApi,
  useCarbonSoilsStatisticsApi,
  useCarbonTreesStatisticsApi,
  useCarbonWoodyStatisticsMonthlyApi,
  useCarbonWoodyStatisticsYearlyApi,
} from "@/api/carbon-stocks.api";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import WoodyCharts from "./WoodyCharts";
import LittersCharts from "./LitterCharts";
import NSoilCharts from "./NSoilCharts";
import CSoilCharts from "./CSoilCharts";
import NMGSoilCharts from "./NMGSoilCharts";
import CMGSoilCharts from "./CMGSoilCharts";

type Props = {
  sidebar: boolean;
  query: {
    location: any;
    landCover: any;
  };
  categoryKey: Key | null;
  locationKey: Key | null;
};

export default function CarbonStockCharts({
  sidebar,
  query,
  categoryKey,
  locationKey,
}: Props) {
  // cchart

  // carbon-stock
  const WoodyYearly = useCarbonWoodyStatisticsYearlyApi();
  const WoodyMonthly = useCarbonWoodyStatisticsMonthlyApi();
  const LitterChartApi = useCarbonLittersStatisticsApi();
  const SoilChartApi = useCarbonSoilsStatisticsApi();
  const TreesChartApi = useCarbonTreesStatisticsApi();

  const filterChartCarbon = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [{ region: { $cont: query.location } }],
    };

    qb.search(search);
    qb.sortBy({
      field: `region`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [query]);

  const getWoodyChart = async (params: any) => {
    await WoodyYearly.fetch(params);
    await WoodyMonthly.fetch(params);
  };

  const getLitterChart = async (params: any) => {
    await LitterChartApi.fetch(params);
  };

  const getSoilChart = async (params: any) => {
    await SoilChartApi.fetch(params);
  };

  useEffect(() => {
    if (categoryKey == "Carbon Stock") {
      getWoodyChart(filterChartCarbon?.queryObject);
      getLitterChart(filterChartCarbon?.queryObject);
      getSoilChart(filterChartCarbon?.queryObject);
    }
  }, [filterChartCarbon, categoryKey]);

  console.log(WoodyYearly.data, "summary-data");

  return (
    <Fragment>
      <div className={`w-full ${sidebar ? "" : ""}`}>
        <Tabs variant="underlined" aria-label="Tabs variants">
          <Tab key="woody" title="Woody Debris">
            <div className="w-full flex flex-col gap-2 px-2">
              <div className="w-full flex justify-between items-center text-sm">
                <h3 className="text-default-700 font-bold">Latest Record</h3>
                <MdInfo className="w-3 h-4" />
              </div>
              <div className="border-1 border-b border-default-300 w-full"></div>
            </div>
            <Accordion defaultExpandedKeys={[`woody-1`]}>
              <AccordionItem
                key={`woody-1`}
                aria-label={`woody-1`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-xs font-semibold`}>Total</p>
                  </div>
                }
                aria-selected="true"
              >
                <div className="w-full flex flex-col relative">
                  <WoodyCharts data={WoodyYearly.data} />
                </div>
              </AccordionItem>
            </Accordion>
          </Tab>
          <Tab key="litters" title="Litters">
            <div className="w-full flex flex-col gap-2 px-2">
              <div className="w-full flex justify-between items-center text-sm">
                <h3 className="text-default-700 font-bold">Latest Record</h3>
                <MdInfo className="w-3 h-4" />
              </div>
              <div className="border-1 border-b border-default-300 w-full"></div>
            </div>
            <Accordion defaultExpandedKeys={[`litters-2`]}>
              <AccordionItem
                key={`litters-2`}
                aria-label={`litters-2`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-xs font-semibold`}>Litter Mas</p>
                  </div>
                }
                aria-selected="true"
              >
                <div className="w-full flex flex-col relative">
                  <LittersCharts data={LitterChartApi.data} />
                </div>
              </AccordionItem>
            </Accordion>
          </Tab>
          <Tab key="soils" title="Soils">
            <div className="w-full flex flex-col gap-2 px-2">
              <div className="w-full flex justify-between items-center text-sm">
                <h3 className="text-default-700 font-bold">Latest Record</h3>
                <MdInfo className="w-3 h-4" />
              </div>
              <div className="border-1 border-b border-default-300 w-full"></div>
            </div>
            <Accordion defaultExpandedKeys={["soil-1"]}>
              <AccordionItem
                key={`soil-1`}
                aria-label={`soil-1`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>N</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <NSoilCharts data={SoilChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`soil-2`}
                aria-label={`soil-2`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>C</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <CSoilCharts data={SoilChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`soil-3`}
                aria-label={`soil-3`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>nMg/Ha</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <NMGSoilCharts data={SoilChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`soil-4`}
                aria-label={`soil-4`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>cMg/Ha</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <CMGSoilCharts data={SoilChartApi.data} />
                </div>
              </AccordionItem>
            </Accordion>
          </Tab>
          <Tab key="trees" title="Trees">
            <div className="w-full flex flex-col gap-2 px-2">
              <div className="w-full flex justify-between items-center text-sm">
                <h3 className="text-sm font-bold">Latest Record</h3>
                <MdInfo className="w-3 h-4" />
              </div>
              <div className="border-1 border-b border-default-300 w-full"></div>
            </div>
            <Accordion>
              <AccordionItem
                key={`${categoryKey}-4`}
                aria-label={`${categoryKey}-4`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Trees</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ullam beatae harum eius dolorem atque laborum cupiditate
                  numquam magnam illum inventore magni, sed consectetur maiores
                  deserunt veniam tempora amet aperiam cum.
                </div>
              </AccordionItem>
            </Accordion>
          </Tab>
        </Tabs>
      </div>
    </Fragment>
  );
}
