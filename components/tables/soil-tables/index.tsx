"use client";

import React, {
  ChangeEvent,
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import { Input } from "@nextui-org/input";

import { ChipProps } from "@nextui-org/chip";

import {
  Autocomplete,
  AutocompleteItem,
  Selection,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";

import { Pagination } from "@nextui-org/pagination";

import { Button } from "@nextui-org/button";

import {
  MdCalendarToday,
  MdMoreVert,
  MdOutlineSearch,
  MdSort,
} from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { objectToQueryString } from "@/utils/useFunction";
import { ColumnProps, GhgFluxTypes, SelectTypes } from "@/utils/propTypes";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { format, startOfYear, endOfYear } from "date-fns";
import { SoilsType, useSoilsApi } from "@/api/soils.api";
import DatePicker from "react-datepicker";

const periodeOptions: SelectTypes[] = [
  { label: "Yearly", value: "Yearly" },
  { label: "Range by date", value: "Range by date" },
];

const sortOptions: SelectTypes[] = [
  { label: "ID", value: "id" },
  { label: "DATE", value: "date" },
  { label: "PLOT", value: "plot" },
  { label: "LAND COVER", value: "landCover" },
  { label: "SOIL TYPE", value: "soilType" },
  { label: "TYPE", value: "type" },
];

const columns: ColumnProps[] = [
  { name: "NO", uid: "no", sortable: true },
  { name: "ID", uid: "id", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "PLOT", uid: "plot", sortable: true },
  { name: "LAND COVER", uid: "landCover", sortable: true },
  { name: "SOIL TYPE", uid: "soilType", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "SAMPLE CODE", uid: "sampleCode", sortable: true },
  {
    name: (
      <div>
        BULK DENSITY
        <p>
          (g/cm<sup>3</sup>)
        </p>
      </div>
    ),
    uid: "bulkDensity",
  },
  {
    name: (
      <div>
        GRAVIMETRIC WATER CONTENT
        <p>(%)</p>
      </div>
    ),
    uid: "gravimetricWaterContent",
  },
  {
    name: (
      <div>
        VOLUMETRIC WATER CONTENT
        <p>(%)</p>
      </div>
    ),
    uid: "volumetricWaterContent",
  },
  {
    name: (
      <div>
        PH
        <p>(%)</p>
      </div>
    ),
    uid: "pH",
  },
  {
    name: (
      <div>
        REDOX POTENTIAL
        <p>(%)</p>
      </div>
    ),
    uid: "redox",
  },
  {
    name: (
      <div>
        KALIUM CONTENT
        <p>(Mg/ha)</p>
      </div>
    ),
    uid: "k",
  },
  {
    name: (
      <div>
        CATION EXCHANGE CAPACITY
        <p>(%)</p>
      </div>
    ),
    uid: "ktk",
  },
  {
    name: (
      <div>
        PHOSPOROUS PENTOXIDE CONTENT
        <p>(%)</p>
      </div>
    ),
    uid: "p205",
  },
  {
    name: (
      <div>
        CARBON CONTENT
        <p>(Mg/ha)</p>
      </div>
    ),
    uid: "carbon",
  },
  {
    name: (
      <div>
        NITROGEN CONTENT
        <p>(Mg/ha)</p>
      </div>
    ),
    uid: "n",
  },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "date",
  "plot",
  "landCover",
  "soilType",
  "type",
  "sampleCode",
  "gravimetricWaterContent",
  "bulkDensity",
  "volumetricWaterContent",
  "pH",
  "redox",
  "k",
  "ktk",
  "p205",
  "carbon",
  "n",
];

const soilTypeOptions: SelectTypes[] = [
  {
    value: "physical",
    label: "Physical",
  },
  {
    value: "chemChar1",
    label: "Chemistry Char 1",
  },
  {
    value: "chemChar2",
    label: "Chemistry Char 2",
  },
  {
    value: "chemChar3",
    label: "Chemistry Char 3",
  },
];

type TableProps = {
  params?: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  landCoverOptions?: SelectTypes[] | any[];
  locationKey?: Key | null;
  locationOptions?: SelectTypes[] | any[];
};

export default function SoilTables({
  params,
  page,
  setPage,
  limit,
  setLimit,
  filterValue,
  setFilterValue,
  landCoverOptions,
  locationKey,
  locationOptions,
}: TableProps) {
  // const [filterValue, setFilterValue] = useState("");
  // data-table-with-api
  const { fetch, data, meta, fetching } = useSoilsApi();

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "date",
    direction: "ascending",
  });

  // dropdown
  const [landCoverKey, setLandCoverKey] = useState<Key | null>("Secondary Forest");
  const [landCoverFilter, setLandCoverFilter] = useState("");
  const [periodeKey, setPeriodeKey] = useState<Key | null>("");
  const [periodeFilter, setPeriodeFilter] = useState("");
  const [sortKey, setSortKey] = useState<Key | null>("id");
  const [sortFilter, setSortFilter] = useState("id");

  // page-count
  // const [pages, setPages] = useState(0)

  let router = useRouter();
  let pathname = usePathname();
  let search = useSearchParams();

  // date-periode
  const now = new Date();
  const [periodeDate, setPeriodeDate] = useState(new Date());
  const [start, setStart] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const [end, setEnd] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0)
  );
  const [dateRange, setDateRange] = useState<Date[] | any[]>([start, end]);
  const [startDate, endDate] = dateRange;

  // date-format
  const dateFormat = (date: any) => {
    let _dt = format(new Date(date), "yyyy-MM-dd");
    if (!date) return;
    return _dt;
  };

  // soils
  const [soilTypeKey, setSoilTypeKey] = useState<Key | null>("physical");
  const [soilTypeInput, setSoilTypeInput] = useState<string>("");

  const onSelectionSoilTypeChange = (key: Key) => {
    setSoilTypeKey(key);
  };

  const onInputSoilTypeChange = (value: string) => {
    setSoilTypeInput(value);
  };

  // function dropdown
  const onSelectionLandCoverChange = (key: Key) => {
    setLandCoverKey(key);
  };

  const onInputLandCoverChange = (value: string) => {
    setLandCoverFilter(value);
    setPage(1);
  };

  const onSelectionPeriodeChange = (key: Key) => {
    setPeriodeKey(key);
  };

  const onInputPeriodeChange = (value: string) => {
    setPeriodeFilter(value);
    setPage(1);
  };

  const onSelectionSortChange = (key: Key) => {
    setSortKey(key);
  };

  const onInputSortChange = (value: string) => {
    setSortFilter(value);
    setPage(1);
  };
  // end function dropdown

  // filter location key
  const getFilterLocation = useCallback(
    (key: Key) => {
      let state = locationOptions
        ?.filter((item) => item.location == key)
        .map((item) => item.state)
        .toString();
      return { state };
    },
    [locationOptions]
  );

  // filter periode
  const periodeFilterred = useMemo(() => {
    let start: string | null | any = "";
    let end: string | null | any = "";
    if (periodeKey == "Range by date") {
      start = startDate ? format(new Date(startDate), "yyyy-MM-dd") : "";
      end = endDate ? format(new Date(endDate), "yyyy-MM-dd") : "";
    } else if (periodeKey == "Yearly") {
      start = periodeDate ? format(startOfYear(periodeDate), "yyyy-MM-dd") : "";
      end = periodeDate ? format(endOfYear(periodeDate), "yyyy-MM-dd") : "";
    }

    return { start, end };
  }, [periodeKey, periodeDate, startDate, endDate]);
  // filter perioded end

  // query-prams
  useEffect(() => {
    let isSearch = search.has("search");
    let isPage = search.has("page");
    let isLimit = search.has("limit");

    let newSearch = search.get("search");
    let newPage = search.get("page");
    let newLimit = search.get("limit");

    if (isPage) setPage(Number(newPage));
    if (isLimit) setLimit(Number(newLimit));
    if (isSearch) setFilterValue(newSearch as string);
  }, [search]);

  const getQuery = useMemo(() => {
    let query: any = {
      page,
      limit,
    };
    if (filterValue) query = { ...query, search: filterValue };
    if (locationKey)
      query = {
        ...query,
        location: getFilterLocation(locationKey as any).state,
      };
    if (landCoverKey) query = { ...query, landCover: landCoverKey };
    return query;
  }, [page, limit, filterValue, locationKey, landCoverKey]);

  const filterParams = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search: any = {
      $and: [
        { location: { $cont: getQuery?.location } },
        { landCover: { $cont: getQuery?.landCover } },
        // { soilType: { $cont: soilTypeKey } },
        {
          $or: [
            { landCover: { $contL: getQuery?.search } },
            { plot: { $contL: getQuery?.search } },
            { location: { $contL: getQuery?.search } },
          ],
        },
      ],
    };
    if (soilTypeKey)
      search?.$and?.push({ soilType: { $cont: soilTypeKey } });

    if (soilTypeKey == "physical" && periodeKey && periodeFilterred.start)
      search?.$and?.push({
        date: {
          $gte: periodeFilterred.start,
          $lte: periodeFilterred.end,
        },
      });
    if (getQuery?.page) qb.setPage(Number(getQuery?.page) || 1);
    if (getQuery?.limit) qb.setLimit(Number(getQuery?.limit) || 5);

    qb.search(search);
    if (sortKey) {
      qb.sortBy({
        field: `${sortKey}`,
        order: "ASC",
      });
    } else {
      qb.sortBy({
        field: `id`,
        order: "ASC",
      });
    }
    qb.query();
    return qb;
  }, [getQuery, periodeFilterred, sortKey, periodeKey, soilTypeKey, landCoverKey]);

  useEffect(() => {
    router.replace(
      `${pathname}${getQuery ? `?${objectToQueryString(getQuery)}` : ""}`,
      { scroll: false }
    );
    console.log(objectToQueryString(getQuery), "query");
  }, [getQuery]);
  // query-params end

  // get-data
  const getSoilData = async (params: any) => {
    await fetch({ params });
  };

  useEffect(() => {
    if (filterParams) {
      getSoilData(filterParams?.queryObject);
    }
  }, [filterParams]);
  // end get-data

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = useMemo(() => {
    let pages = meta.pageCount;
    return pages;
  }, [meta.pageCount]);

  // const pages = meta.pageCount;

  const items = useMemo(() => {
    let arr: any[] = [];
    data.map((item, i) => {
      arr.push({
        ...item,
        no: 1 + i,
      });
    });

    return arr;
  }, [data]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: GhgFluxTypes, b: GhgFluxTypes) => {
      const first = a[sortDescriptor.column as keyof GhgFluxTypes] as number;
      const second = b[sortDescriptor.column as keyof GhgFluxTypes] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((item: SoilsType, columnKey: Key) => {
    const cellValue = item[columnKey as keyof SoilsType];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue || "-"}
            </p>
          </div>
        );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? dateFormat(cellValue) : "-"}
            </p>
          </div>
        );
      case "plot":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue || "-"}
            </p>
          </div>
        );
      case "landCover":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue || "-"}
            </p>
          </div>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue || "-"}
            </p>
          </div>
        );
      case "soilType":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue || "-"}
            </p>
          </div>
        );
      case "sampleCode":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue || "-"}
            </p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      // setRowsPerPage(Number(e.target.value));
      setLimit(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex flex-col lg:flex-row justify-between gap-3 items-end">
          <Input
            isClearable
            radius="full"
            placeholder="Search..."
            labelPlacement="outside"
            startContent={<MdOutlineSearch className="w-4 h-4" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="faded"
            color="primary"
            className="w-full sm:max-w-[44%] rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
          />
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex w-full max-w-[12rem] flex-col gap-2">
              <Autocomplete
                radius="full"
                labelPlacement="outside"
                placeholder="Select land cover"
                defaultItems={landCoverOptions}
                defaultSelectedKey={landCoverKey as Key}
                variant="faded"
                color="primary"
                className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                allowsCustomValue={true}
                onSelectionChange={onSelectionLandCoverChange}
                onInputChange={onInputLandCoverChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <div className="flex w-full max-w-[12rem] flex-col gap-2">
              <Autocomplete
                radius="full"
                labelPlacement="outside"
                placeholder="Select soil type"
                defaultItems={soilTypeOptions}
                defaultSelectedKey={soilTypeKey as Key}
                variant="faded"
                color="primary"
                className={`w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60`}
                allowsCustomValue={true}
                onSelectionChange={onSelectionSoilTypeChange}
                onInputChange={onInputSoilTypeChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <div className="w-full max-w-[12rem] flex flex-col gap-2">
              <Autocomplete
                radius="full"
                labelPlacement="outside"
                placeholder="Sort By"
                defaultItems={sortOptions}
                defaultSelectedKey={sortKey as Key}
                variant="faded"
                color="primary"
                className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                allowsCustomValue={true}
                onSelectionChange={onSelectionSortChange}
                onInputChange={onInputSortChange}
                endContent={<MdSort className="w-5 h-5" />}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <div
              className={`w-full max-w-[12rem] flex flex-col gap-2 ${
                soilTypeKey !== "physical" ? "hidden" : ""
              }`}
            >
              <Autocomplete
                radius="full"
                labelPlacement="outside"
                placeholder="Select periode"
                defaultItems={periodeOptions}
                defaultSelectedKey={periodeKey as Key}
                variant="faded"
                color="primary"
                className={`w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60`}
                allowsCustomValue={true}
                onSelectionChange={onSelectionPeriodeChange}
                onInputChange={onInputPeriodeChange}
                startContent={<MdCalendarToday className="w-5 h-5" />}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <div
              className={`w-full max-w-[12rem] flex flex-col gap-2 ${
                soilTypeKey !== "physical" || !periodeKey ? "hidden" : ""
              }`}
            >
              <div
                className={`w-full ${periodeKey !== "Yearly" ? "hidden" : ""}`}
              >
                <label className="w-full text-gray-5 overflow-hidden">
                  <DatePicker
                    selected={periodeDate}
                    onChange={(date: any) => setPeriodeDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    yearItemNumber={6}
                    showIcon
                    icon={
                      (
                        <MdCalendarToday className="h-3 w-3 text-gray-5 m-auto top-1" />
                      ) as any
                    }
                    isClearable
                    className="z-20 text-sm w-full text-gray-5 rounded-full border-2 border-stroke bg-transparent py-3.5 pl-8 pr-6 outline-none focus:border-primary focus-visible:shadow-none"
                    popperClassName="z-30"
                  />
                </label>
              </div>

              <div
                className={`w-full ${periodeKey !== "Range by date" ? "hidden" : ""}`}
              >
                <label className="w-full text-gray-5 overflow-hidden">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(dates: any) => {
                      setDateRange(dates);
                    }}
                    dateFormat="dd/MM-yy"
                    monthsShown={2}
                    placeholderText={"Select date"}
                    // todayButton={"Today"}
                    dropdownMode="select"
                    peekNextMonth={true}
                    dateFormatCalendar="MMM yyyy"
                    showMonthDropdown
                    showYearDropdown
                    calendarClassName="-left-10"
                    clearButtonClassName="p-1"
                    className="text-sm w-full text-gray-5 rounded-full border-2 border-stroke bg-transparent py-3.5 pl-8 pr-6 outline-none focus:border-primary focus-visible:shadow-none "
                    popperClassName="z-30"
                    isClearable
                    showIcon
                    icon={
                      (
                        <MdCalendarToday className="h-3 w-3 text-gray-5 m-auto top-1" />
                      ) as any
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
    landCoverFilter,
    landCoverOptions,
    onSelectionLandCoverChange,
    onInputLandCoverChange,
    soilTypeKey,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="w-[30%] flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={limit}
              onChange={onRowsPerPageChange}
            >
              {[5, 10, 20, 30].map((pageSize, idx) => (
                <option key={idx} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    items.length,
    page,
    pages,
    hasSearchFilter,
    onRowsPerPageChange,
    limit,
  ]);

  const getSelect = useMemo(() => {
    // console.log(Array.from(selectedKeys).includes("3"), "filter-check");
    if (selectedKeys == "all") return items;
    return items.filter((column) =>
      Array.from(selectedKeys).includes(column.id.toString())
    );
  }, [selectedKeys]);

  return (
    <Table
      isStriped
      // removeWrapper
      color="primary"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[450px] shadow-none",
        base: "overflow-x-auto overflow-y-hidden py-5",
      }}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            // className="bg-primary/20"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No items found"}
        items={sortedItems}
        isLoading={fetching}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="bg-white py-3">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
