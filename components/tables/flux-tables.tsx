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

import { Chip, ChipProps } from "@nextui-org/chip";

import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Selection,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";

import { Pagination } from "@nextui-org/pagination";

import { Button } from "@nextui-org/button";

import { MdMoreVert, MdOutlineSearch, MdPlace } from "react-icons/md";
import useGHGFluxApi from "@/api/ghg-flux.api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { objectToQueryString } from "@/utils/useFunction";
import { ColumnProps, GhgFluxTypes, SelectTypes } from "@/utils/propTypes";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  banned: "danger",
  inactive: "warning",
};

// const landCoverOptions: SelectTypes[] = [
//   { label: "Secondary Forest", value: "secondary forest" },
//   { label: "Rewetted Oil Palm", value: "rewettedoil palm" },
//   { label: "Rewetted Shrub", value: "rewettedshrub" },
//   { label: "Drained Oil Palm", value: "drainedoil palm" },
//   { label: "Drained Shrub", value: "drainedoil" },
// ];

const columns: ColumnProps[] = [
  { name: "NO", uid: "no", sortable: true },
  { name: "ID", uid: "id", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "PLOT", uid: "plot", sortable: true },
  { name: "LAND COVER", uid: "landCover", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "AIR TEMPERATURE", uid: "airTemperature" },
  { name: "SOIL TEMPERATURE", uid: "soilTemperature" },
  { name: "SOIL MOISTURE", uid: "soilMoisture" },
  { name: "WATER TABLE", uid: "waterTable" },
  { name: "CH4", uid: "ch4" },
  { name: "CO2", uid: "co2" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "date",
  "plot",
  "landCover",
  "type",
  "airTemprature",
  "soilTemperature",
  "soilMoisture",
  "waterTable",
  "ch4",
  "co2",
];

type TableProps = {
  params?: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  landCoverOptions?: SelectTypes[] | any[]
  locationKey?: Key | null
};

export default function FluxTables({
  params,
  page,
  setPage,
  limit,
  setLimit,
  filterValue,
  setFilterValue,
  landCoverOptions,
  locationKey
}: TableProps) {
  // const [filterValue, setFilterValue] = useState("");
  // data-table-with-api
  const { fetch, data, meta, fetching } = useGHGFluxApi();
  const [dataTables, setdataTables] = useState<GhgFluxTypes[]>([]);

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

  const [landCoverKey, setLandCoverKey] = useState<Key | null>("Secondary Forest");
  const [landCoverFilter, setLandCoverFilter] = useState("Secondary Forest");
  // page-count
  // const [pages, setPages] = useState(0)

  let router = useRouter();
  let pathname = usePathname();
  let search = useSearchParams();

  const onSelectionLandCoverChange = (key: Key) => {
    setLandCoverKey(key);
  };

  const onInputLandCoverChange = (value: string) => {
    setLandCoverFilter(value);
  };

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
    if (locationKey) query = { ...query, location: locationKey };
    if (landCoverKey) query = { ...query, landCover: landCoverKey };
    return query;
  }, [page, limit, filterValue, locationKey, landCoverKey]);

  const filterParams = useMemo(() => {
    const qb = RequestQueryBuilder.create();

    const search = {
      $and: [
        { location: { $cont: getQuery?.location } },
        { landCover: { $cont: getQuery?.landCover } },
        {
          $or: [
            { type: { $contL: getQuery?.search } },
            { landCover: { $contL: getQuery?.search } },
            { plot: { $contL: getQuery?.search } },
            { location: { $contL: getQuery?.search } },
          ],
        },
      ],
    };

    if (getQuery?.page) qb.setPage(Number(getQuery?.page) || 1);
    if (getQuery?.limit) qb.setLimit(Number(getQuery?.limit) || 5);

    qb.search(search);
    qb.sortBy({
      field: `id`,
      order: "ASC",
    });
    qb.query();
    return qb;
  }, [getQuery]);

  useEffect(() => {
    router.replace(
      `${pathname}${getQuery ? `?${objectToQueryString(getQuery)}` : ""}`,
      { scroll: false }
    );
    console.log(objectToQueryString(getQuery), "query");
  }, [getQuery]);
  // query-params end

console.log(locationKey, 'key-location')

  // get-data
  const getGHGFlux = async (params: any) => {
    await fetch({ params: params?.queryObject });
  };
  useEffect(() => {
    if (filterParams) {
      getGHGFlux(filterParams);
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

  const pages = meta.pageCount;

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

  const renderCell = useCallback((item: GhgFluxTypes, columnKey: Key) => {
    const cellValue = item[columnKey as keyof GhgFluxTypes];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "plot":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "landCover":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "airTemprature":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "soilTemprature":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "soilMoisture":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "waterTable":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "ch4":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "co2":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MdMoreVert className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu color="primary" className="text-black">
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
            <div className="flex w-full max-w-xs flex-col gap-2">
              {/* <Select
                labelPlacement="outside"
                radius="full"
                disallowEmptySelection
                selectionMode="single"
                placeholder="Select a land cover"
                defaultSelectedKeys={landCoverFilter}
                variant="faded"
                color="primary"
                className="w-full rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                onSelectionChange={setLandCoverFilter}
                startContent={<MdPlace className="w-4 h-4" />}
                listboxProps={{
                  itemClasses: {
                    base: [
                      "data-[hover=true]:text-white",
                      "data-[selectable=true]:focus:text-white",
                      "transition-opacity",
                      "data-[hover=true]:bg-primary",
                      "data-[selectable=true]:focus:bg-primary",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-primary",
                    ],
                  },
                }}
              >
                {landCoverOptions.map((land) => (
                  <SelectItem key={land.value} value={land.value}>
                    {land.label}
                  </SelectItem>
                ))}
              </Select> */}

              <Autocomplete
                radius="full"
                labelPlacement="outside"
                placeholder="Search location"
                defaultItems={landCoverOptions}
                defaultSelectedKey="Secondary Forest"
                variant="faded"
                color="primary"
                className="w-full max-w-xs rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                allowsCustomValue={true}
                onSelectionChange={onSelectionLandCoverChange}
                onInputChange={onInputLandCoverChange}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.value}
                  >
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            {/* <div className="flex w-full max-w-xs flex-col gap-2">
              <Select
                labelPlacement="outside"
                radius="full"
                selectionMode="multiple"
                placeholder="Select an column"
                selectedKeys={visibleColumns}
                onSelectionChange={setVisibleColumns}
                disallowEmptySelection
                aria-label="Table Columns"
                variant="faded"
                color="primary"
                className="w-full rounded-full bg-white dark:bg-default/60 backdrop-blur-xl hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60"
                listboxProps={{
                  itemClasses: {
                    base: [
                      "data-[hover=true]:text-white",
                      "data-[selectable=true]:focus:text-white",
                      "transition-opacity",
                      "data-[hover=true]:bg-primary",
                      "data-[selectable=true]:focus:bg-primary",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-primary",
                    ],
                  },
                }}
              >
                {columns.map((col) => (
                  <SelectItem key={col.uid} value={col.uid}>
                    {col.name}
                  </SelectItem>
                ))}
              </Select>
            </div> */}
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
    onInputLandCoverChange
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

  // console.log({ selectedKeys, getSelect }, "filter-selection");
  // console.log({ page, rowsPerPage, pages, items }, "pagination");
  // console.log({ sortedItems, headerColumns }, "final-data");

  // console.log(params, "params");

  // console.log({ page, limit, pages }, "paginate");

  return (
    <Table
      isStriped
      removeWrapper
      color="primary"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
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
