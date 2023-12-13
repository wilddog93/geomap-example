"use client"

import { Fragment, useEffect } from "react";
import { useAuth } from '@/stores/auth';
import useGHGFluxApi from "@/api/ghg-flux.api";

export default function TestPage() {
  const auth = useAuth()
  const { fetch, data, meta, fetching } = useGHGFluxApi()

  const getUsers = async () => {
    await fetch({ params: { limit: 10 } })
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <Fragment>
      <div>
        <div>
          Count: {meta.count} Page: {meta.page} Page Count: {meta.pageCount}
        </div>
        <ul>
          {data.map((d) => (
            <li key={d.id} className="text-gray-800">{d.landCover}</li>
          ))}
        </ul>
        <button onClick={() => getUsers()}>Get Users</button>
      </div>
    </Fragment>
  );
}
