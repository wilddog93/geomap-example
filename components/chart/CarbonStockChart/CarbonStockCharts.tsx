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
import WoodyCharts from "./woody/WoodyCharts";
import LittersCharts from "./litter/LitterCharts";
import NSoilCharts from "./soils/NSoilCharts";
import CSoilCharts from "./soils/CSoilCharts";
import NMGSoilCharts from "./soils/NMGSoilCharts";
import CMGSoilCharts from "./soils/CMGSoilCharts";
import DBHTreesCharts from "./trees/DBHTreesCharts";
import NoteTreesCharts from "./trees/NoteTreesCharts";
import TAGBTreesCharts from "./trees/TAGBTreesCharts";
import PlotTreesCharts from "./trees/PlotTreesCharts";
import PlotRadiusTreesCharts from "./trees/PlotRadiusTreesCharts";
import WoodTreesCharts from "./trees/WoodTreesCharts";

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

  const getTreesChart = async (params: any) => {
    await TreesChartApi.fetch(params);
  };

  useEffect(() => {
    if (categoryKey == "Carbon Stock") {
      getWoodyChart(filterChartCarbon?.queryObject);
      getLitterChart(filterChartCarbon?.queryObject);
      getSoilChart(filterChartCarbon?.queryObject);
      getTreesChart(filterChartCarbon?.queryObject);
    }
  }, [filterChartCarbon, categoryKey]);

  console.log(WoodyYearly.data, "summary-data");

  return (
    <Fragment>
      <div className={`w-full mt-5 ${sidebar ? "" : "hidden"}`}>
        <Tabs variant="underlined" aria-label="Tabs variants">
          <Tab key="woody" title="Woody Debris">
            <div className="w-full flex flex-col gap-2 px-2">
              <div className="w-full flex justify-between items-center text-sm">
                <h3 className="text-default-700 font-bold">Latest Record</h3>
                <MdInfo className="w-3 h-4" />
              </div>
              <div className="border-1 border-b border-default-300 w-full"></div>
            </div>
            <Accordion>
              <AccordionItem
                key={`woody-1`}
                aria-label={`woody-1`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Total</p>
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
            <Accordion>
              <AccordionItem
                key={`litters-2`}
                aria-label={`litters-2`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Litter Mas</p>
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
            <Accordion>
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
                key={`trees-1`}
                aria-label={`trees-1`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>DBH</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <DBHTreesCharts data={TreesChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`trees-2`}
                aria-label={`trees-2`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>TAGB</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <TAGBTreesCharts data={TreesChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`trees-3`}
                aria-label={`trees-3`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Notes</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <NoteTreesCharts data={TreesChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`trees-4`}
                aria-label={`trees-4`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Plot</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <PlotTreesCharts data={TreesChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`trees-5`}
                aria-label={`trees-5`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Plot Radius</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <PlotRadiusTreesCharts data={TreesChartApi.data} />
                </div>
              </AccordionItem>

              <AccordionItem
                key={`trees-6`}
                aria-label={`trees-6`}
                title={
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold`}>Wood Density</p>
                  </div>
                }
              >
                <div className="w-full flex flex-col relative">
                  <WoodTreesCharts data={TreesChartApi.data} />
                </div>
              </AccordionItem>
            </Accordion>
          </Tab>
        </Tabs>
      </div>

      <div
        className={`w-full flex flex-col gap-3 mt-5 ${sidebar ? "hidden" : ""}`}
      >
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-sm">
            <h3 className="text-default-700 font-bold">Latest Record</h3>
            <MdInfo className="w-3 h-4" />
          </div>
          <div className="border-1 border-b border-default-300 w-full"></div>
        </div>
        
        <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5`}>
          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Woody Debris
            </h3>
            <WoodyCharts data={WoodyYearly.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Litters
            </h3>
            <LittersCharts data={LitterChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soils (N)
            </h3>
            <NSoilCharts data={SoilChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soils (C)
            </h3>
            <CSoilCharts data={SoilChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soils (nMg/Ha)
            </h3>
            <NMGSoilCharts data={SoilChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Soils (cMg/Ha)
            </h3>
            <CMGSoilCharts data={SoilChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Trees (dbh)
            </h3>
            <DBHTreesCharts data={TreesChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Trees (tagb)
            </h3>
            <TAGBTreesCharts data={TreesChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Trees (notes)
            </h3>
            <NoteTreesCharts data={TreesChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Trees (Plot)
            </h3>
            <PlotTreesCharts data={TreesChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Trees (Plot Radius)
            </h3>
            <PlotRadiusTreesCharts data={TreesChartApi.data} />
          </div>

          <div className="w-full flex flex-col relative">
            <h3 className="font-semibold text-xs lg:text-sm -mb-5">
              Trees (Wood Density)
            </h3>
            <WoodTreesCharts data={TreesChartApi.data} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
