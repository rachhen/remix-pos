import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
  Flex,
  Stack,
} from "@chakra-ui/react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { Column, usePagination, useSortBy, useTable } from "react-table";
import { useNavigate } from "remix";
import Pagination from "@choc-ui/paginator";
import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { useActionsHook } from "~/hooks/actions";
import { useGetPagination } from "~/hooks/pagination";

export type LoaderData<T> = {
  data: T[];
  total: number;
};

export interface DataTableProps<D extends object> {
  data: D[];
  total: number;
  columns: Column<D>[];
  title: string;
  path: string;
  page?: number;
  limit?: number;
  renderHeader?: () => ReactNode;
}

export const DataTable = <D extends object>(props: DataTableProps<D>) => {
  const { data, columns, title, path, total, renderHeader } = props;
  const { pageIndex, pageSize } = useGetPagination();
  const actions = useActionsHook(path);
  const navigate = useNavigate();
  const hooks = [useSortBy, usePagination, actions];
  const instance = useTable<D>(
    { columns, data, initialState: { pageIndex, pageSize } },
    ...hooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    instance;

  return (
    <Stack spacing="5">
      {renderHeader?.() ?? <PageHeader title={title} type="list" path={path} />}
      <Table
        w="full"
        display={{ base: "block", md: "table" }}
        sx={{ "@media print": { display: "table" } }}
        {...getTableProps()}
      >
        <Thead
          display={{ base: "none", md: "table-header-group" }}
          sx={{ "@media print": { display: "table-header-group" } }}
        >
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.canSort && (
                    <Icon
                      w={{ sm: "10px", md: "14px" }}
                      h={{ sm: "10px", md: "14px" }}
                      color={column.isSorted ? "gray.500" : "gray.400"}
                      float="right"
                      as={
                        column.isSorted
                          ? column.isSortedDesc
                            ? TiArrowSortedDown
                            : TiArrowSortedUp
                          : TiArrowUnsorted
                      }
                    />
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody
          display={{ base: "block", lg: "table-row-group" }}
          sx={{ "@media print": { display: "table-row-group" } }}
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                display={{ base: "grid", md: "table-row" }}
                sx={{
                  "@media print": { display: "table-row" },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="flex-end">
        <Pagination
          current={pageIndex}
          total={total}
          pageSize={pageSize}
          paginationProps={{ display: "flex" }}
          pageNeighbours={1}
          showTotal={(total) => `${total} Items`}
          showSizeChanger
          onChange={(currentPage) => {
            // setPageSize(val || 0);
            navigate(`/${path}?page=${currentPage}&limit=${pageSize}`);
          }}
          onShowSizeChange={(currentPage, size) => {
            console.log(currentPage, size);
            navigate(`/${path}?page=${currentPage}&limit=${size}`);
          }}
          responsive={{ activePage: true, pageSize: true }}
        />
      </Flex>
    </Stack>
  );
};
