"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/stores/auth";
import useGHGFluxApi from "@/api/ghg-flux.api";
import { format, subMonths, subWeeks, subYears } from "date-fns";

export default function TestPage() {
  const auth = useAuth();
  const { fetch, data, meta, fetching } = useGHGFluxApi();
  // Mendapatkan tanggal saat ini
  const currentDate = new Date();

  // Mengurangkan 1 tahun dari tanggal saat ini
  const getYearAgo = subYears(currentDate, 1);
  const getMonthAgo = subMonths(currentDate, 1);
  const getWeekAgo = subWeeks(currentDate, 2);
  const getTwoWeekAgo = subWeeks(currentDate, 2);

  // Format tanggal jika diperlukan
  const formattedDate = format(getYearAgo, "yyyy-MM-dd");

  // console.log("2 minggu yang lalu:", getTwoWeekAgo);

  const getGHGFlux = async (params: any) => {
    await fetch({ params: { limit: 10 } });
  };

  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = useCallback(async() => {
    await fetch({ params: { limit: 10, page } });
    if (data?.length > 0) {
      setItems((prevData) => [...prevData, ...data]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
  },[data])

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (hasMore) {
        fetchData();
      } else {
        clearTimeout(intervalId);
      }
    }, 0);
    // fetchData()
    return () => {
      clearTimeout(intervalId);
    }
  }, [hasMore]);

  console.log({ page, meta: meta.page, items, data }, "page");

  return (
    <Fragment>
      <div>
        <div>
          Count: {meta.count} Page: {meta.page} Page Count: {meta.pageCount}{" "}
          Total: {meta.total} total data: {items?.length}
        </div>
        <ul>
          {items.map((d, i) => (
            <li key={i} className="text-gray-800">
              {d.landCover}
            </li>
          ))}
        </ul>
        <button onClick={() => fetchData()}>Get Data</button>
      </div>
    </Fragment>
  );
}
